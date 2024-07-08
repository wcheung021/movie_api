const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  { check, validationResult } = require('express-validator'),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  passport = require('passport');

const app = express();
const { Movie, User } = Models;

let auth = require('./auth')(app);
require('./passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('common'));

let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      let message = "The CORS policy for this application doesn't allow access from origin " + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Documentation
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// Open page
app.get("/", async (req, res) =>{
  res.send("Welcome to MyFlixDB");
});

// Users endpoints
app.get('/users', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

app.get('/users/:Username', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const user = await User.findOne({ Username: req.params.Username });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

app.post('/users', [
  check("Username", "Username is required").isLength({ min: 5 }),
  check("Username", "Username contains nonalphanumeric characters - not allowed.").isAlphanumeric(),
  check("Password", "Password is required").not().isEmpty(),
  check("Email", "Email does not appear to be valid").isEmail()
], async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    let hashedPassword = User.hashPassword(req.body.Password);
    const existingUser = await User.findOne({ Username: req.body.Username });
    if (existingUser) {
      return res.status(400).send(req.body.Username + ' already exists');
    }

    const newUser = await User.create({
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user: ' + error.message);
  }
});

app.put('/users/:Username', passport.authenticate("jwt", { session: false }), async (req, res) => {
  if (req.user.Username !== req.params.Username) {
    return res.status(400).send('Permission denied');
  }

  try {
    let hashedPassword = User.hashPassword(req.body.Password);
    const updatedUser = await User.findOneAndUpdate({ Username: req.params.Username }, {
      $set: {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    }, { new: true });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

app.post('/users/:Username/movies/:MovieID', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ Username: req.params.Username }, {
      $push: { FavoriteMovies: req.params.MovieID }
    }, { new: true });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

app.delete('/users/:Username', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ Username: req.params.Username });
    if (!user) {
      res.status(404).send(req.params.Username + ' was not found');
    } else {
      res.status(200).send(req.params.Username + ' was deleted.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

app.delete('/users/:Username/movies/:MovieID', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ Username: req.params.Username }, {
      $pull: { FavoriteMovies: req.params.MovieID }
    }, { new: true });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Movies endpoints
app.get('/movies', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(201).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

app.get("/movies/:Title", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movie = await Movie.findOne({ Title: req.params.Title });
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

app.get("/movies/genre/:Name", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movies = await Movie.findOne({ "Genre.Name": req.params.Name });
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

app.get("/movies/director/:Name", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movies = await Movie.findOne({ "Director.Name": req.params.Name });
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
