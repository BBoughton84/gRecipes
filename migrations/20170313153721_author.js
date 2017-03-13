
exports.up = function(knex) {
  return knex.schema.createTable('author', author => {
    author.increments('id')
    author.string('name')
  })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('author')
}
