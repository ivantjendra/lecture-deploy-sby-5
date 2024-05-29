if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const authentication = require('./middlewares/authentication')
const authorization = require('./middlewares/authorization')
const errorHandler = require('./middlewares/errorHandler')

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const Controller = require("./controllers/");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Jisoo cakep" });
});
app.post("/register", Controller.register);
app.post("/login", Controller.login);


app.use(authentication)

// Protected by authentication
app.get("/movies", Controller.getMovies);
app.post("/movies", Controller.addMovie);

// Protected by authentication & authorization
app.delete("/movies/:id", authorization, Controller.deleteMovie);

//! ERROR HANDLER
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
