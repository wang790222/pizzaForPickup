exports.seed = function(knex, Promise) {
  return knex('extra').del()
    .then(function () {
      return Promise.all([
        knex('extra').insert(
          {
            id: 1,
            name: 'Sugarcravin Soda',
            time_prep: 1,
            cost: 2.50
          }),
        knex('extra').insert(
          {
            id: 2,
            name: 'Overpriced Bubbly Water',
            time_prep: 2,
            cost: 6.00
          }),
         knex('extra').insert(
          {
            id: 3,
            name: 'Vampire Free Garlic Bread',
            time_prep: 2,
            cost: 6.00
          }),
          knex('extra').insert(
          {
            id: 4,
            name: 'Guilty Greens',
            time_prep: 1,
            cost: 9.00
          }),
          knex('extra').insert(
          {
            id: 5,
            name: 'Somekind of Slaw',
            time_prep: 1,
            cost: 7.00
          }),
          knex('extra').insert(
          {
            id: 6,
            name: 'After Pizza Dessert',
            time_prep: 1,
            cost: 5.00
          })
      ]);
    });
};
