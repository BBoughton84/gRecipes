
exports.seed = function(knex, Promise) {
  return knex('step').del()
    .then(function () {
      return knex('step').insert([
        {
          recipe_id: knex('recipe').where('id', 1).select('id'),
          body: 'bbq chicken',
          order_number: 1
        },
        {
          recipe_id: knex('recipe').where('id', 1).select('id'),
          body: 'add sauce',
          order_number: 2
        },
        {
          recipe_id: knex('recipe').where('id', 1).select('id'),
          body: 'cook broccoli',
          order_number: 3
        },
        {
          recipe_id: knex('recipe').where('id', 1).select('id'),
          body: 'season broccoli',
          order_number: 4
        },
        {
          recipe_id: knex('recipe').where('id', 1).select('id'),
          body: 'mix chicken and broccoli',
          order_number: 5
        },
        {
          recipe_id: knex('recipe').where('id', 2).select('id'),
          body: 'put steak on at 350',
          order_number: 1
        },
        {
          recipe_id: knex('recipe').where('id', 2).select('id'),
          body: 'cut onions and bell peppers',
          order_number: 2
        },
        {
          recipe_id: knex('recipe').where('id', 2).select('id'),
          body: 'grill onions and bell peppers',
          order_number: 3
        },
        {
          recipe_id: knex('recipe').where('id', 2).select('id'),
          body: 'add seasoning to bell peppers',
          order_number: 4
        },
        {
          recipe_id: knex('recipe').where('id', 2).select('id'),
          body: 'remove meat and cover for 2 minutes',
          order_number: 5
        },
        {
          recipe_id: knex('recipe').where('id', 2).select('id'),
          body: 'add salt',
          order_number: 6
        }
      ])
    })
};
