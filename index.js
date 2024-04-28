const express = require("express");
const app = express();

    let topTenMovies =[
        {
            title: "Top Gun",
            director: "Tony Scott"
        },
        {
            title: "Saving Private Ryan",
            director: "Steven Spielberg"
        },
        {
            title: "Forrest Gump",
            director: "Robert Zemeckis"
        },
        {
            title: "The Outpost",
            director: "Rod Lurie"
        },
        {
            title: "13 Hours",
            director: "Michael Ray"
        },
        {
            title: "Black Hawk Down",
            director: "Ridley Scott"
        },
        {
            title: "We Were Soldiers",
            director: "Randall Wallace"
        },
        {
            title: "Tears of the Sun",
            director: "Antoinie Fuqua"
        },
        {
            title: "Windtalkers",
            director: "John Woo"
        },
        {
            title: "Full Metal Jacket",
            director: "Stanley Kubrick"
        },
    ];

// get requests
    app.get("/",(req,res)=>{
        res.send("Welcome to My Top 10 Movies");
    });
    
    app.get("/movies",(req,res)=>{
        res.json(topTenMovies);
    });

// express.static
    app.use(express.static("public"));

// listen for requests
    app.listen(8080,()=>{
        console.log("Your App is listening on port 8080");
    });
