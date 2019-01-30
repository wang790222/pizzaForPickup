exports.seed = function(knex, Promise) {
  return knex('crust').del()
    .then(function () {
      return Promise.all([
        knex('crust').insert(
          {
            id: 1,
            name: 'Thin',
            time_prep: 5,
            cost: 5
          })
      ]);
    });
};
