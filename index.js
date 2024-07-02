const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'), 
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

const cors = require("cors");
  let allowOrigins= ["http://localhost:8080", "http://testsite,com"];

  app.use(cors({
    origin: (origin, callback) => {
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        let message = "The CORS policy for this application doesn't allow access from origin" + origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  }));

const {check, validationResult } = require ("express-validator");

const mongoose = require('mongoose');
const Models = require('./models.js');
const { title } = require('process');

const Movies = Models.Movie;
const Users = Models.User;

  let auth = require('./auth')(app);
const passport = require("passport");
  require("./passport");

  app.use(bodyParser.json());
  app.use(morgan("common"));
  app.use(bodyParser.urlencoded({ extended: true }));


    mongoose.connect('mongodb://127.0.0.1:27017/123', { useNewUrlParser: true, useUnifiedTopology: true });
    
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('Error connecting to MongoDB:', err);
    });
    
    //documents
    app.get("/documentation", (req, res) => {
      res.sendFile("public/documentation.html", { root: __dirname });
    });
    
//users
//get
app.get('/users', async (req, res) => {
  await Users.find()
      .then((users) => {
          res.status(201).json(users);
  })  
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
});
});
app.get('/users/:Username', async (req, res) => {  
  await Users.findOne({ Username: req.params.Username })
      .then((users) => {
          res.json(users);
    })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
        });
      });

//post
app.post('/users', [ check("Username", "Username is required").isLength({min: 5}),
  check("Username", "username contains nonalphanumeric characters - not allowed.").isAlphanumeric(),
  check("Password", "Password is required").not().isEmpty(),
  check("Email", "Email does not appear to be valid").isEmail()],
  passport.authenticate("jwt", {session: false}), async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()});
  }
  try {
    let hashedPassword = Users.hashPassword(req.body.Password);
    const existingUser = await Users.findOne({ Username: req.body.Username });
    if (existingUser) {
      return res.status(400).send(req.body.Username + ' already exists');
    }
    const newUser = await Users.create({
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user: ' + error.message);
  }
});
 
//update
//update users
app.put('/users/:Username', passport.authenticate("jwt", {session: false}), async (req, res) => {
  if(req.user.Username !== req.params.Username){
    return res.status(400).send('Permission denied');
}
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  })
});

//update users movies
app.post('/users/:Username/movies/:MovieID', [ check("Username", "Username is required").isLength({min: 5}),
  check("Username", "username contains nonalphanumeric characters - not allowed.").isAlphanumeric(),
  check("Password", "Password is required").not().isEmpty(),
  check("Email", "Email does not appear to be valid").isEmail()],
  passport.authenticate("jwt", {session: false}), async (req, res) => {
  let errors = calidationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()});
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//delete
//delete users
app.delete('/users/:Username', passport.authenticate("jwt", {session: false}), async (req, res) => {
  await Users.findOneAndDelete({ Username: req.params.Username })
      .then((user) => {
          if (!user) {
              res.status(404).send(req.params.Username + ' was not found');
          } else {
              res.status(200).send(req.params.Username + ' was deleted.');
          }
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
      });
});


//delete users movies
app.delete('/users/:Username/movies/:MovieID', passport.authenticate("jwt", {session: false}), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $pull: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) 
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//movies
app.get('/movies', passport.authenticate("jwt", {session: false}), async (req, res) => {
  await Movies.find()
      .then((movies) => {
          res.status(201).json(movies);
  })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
  });
});

app.get("/movies/:Title", passport.authenticate("jwt", {session: false}), async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
  .then((Title) => {
    res.json(Title);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  })
})

//genre
//get
app.get("/movies/genre/:Name", passport.authenticate("jwt", {session: false}), async (req, res) => {
  await Movies.findOne({ "Genre.Name": req.params.Name })
  .then((movies) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


//directors
//get
app.get("/movies/director/:Name", passport.authenticate("jwt", {session: false}), async (req, res) => {
  await Movies.findOne({ "Director.Name": req.params.Name })
  .then((movies) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error 404");
});
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});