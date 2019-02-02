exports.seed = function(knex, Promise) {
  return knex('order').del()
    .then(function () {
      return Promise.all([
        knex('order').insert(
          {
            time_placed: "2019-01-30 17:01:23",
            extra: {
              drink: 2,
              garlicBread: 3
            },
            pizza_order: {
              pizza : [
                {
                  size: "Small",
                  crust: "Thin",
                  topping: ["Onions", "Bacon", "Goat Cheese"]
                } 
              ]
            },
            estimated_time: 22,
            cost: 25.50,
          }), knex('order').insert(
            {
              customer_id: 1,
              time_placed: "2019-01-30 18:20:13",
              extra: {
                drink: 0,
                garlicBread: 1
              },
              pizza_order: {
                pizza : [
                  {
                    size: "Large",
                    crust: "Thin",
                    topping: ["Mushrooms", "Bacon"]
                  } ,
                  {
                    size: "Medium",
                    crust: "Stuffed",
                    topping: ["Goat Cheese"]
                  }
                ]
              },
              estimated_time: 30,
              cost: 29.50,
          }), knex('order').insert(
              {
              customer_id: 2,
              time_placed: "2019-01-30 17:01:23",
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
                    size: "Medium",
                    crust: "Regular",
                    topping: ["Green Peppers"]
                  }
                ]
              },
              estimated_time: 32,
              cost: 25.50,
            }), knex('order').insert(
              {
              customer_id: 3,
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
                    size: "Medium",
                    crust: "Regular",
                    topping: ["Green Peppers"]
                  }
                ]
              },
              estimated_time: 21,
              cost: 25.50,
            }), knex('order').insert(
              {
              customer_id: 4,
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
                    size: "Medium",
                    crust: "Regular",
                    topping: ["Green Peppers"]
                  }
                ]
              },
              estimated_time: 22,
              cost: 25.50,
            }), knex('order').insert(
              {
              customer_id: 4,
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
                    size: "Medium",
                    crust: "Regular",
                    topping: ["Green Peppers"]
                  }
                ]
              },
              estimated_time: 22,
              cost: 25.50,
              time_pickup: "2019-01-30 18:02:33"
            })
      ]);
    });
};
