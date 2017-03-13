
exports.up = function(knex) {
  return knex.schema.createTable('website', website => {
    website.increments('id')
    website.string('name')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('website')
}
