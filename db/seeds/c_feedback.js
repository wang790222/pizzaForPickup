exports.seed = function(knex, Promise) {
  return knex('feedback').del()
    .then(function () {
      return Promise.all([
        knex('feedback').insert(
          {
            order_id: 1,
            time_feedback: "2019-01-30 0:01:23",
            rating_star: 5,
            rating_text: "Good Job."
          }),
        knex('feedback').insert(
          {
            order_id: 2,
            time_feedback: "2019-01-31 0:10:23",
            rating_star: 4,
            rating_text: "Great, but more cheese."
          })
      ]);
    });
};
