
exports.up = function(knex) {
  return knex.schema.createTable('review', review => {
    review.increments('id')
    review.integer('recipe_id').references('id').inTable('recipe')
    review.integer('author_id').references('id').inTable('author')
    review.string('body')
    review.integer('rating')
    review.timestamp('createtime').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('review')
}
