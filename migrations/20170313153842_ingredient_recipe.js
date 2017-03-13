
exports.up = function(knex) {
    return knex.schema.createTable('ingredient_recipe', result => {
      result.integer('ingredient_id').references('id').inTable('ingredient')
      result.integer('recipe_id').references('id').inTable('recipe')
      result.integer('quantity')
      result.integer('units')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('ingredient_recipe')
}
