exports.seed = function(knex, Promise) {
  return knex('size').del()
    .then(function () {
      return Promise.all([
        knex('size').insert(
          {
            id: 1,
            name: 'Small',
            time_prep: 5,
            cost: 5.00
          }),
         knex('size').insert(
          {
            id: 2,
            name: 'Medium',
            time_prep: 7,
            cost: 7.00
          }),
         knex('size').insert(
          {
            id: 3,
            name: 'Large',
            time_prep: 9,
            cost: 9.00
          })
      ]);
    });
};
