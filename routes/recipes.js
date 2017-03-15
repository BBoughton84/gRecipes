const router = require('express').Router()
const knex = require('../db/knex.js')

router.get('/author', (req, res) => {
  knex('author')
    .then(result => [
      res.send(result)
    ])
})

router.get('/author/:id', (req, res) => {
  var id = req.params.id
  knex('author').where('id', id)
    .then(result => [
      res.send(result)
    ])
})

router.get('/ingredients/:id', (req, res) => {
  var id = req.params.id
  knex('ingredient_recipe').where('recipe_id', id)
    .then(result => {
      res.send(result)
    })
})

router.get('/ri/:id', (req, res) => {
  var id = req.params.id
  knex('ingredient_recipe').where('ingredient_id', id)
    .then(result => {
      res.send(result)
    })
})

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

router.patch('/', (req, res) => {
  var patchId = req.body.recipe_id
  var patchBody = req.body.body
  var patchTitle = req.body.name
  var patchImg = req.body.image_URL

  knex('recipe').where('id', patchId).update({name:patchTitle, description:patchBody, image_URL:patchImg})

})

router.delete('/:id', (req, res) => {
  var itemtoDelete = req.params.id
  knex('recipe').where('id', itemtoDelete).del()
    .then(result => {
      res.send(200)
    })
})





module.exports = router
