"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const cookieParser = require('cookie-parser');
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const midtermRoutes = require("./routes/midterm");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(cookieParser());
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/midterm", midtermRoutes(knex));

// Home page
app.get("/", (req, res) => {
  req.cookies
  let templateVars = {cookies: req.cookies}
  console.log("cookies:", req.cookies)
  res.render("index", templateVars);
});

// Restaurant page
app.get("/restaurant", (req, res) => {
  let templateVars = {};
  res.render('restaurant');
})

// Customer page
app.get("/:id", (req, res) => {
  req.cookies
  console.log("cookies: ", req.cookies)
  let templateVars = {};
  res.render('confirmation');
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
