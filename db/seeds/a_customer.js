exports.seed = function(knex, Promise) {
  return knex('customer').del()
    .then(function () {
    });
};
