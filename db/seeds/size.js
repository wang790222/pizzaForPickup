exports.seed = function(knex, Promise) {
  return knex('size').del()
    .then(function () {
      return Promise.all([
        knex('size').insert(
          {
            id: 1,
            name: 'Small',
            time_prep: 5,
            cost: 5
          })
      ]);
    });
};
