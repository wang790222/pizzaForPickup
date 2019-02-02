"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const moment       = require('moment');
moment().format();
const app         = express();


const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const crustRoutes   = require("./routes/crust");
const sizeRoutes    = require("./routes/size");
const toppingRoutes = require("./routes/topping");


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

app.post("/restaurant/confirm_time", (req, res) => {
let time = req.body.value;
  console.log(req.body);

  let timeConfirmedRestaurant = req.body.time_confirmed

// Update with confirmed pick up time

  knex('order')
  .insert({time_confirmed: timeConfirmedRestaurant})
  .returning('id')
    .then((orderId) => {
      console.log(`inserted confirmed time: ${timeConfirmedRestaurant} into DB. `);
      knex("order")
        .where({id: req.params.order_id})
        .update({time_confirmed: timeConfirmedRestaurant})

      res.json({})
    })

});
        
app.post("/restaurant/pickup_time", (req, res) => {
  console.log("Got the pick up confirm")
  console.log(req.body);

  let timePickup = req.body.time_pickup

  knex('order')
  .insert({time_pickup: timePickup})
  .returning('id')
  .then((orderId) => {
    console.log(`inserted pick up time: ${timePickup} into DB. `);
    knex("order")
      .where({id: req.params.order_id})
      .update({time_pickup: timePickup})

    res.json({})
  })

});




// app.get("/restaurant", (req, res) => {

//   let templateVars = {};
//   res.render('restaurant');
// });

// Customer page
app.get("/:id", (req, res) => {

  res.render('confirmation', {orderId: req.params.id});
});

app.post("/", (req, res) => {

  knex
    .insert(req.body.data)
    .returning('id')
    .into("order")
    .then(function (id) {

      //let templateVars = {
      //  orderId: id
      //};
      //console.log("id:", templateVars);
      res.send(id);
      //res.render('confirmation', templateVars);
    });
});

app.post("/customer", (req, res) => {
  console.log(req.body);

  knex('customer')
    .insert({name: req.body.customername, phone: req.body.phonenumber, post_code: req.body.postcode})
    .returning('id')
    .then((customerId) => {
      console.log(`inserted customer: ${customerId} into DB. `);
      knex("order")
        .where({id: req.params.order_id})
        .update({customer_id: customerId})

      res.json({})
    })


  // for ()

  // knex('${}').insert()
  // TWILLIO
  // localStorage.clear();
});




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});















