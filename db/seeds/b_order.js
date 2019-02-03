exports.seed = function(knex, Promise) {
  return knex('order').del()
    .then(function () {

    });
};
