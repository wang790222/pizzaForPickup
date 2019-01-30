exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("extra", function(table) {
      table.increments("id").primary();
      table.string("name");
      table.integer("time_prep");
      table.decimal("cost", 14, 2);
    }),

    knex.schema.createTable("size", function(table) {
      table.increments("id").primary();
      table.string("name");
      table.integer("time_prep");
      table.decimal("cost", 14, 2);
    }),

    knex.schema.createTable("crust", function(table) {
      table.increments("id").primary();
      table.string("name");
      table.integer("time_prep");
      table.decimal("cost", 14, 2);
    }),

    knex.schema.createTable("topping", function(table) {
      table.increments("id").primary();
      table.string("name");
      table.integer("time_prep");
      table.decimal("cost", 14, 2);
    }),

    knex.schema.createTable("customer", function(table) {
      table.increments("id").primary();
      table.string("name");
      table.string("phone");
      table.string("post_code");
    }),

    knex.schema.createTable("order", function(table) {
      table.increments("id").primary();
      table.integer("customer_id").unsigned().index().references("id").inTable("customer");
      table.timestamp("time_placed");
      table.timestamp("time_confirmed");
      table.json("extra");
      table.json("pizza_order");
      table.integer("estimated_time");
      table.decimal("cost", 14, 2);
      table.timestamp("time_pickup");
    }),

    knex.schema.createTable("feedback", function(table) {
      table.increments("id").primary();
      table.integer("order_id").unsigned().index().references("id").inTable("order");
      table.timestamp("time_feedback");
      table.integer("rating_star");
      table.string("rating_text");
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("extra"),
    knex.schema.dropTable("feedback"),
    knex.schema.dropTable("order"),
    knex.schema.dropTable("size"),
    knex.schema.dropTable("crust"),
    knex.schema.dropTable("topping"),
    knex.schema.dropTable("customer")
  ]);
};
