exports.seed = function(knex, Promise) {
  return knex('customer').del()
    .then(function () {
      return Promise.all([
        knex('customer').insert(
          {
            name: "Tim",
            phone: "416456789",
            post_code: "M6V"
          })
          knex('customer').insert(
          {
            name: "Rachel",
            phone: "904456789",
            post_code: "M2T"
          })
          knex('customer').insert(
          {
            name: "Yu-Ning",
            phone: "123456789",
            post_code: "MV4"
          })
          knex('customer').insert(
          {
            name: "Hilary",
            phone: "245456789",
            post_code: "B2X"
          })
      ]);
    });
};
