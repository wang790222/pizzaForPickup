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
          })
      ]);
    });
};
