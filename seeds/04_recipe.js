
exports.seed = function(knex, Promise) {
  return knex('recipe').del()
    .then(function () {
      return knex('recipe').insert([
        {
          name: 'Chicken Cordone-Blue',
          image_URL: 'wwww.yougolookitup.com',
          description: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
          author_id: knex('author').where('id', 1).select('id')
        },
        {
          name: 'Bacon Wrapped Filet',
          image_URL: 'www.googleit.com',
          description: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
          author_id: knex('author').where('id', 2).select('id')
        },
        {
          name: 'Best Prime Rib Ever',
          image_URL: 'www.callsomeoneelse.com',
          description: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
          author_id: knex('author').where('id', 3).select('id')
        }
      ])
    })
}
