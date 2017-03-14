const router = require('express').Router()
const knex = require('../db/knex.js')

// router.get('/author/')

router.get('/', (req, res) => {
  knex('recipe')
    .then(result => {
      res.send(result)
    })
})

router.get('/:id', (req, res) => {
  var recipeId = req.params.id
  knex('recipe').where('id', recipeId)
    .then(result => {
      res.send(result)
    })
})

router.get('/step/:id', (req, res) => {
  var stepId = req.params.id
  knex('step').where('recipe_id', stepId)
    .then(result => {
      res.send(result)
    })
})

router.post('/', (req, res) => {
  var recipeName = req.body.name
  var recipeDesc = req.body.description
  var authorName = req.body.author_name
  var imageURL = req.body.image_URL
  var stepArray = req.body.stepArray

  knex('author').where('name', authorName)
    .then(result => {
      if (result[0].name == authorName) {
        knex('recipe').insert({name:recipeName, author_id:result[0].id, description:recipeDesc, image_URL:imageURL}).returning(['id', 'name', 'author_id', 'description', 'image_URL'])
          .then(newRecipe => {
                res.send(newRecipe)
          })
      }
    })
    .catch(result => {
      knex('author').insert({name:authorName}).returning('id')
        .then(result => {
          knex('recipe').insert({name:recipeName, author_id:result[0], description:recipeDesc, image_URL:imageURL}).returning(['id', 'name', 'author_id', 'description', 'image_URL'])
            .then(sendingBackNewRecipeNewUser => {
              res.send(sendingBackNewRecipeNewUser)
            })
        })
    })
})

router.delete('/:id', (req, res) => {
  var itemtoDelete = req.params.id
  knex('recipe').where('id', itemtoDelete).del()
    .then(result => {
      res.send(200)
    })
})



module.exports = router
