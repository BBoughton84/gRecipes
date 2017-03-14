
exports.seed = function(knex, Promise) {
  return knex('ingredient').del()
    .then(function () {
      return knex('ingredient').insert([
        {name: 'Celery'},
        {name: 'Mushrooms'},
        {name: 'Steak'},
        {name: 'Sausage'},
        {name: 'Bread'},
        {name: 'Pepper'},
        {name: 'Bell Pepper'},
        {name: 'Onion'},
        {name: 'Garlic Powder'},
        {name: 'Onion Powder'},
        {name: 'Mustard'},
        {name: 'Pinto Beans'},
        {name: 'Ground Beef'},
        {name: 'Pasta'},
        {name: 'Tomato Sauce'},
        {name: 'Tomato Paste'},
        {name: 'Pepperoni'},
        {name: 'Pork'},
        {name: 'Teriaki Sauce'},
        {name: 'Salt'},
        {name: 'Chicken Broth'},
        {name: 'Potatoes'},
        {name: 'Cabbage'},
        {name: 'Brussel Sprouts'},
        {name: 'Broccoli'},
        {name: 'Chicken'}
      ]);
    });
};
