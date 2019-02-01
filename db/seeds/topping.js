exports.seed = function(knex, Promise) {
  return knex('topping').del()
    .then(function () {
      return Promise.all([
        knex('topping').insert(
          {
            id: 1,
            name: 'Extra Cheese',
            time_prep: 1,
            cost: 1.00
          })
        knex('topping').insert(
          {
            id: 2,
            name: 'Onions',
            time_prep: 1,
            cost: 1.00
          })
        knex('topping').insert(
          {
            id: 3,
            name: 'Pepperoni',
            time_prep: 1,
            cost: 1.00
          })
        knex('topping').insert(
          {
            id: 4,
            name: 'Green Peppers',
            time_prep: 1,
            cost: 1.00
          })
        knex('topping').insert(
          {
            id: 5,
            name: 'Mushrooms',
            time_prep: 1,
            cost: 1.00
          })
        knex('topping').insert(
          {
            id: 6,
            name: 'Bacon',
            time_prep: 1,
            cost: 2.00
          })
        knex('topping').insert(
          {
            id: 7,
            name: 'Goat Cheese',
            time_prep: 1,
            cost: 2.00
          })
        knex('topping').insert(
          {
            id: 8,
            name: 'Spinach',
            time_prep: 1,
            cost: 1.00
          })
        knex('topping').insert(
          {
            id: 9,
            name: 'Olives',
            time_prep: 1,
            cost: 1.00
          })
        knex('topping').insert(
          {
            id: 10,
            name: 'Truffle',
            time_prep: 2,
            cost: 15.00
          })
      ]);
    });
};
