exports.seed = function(knex, Promise) {
  return knex('extra').del()
    .then(function () {
      return Promise.all([
        knex('extra').insert(
          {
            id: 1,
            name: 'Soda',
            time_prep: 1,
            cost: 0
          })
      ]);
    });
};
