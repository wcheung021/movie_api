# MyFlix API

Welcome to my MYFlix APP. This is a database for movies, genres, directors and users. The database is built and connect with MongoDB and Express.

## Built With

Node.js
Express
MongoDB

### Installation
This is an example how to install them.

1. Copy repository

2.  NPM
   ```sh
   npm install
   ```

3. 	Connect with your MongoDB
   ```sh
   mongosh "mongodb+srv://cluster0.h9omhlo.mongodb.net/" --apiVersion 1 --username myFlixDbAdmin
   ```

4.	Running API

## Hosting
The API is hosted on Heroku: https://movies-app-e6416bf1d095.herokuapp.com/

## Endpoints

### Movies
- **GET /movies**
- **GET /movies/:Title**
- **GET /movies/genre/:genreName**
- **GET /movies/director/:directorName**

### Users
- **GET /users**
- **GET /users/:Username**
- **POST /users**
- **PUT /users/:Username**
- **POST /users/:Username/Movies/:MovieID**
- **DELETE /users/:Username**
- **DELETE /users/:Username/movies/:MovieID**  

### Documentation
- **GET /documentation**

## Login instructions
Details Requirments
   	 `Username`
   	 `Password`
   	 `Email`

## Contact
-	Name: Wai Yin Cheung
-	Email: wcheung021@gmail.com





	 
   
