
exports.seed = function(knex, Promise) {
  return knex('ingredient_recipe').del()
    .then(function () {
      return knex('ingredient_recipe').insert([
        {
          ingredient_id: knex('ingredient').where('id', 1).select('id'),
          recipe_id: knex('recipe').where('id', 1).select('id'),
          quantity: '2',
          units: 'tablespoon'
        },
        {
          ingredient_id: knex('ingredient').where('id', 2).select('id'),
          recipe_id: knex('recipe').where('id', 1).select('id'),
          quantity: '1',
          units: 'cup'
        },
        {
          ingredient_id: knex('ingredient').where('id', 3).select('id'),
          recipe_id: knex('recipe').where('id', 1).select('id'),
          quantity: '1.5',
          units: 'cup'
        },
        {
          ingredient_id: knex('ingredient').where('id', 4).select('id'),
          recipe_id: knex('recipe').where('id', 1).select('id'),
          quantity: '1',
          units: 'bakers dozen'
        },
        {
          ingredient_id: knex('ingredient').where('id', 5).select('id'),
          recipe_id: knex('recipe').where('id', 1).select('id'),
          quantity: '1',
          units: 'teaspoon'
        },
        {
          ingredient_id: knex('ingredient').where('id', 2).select('id'),
          recipe_id: knex('recipe').where('id', 2).select('id'),
          quantity: '2',
          units: 'tablespoon'
        },
        {
          ingredient_id: knex('ingredient').where('id', 3).select('id'),
          recipe_id: knex('recipe').where('id', 2).select('id'),
          quantity: '1',
          units: 'spoon full'
        },
        {
          ingredient_id: knex('ingredient').where('id', 6).select('id'),
          recipe_id: knex('recipe').where('id', 2).select('id'),
          quantity: '1.5',
          units: 'handful'
        },
        {
          ingredient_id: knex('ingredient').where('id', 7).select('id'),
          recipe_id: knex('recipe').where('id', 2).select('id'),
          quantity: '1',
          units: 'cup'
        },
        {
          ingredient_id: knex('ingredient').where('id', 1).select('id'),
          recipe_id: knex('recipe').where('id', 3).select('id'),
          quantity: '1',
          units: 'tablespoon'
        },
        {
          ingredient_id: knex('ingredient').where('id', 8).select('id'),
          recipe_id: knex('recipe').where('id', 3).select('id'),
          quantity: '2',
          units: 'teaspoon'
        },
        {
          ingredient_id: knex('ingredient').where('id', 9).select('id'),
          recipe_id: knex('recipe').where('id', 3).select('id'),
          quantity: '1',
          units: 'teaspoon'
        },
        {
          ingredient_id: knex('ingredient').where('id', 10).select('id'),
          recipe_id: knex('recipe').where('id', 3).select('id'),
          quantity: '2',
          units: 'cup'
        },
        {
          ingredient_id: knex('ingredient').where('id', 11).select('id'),
          recipe_id: knex('recipe').where('id', 3).select('id'),
          quantity: '3',
          units: 'tablespoon'
        }
      ])
    })
};
