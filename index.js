const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'), 
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');
const { title } = require('process');

const Movies = Models.Movie;
const Users = Models.User;

app.use(bodyParser.json());
app.use(morgan("common"));

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
app.post('/users', async (req, res) => {
  try {
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
app.put('/users/:Username', async (req, res) => {
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
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
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
app.delete('/users/:Username', async (req, res) => {
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
app.delete('/users/:Username/movies/:MovieID', async (req, res) => {
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
app.get('/movies', async (req, res) => {
  await Movies.find()
      .then((movies) => {
          res.status(201).json(movies);
  })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
  });
});

app.get("/movies/:Title", async (req, res) => {
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
app.get("/movies/genre/:Name", async (req, res) => {
  try {
    const genreName = new RegExp('^' + req.params.Name + '$', 'i'); // Case-insensitive regular expression
    console.log('Query parameter:', req.params.Name); // Log the query parameter
    const movies = await Movies.find({ "Genre.Name": genreName });
    console.log('Query result:', movies); // Log the query result
    if (movies.length === 0) {
      return res.status(404).send('No movies found for the genre: ' + req.params.Name);
    }
    res.json(movies);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error: ' + err);
  }
});



//directors
//get
app.get("/movies/director/:Name", async (req, res) => {
  await Movies.find({ "Director.Name": req.params.Name })
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

app.listen(8080, () => {
    console.log("Your App is listening on port 8080");
});