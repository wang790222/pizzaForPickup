"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const crustRoutes   = require("./routes/crust");
const sizeRoutes    = require("./routes/size");
const toppingRoutes = require("./routes/topping");

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTHTOKEN;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
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
app.use("/api/crust", crustRoutes(knex));

// Home page
app.get("/", (req, res) => {

  Promise.all([
    new Promise(function(resolve, reject) {
      knex
        .select()
        .from("size")
        .then((results) => {
          resolve(results);
      });
    }),

    new Promise(function(resolve, reject) {
      knex
        .select()
        .from("crust")
        .then((results) => {
          resolve(results);
      });
    }),

    new Promise(function(resolve, reject) {
      knex
        .select()
        .from("topping")
        .then((results) => {
          resolve(results);
      });
    }),

    new Promise(function(resolve, reject) {
      knex
        .select()
        .from("extra")
        .then((results) => {
          resolve(results);
      });
    })
  ]).then(function(values) {

    const sizes = values[0];
    const crusts = values[1];
    const toppings = values[2];
    const extras = values[3];

    let templateVars = {
      sizes: sizes,
      crusts: crusts,
      toppings: toppings,
      extras: extras
    };

    res.render("index", templateVars);
  });
});

// Restaurant page

app.get("/restaurant", (req, res) => {

  Promise.all([
    new Promise(function(resolve, reject) {
      knex
        .select()
        .from("order")
        .whereNotNull("order.customer_id")
        .whereNull("order.time_pickup")
        .leftOuterJoin('customer', 'customer.id', 'order.customer_id')
        .then((results) => {
        resolve(results);
      });
    }),

    new Promise(function(resolve, reject) {
      knex
        .select()
        .from("feedback")
        .then((results) => {
        resolve(results);
      });
    }),

  ]).then(function(values) {

    const confirmedOrders = values[0];
    const feedbacks = values[2];

    let templateVars = {
      orders: confirmedOrders,
      feedbacks: feedbacks,
    };

    console.log(templateVars)

    res.render("restaurant", templateVars);
  });
});

// Customer page
app.get("/:id", (req, res) => {
  new Promise(function(resolve, reject) {
      knex
        .select()
        .from("order")
        .where("id", "=", req.params.id)
        .then((results) => {

          let pizzaAmount = (results[0].pizza_order) ? results[0].pizza_order.pizza_order.length : 0;
          let extraAmount = (results[0].extra) ? results[0].extra.extra.length : 0;
          let templateVars = {
            orderId: req.params.id,
            orderAmount: (results[0].cost) ? results[0].cost : 0,
            estimatedTime: (results[0].estimated_time) ? results[0].estimated_time : 0,
            items: pizzaAmount + extraAmount
          };

          res.render('confirmation', templateVars);
      });
    });
});

app.post("/", (req, res) => {

  knex
    .insert(req.body.data)
    .returning('id')
    .into("order")
    .then(function (id) {
      res.send(id);
    });
});

app.post("/customer", (req, res) => {

  console.log("Post Customer - orderid:", req.body.order_id);

  Promise.all([
    new Promise(function(resolve, reject) {
      knex
      .insert({
        name: req.body.customername,
        phone: req.body.phonenumber,
        post_code: req.body.postcode
      })
      .returning('id')
      .into("customer")
      .then(function (id) {
        new Promise(function(resolve, reject) {
          knex('order')
          .where({ id: req.body.order_id})
          .update({ customer_id: id});
        });

        client.messages.create({
            body: 'Order Pizza!',
            to: '+15149437993',   //Tim's number
            from: '+18737714590'
          })
          .then((message) => console.log(message.sid))
          .done();
        });
    })
  ])
  .then(function(values) {
    console.log("Insert Customer table / Update Order table");
  });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});















