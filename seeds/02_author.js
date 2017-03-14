
exports.seed = function(knex, Promise) {
  return knex('author').del()
    .then(function () {
      return knex('author').insert([
        {name: 'Jim'},
        {name: 'Bob'},
        {name: 'Matt'},
        {name: 'Alice'},
        {name: 'Eve'}
      ]);
    });
};
