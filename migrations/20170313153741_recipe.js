
exports.up = function(knex) {
  return knex.schema.createTable('recipe', recipe => {
    recipe.increments('id')
    recipe.string('name')
    recipe.string('image_URL')
    recipe.string('description')
    // recipe.string('author_name').references('name').inTable('author')
    recipe.integer('author_id').references('id').inTable('author')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('recipe')
}
