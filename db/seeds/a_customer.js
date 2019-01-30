exports.seed = function(knex, Promise) {
  return knex('customer').del()
    .then(function () {
      return Promise.all([
        knex('customer').insert(
          {
            name: "Tim",
            phone: "123456789",
            post_code: "abc"
          })
      ]);
    });
};
