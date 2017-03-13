
exports.up = function(knex) {
  return knex.schema.createTable('step', step => {
    step.increments('id')
    step.integer('recipe_id').references('id').inTable('recipe')
    step.string('body')
    step.integer('order_number')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('step')
}
