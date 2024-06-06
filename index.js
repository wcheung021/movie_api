const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'), 
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

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


app.use(express.static("public"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Error 404");
});

app.listen(8080, () => {
    console.log("Your App is listening on port 8080");
});