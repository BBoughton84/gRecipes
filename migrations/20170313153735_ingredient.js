
exports.up = function(knex) {
  return knex.schema.createTable('ingredient', ingredient => {
    ingredient.increments('id')
    ingredient.string('name')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ingredient')
}
