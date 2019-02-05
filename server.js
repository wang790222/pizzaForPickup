"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const moment        = require("moment-timezone");

const knexConfig    = require("./knexfile");
const knex          = require("knex")(knexConfig[ENV]);
const morgan        = require('morgan');
const knexLogger    = require('knex-logger');

// Seperated Routes for each Resource
const crustRoutes   = require("./routes/crust");
const sizeRoutes    = require("./routes/size");
const toppingRoutes = require("./routes/topping");

var accountSid      = process.env.TWILIO_ACCOUNT_SID;
var authToken       = process.env.TWILIO_AUTHTOKEN;

var twilio          = require('twilio');
var client          = new twilio(accountSid, authToken);

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

  console.log(moment().tz("America/New_York").format());

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

          const returnPizzas = function () {
            const pizzaOrder = results[0].pizza_order.pizzas;
            let pizzas = '';
            let i = 1;
            pizzaOrder.forEach((pizza) => {
              pizzas += `<h6>PIZZA #${i}</h6> \n size: ${pizza.size} <br\> crust: ${pizza.crust} <br\>`;
              if (pizza.toppings) {
                let toppings = '';
                pizza.toppings.forEach((topping) => {
                  toppings += topping + "<br\>";
                })
                pizzas += `toppings: ${toppings} <br\>`;
                i++;
              }
            })
            return pizzas;
          }

          const returnExtras = function () {
            let extras = results[0].extra.extra;
            const map = extras.reduce(function(prev, cur) {
              prev[cur] = (prev[cur] || 0) + 1;
              return prev;
            }, {});
            let items = Object.keys(map);
            let quantities = Object.values(map);
            let extrasOrder = '';
            for (let i = 0; i < items.length; i++) {
              extrasOrder += `${items[i]} qty: ${quantities[i]} <br\>`
            }
            return extrasOrder;
          }

          let orderedItems;

          if (results[0].pizza_order && results[0].extra) {
            orderedItems = returnPizzas() + returnExtras();
          } else if (results[0].pizza_order) {
            orderedItems = returnPizzas();
          } else {
            orderedItems = returnExtras();
          }

        let pizzaAmount = (results[0].pizza_order) ? results[0].pizza_order.pizzas.length : 0;
        let extraAmount = (results[0].extra) ? results[0].extra.extra.length : 0;
        let templateVars = {
          orderedItems: orderedItems,
          orderId: req.params.id,
          orderAmount: (results[0].cost) ? results[0].cost : 0,
          estimatedTime: (results[0].estimated_time) ? results[0].estimated_time : 0,
          items: pizzaAmount + extraAmount,
          pickedUp: results[0].time_pickup,
          confirmed: results[0].time_confirmed,
          customerId: results[0].customer_id
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
      res.status(200).send(id);
    });
});

app.post("/customer", (req, res) => {

  console.log("Post Customer - orderid:", req.body.order_id);

  let cb = function(id) {
    new Promise(function(resolve, reject) {
        knex('order')
        .where(
          {
            id: req.body.order_id
          }
        )
        .update(
          {
            customer_id: id
          }
        )
        .then(function(values) {
          console.log("Updata.");
          res.status(200).send("ok");
          return;
        });
      });
  };

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
        cb(parseInt(id));

      client.messages.create({
        body: 'New Pizza Order!',
        to: '+15149437993',   //Tim's number
        from: '+18737714590'
        })
        .then((message) => console.log(message.sid))
        .done();

      });
    });

    res.status(200);
    return;
});

app.post("/confirm/orders", (req, res) => {

  let est = parseInt(req.body.est);
  let orderId = parseInt(req.body.order_id);
  console.log("id:", orderId);
  let tempConfirmedTime = moment().add(est, 'm').tz("America/New_York").format();
  let confirmedTime = tempConfirmedTime.split("T")[0] + " " + tempConfirmedTime.split("T")[1].split("-")[0];
  console.log("confirmedTime:", confirmedTime);
  new Promise(function(resolve, reject) {
    knex('order')
    .where(
      {
        id: orderId
      }
    )
    .update(
      {
        time_confirmed: confirmedTime
      }
    )
    .then(function(values) {
      console.log("Confirm.");

      client.messages.create({
            body: `Your Order Is Confirmed! http://172.46.0.220:8080/${orderId}`,
            to: '+16476731359',   //Yu-Ning's number
            from: '+18737714590'
      })
      .then((message) => console.log(message.sid))
      .done();

      setPickupMsg(est, orderId);

      res.redirect('back');
      return;
    });
  });

  res.redirect('back');
  return;
});


app.post("/pickup/orders", (req, res) => {

  let orderId = parseInt(req.body.order_id);

  let tempPickupTime = moment().tz("America/New_York").format();
  let pickupTime = tempPickupTime.split("T")[0] + " " + tempPickupTime.split("T")[1].split("-")[0];

  new Promise(function(resolve, reject) {
    knex('order')
    .where(
      {
        id: orderId
      }
    )
    .update(
      {
        time_pickup: pickupTime
      }
    )
    .then(function(values) {
      console.log("Pickup.");
      res.redirect('back');
    });
  });

  res.redirect('back');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


function setPickupMsg(mins, orderId) {
  setTimeout(function(){

    client.messages.create({
          body: `Pick Your Pizza! http://172.46.0.220:8080/${orderId}`,
          to: '+16476731359',   //Yu-Ning's number
          from: '+18737714590'
    })
    .then((message) => console.log(message.sid))
    .done();

  }, mins * 6000);
}
