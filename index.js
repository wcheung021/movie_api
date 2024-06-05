const express = require("express"),
    bodyParser = require("body-parser"),
    uuid = require("uuid");
    
const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');
    

const Movie = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

app.use(bodyParser.json());
app.use(morgan("common"));

mongoose.connect('mongodb://localhost:27017/[myFlix', { useNewUrlParser: true, useUnifiedTopology: true });

let users = [
    {
        id: 1,
        name: "Wai",
        favouriteMovies: "Full Metal Jacket"
    }, {
        id: 2,
        name: "Charlie",
        favouriteMovies: "Top Gun"
    }
]

let movies = [
    {
        title: "Top Gun",
        release_year: "1986",
        story_line: "US Navy Lieutenant Pete Mitchell, call sign Maverick--an impetuous, daredevil pilot ace--is accepted into Top Gun, Miramar's elite Fighter School. But there, the impulsive young pilot will have to compete with the best of the best, including Iceman, a brilliant and highly competitive fellow student. Now, Mitchell must give his all; however, his father's mysterious and untimely demise still haunts him. Can Maverick prove his worth to Charlie, the flying school's no-nonsense astrophysics instructor? Will he be able to suppress his wild nature to win the prestigious Top Gun Trophy?",
        director: "Tony Scott"
    },
    // ... other movies
];

app.use(bodyParser.json());

// Routes


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

app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username })
      .then((users) => {
        if (users) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((users) =>{res.status(201).json(users) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.put("/users/:name", (req, res) => {
    const name = req.params.name;
    const updatedUser = req.body;
    let user = users.find((user) => user.name === name);
    if (user) {
        user.name = updatedUser.name;
        user.favouriteMovies = updatedUser.favouriteMovies;
        res.status(200).json(user);
    } else {
        res.status(400).send("No such user");
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    let user = users.find((user) => user.id === userId);

    if (user) {
        users = users.filter((user) => user.id !== userId);
        res.status(201).send('User was deleted.');
    } else {
        res.status(400).send("No such user");
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to My Top 10 Movies");
});

app.get("/movies", (req, res) => {
    res.json(movies);
});

    app.get("/movies/:title", (req, res) => {
        const { title } = req.params;
        const movie = movies.find(movie => movie.title === title);
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(400).send('no such movie')
        }
    });

app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html", { root: __dirname });
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Error 404");
});

app.listen(8080, () => {
    console.log("Your App is listening on port 8080");
});