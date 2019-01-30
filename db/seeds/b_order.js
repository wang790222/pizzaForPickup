exports.seed = function(knex, Promise) {
  return knex('order').del()
    .then(function () {
      return Promise.all([
        knex('order').insert(
          {
            customer_id: 1,
            time_placed: "2019-01-30 17:01:23",
            time_confirmed: "2019-01-30 17:02:33",
            extra: {
              drink: 0,
              garlicBread: 1
            },
            pizza_order: {
              pizza : [
                {
                  size: "Small",
                  crust: "Thin",
                  topping: ["Onions", "Bacon"]
                } ,
                {
                  size: "Med",
                  crust: "Reg",
                  topping: ["Green Paper"]
                }
              ]
            },
            estimated_time: 20,
            cost: 20,
            time_pickup: "2019-01-30 18:02:33"
          })
      ]);
    });
};
