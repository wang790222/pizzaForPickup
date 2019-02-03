exports.seed = function(knex, Promise) {
  return knex('feedback').del()
    .then(function () {});
};
