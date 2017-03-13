
exports.seed = function(knex, Promise) {
  return knex('website').del()
    .then(function () {
      return knex('website').insert([
        {name: 'BS Recipes'}
      ])
    })
};
