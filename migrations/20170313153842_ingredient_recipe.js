
exports.up = function(knex) {
    return knex.schema.createTable('ingredient_recipe', result => {
      result.integer('ingredient_id').references('id').inTable('ingredient')
      result.integer('recipe_id').references('id').inTable('recipe')
      result.string('quantity')
      result.string('units')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('ingredient_recipe')
}
