
exports.seed = function(knex, Promise) {
  return knex('recipe').del()
    .then(function () {
      return knex('recipe').insert([
        {
          name: 'Chicken Cordone-Blue',
          image_URL: 'https://s-media-cache-ak0.pinimg.com/564x/99/21/54/99215432cb357ed2318f0c8a3c60678f.jpg',
          description: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
          author_id: knex('author').where('id', 1).select('id')
        },
        {
          name: 'Bacon Wrapped Filet',
          image_URL: 'https://www.smokehouse.com/burgers.nsf/Images/862578D9007320F886256707004EF17A/$file/J1064-800.jpg',
          description: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
          author_id: knex('author').where('id', 2).select('id')
        },
        {
          name: 'Best Prime Rib Ever',
          image_URL: 'https://foodieandwine.com/wp-content/uploads/2015/12/Prime_Rib_Recipe.jpg',
          description: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
          author_id: knex('author').where('id', 3).select('id')
        }
      ])
    })
}
