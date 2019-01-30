exports.seed = function(knex, Promise) {
  return knex('topping').del()
    .then(function () {
      return Promise.all([
        knex('topping').insert(
          {
            id: 1,
            name: 'Extra Cheese',
            time_prep: 1,
            cost: 1
          })
      ]);
    });
};
