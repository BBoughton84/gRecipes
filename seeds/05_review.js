
exports.seed = function(knex, Promise) {
  return knex('review').del()
    .then(function () {
      return knex('review').insert([
        {
          recipe_id: knex('recipe').where('id', 1).select('id'),
          author_id: knex('author').where('id', 1).select('id'),
          body: 'Great Recipe',
          rating: 5
        },
        {
          recipe_id: knex('recipe').where('id', 1).select('id'),
          author_id: knex('author').where('id', 2).select('id'),
          body: 'This sucks',
          rating: 1
        },
        {
          recipe_id: knex('recipe').where('id', 3).select('id'),
          author_id: knex('author').where('id', 2).select('id'),
          body: 'It was OK',
          rating: 3
        },
        {
          recipe_id: knex('recipe').where('id', 3).select('id'),
          author_id: knex('author').where('id', 3).select('id'),
          body: 'Better than average',
          rating: 4
        },
        {
          recipe_id: knex('recipe').where('id', 2).select('id'),
          author_id: knex('author').where('id', 4).select('id'),
          body: 'really liked it',
          rating: 5
        },
        {
          recipe_id: knex('recipe').where('id', 2).select('id'),
          author_id: knex('author').where('id', 5).select('id'),
          body: 'another good one',
          rating: 4
        }
      ])
    })
};
