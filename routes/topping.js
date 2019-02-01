"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/restaurant", (req, res) => {
    knex
      .select("*")
      .from("order")
      .then((results) => {
        res.json(results);
    });
  });



  return router;
}
