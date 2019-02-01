exports.seed = function(knex, Promise) {
  return knex('crust').del()
    .then(function () {
      return Promise.all([
        knex('crust').insert(
          {
            id: 1,
            name: 'Thin',
            time_prep: 5,
            cost: 5.00
          }),
        knex('crust').insert(
          {
            id: 2,
            name: 'Regular',
            time_prep: 6,
            cost: 5.50
          }),
        knex('crust').insert(
          {
            id: 3,
            name: 'Stuffed',
            time_prep: 7,
            cost: 10.00
          })
      ]);
    });
};
