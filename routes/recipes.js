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
  var joinTableHolder = []
  var ingredientHolder = []
  var bothItems = []
  knex('ingredient_recipe').where('recipe_id', id)
    .then(result => {
      joinTableHolder = result
      for (var i = 0; i < result.length; i++) {
        ingredientHolder.push(knex('ingredient').where('id', result[i]["ingredient_id"]).first())
      }
      Promise.all([Promise.all(ingredientHolder), joinTableHolder])
        .then(result => {
          res.send(result)

        })
    })
})

router.get('/ri/:id', (req, res) => {
  var id = req.params.id
  knex('ingredient_recipe').where('ingredient_id', id)
    .then(result => {
      res.send(result)
    })
})

router.get('/:id', (req, res) => {
  var recipeId = req.params.id
  var recipeHolder = []
  var nameHolder
  var recipeRating =[]
  knex('recipe').where('id', recipeId)
    .then(result => {
      recipeHolder = result
      nameHolderId = result[0]["author_id"]
      knex('review').where('recipe_id', recipeId).avg('rating')
        .then(rating => {
          recipeRating = recipeHolder.concat(rating)
          knex('author').where('id', nameHolderId)
            .then(name => {
              res.send(recipeRating.concat(name))
            })
        })
    })
})

router.get('/', (req, res) => {
  knex('recipe')
    .then(result => {
      res.send(result)
    })
})

router.get('/step/:id', (req, res) => {
  var stepId = req.params.id
  knex('step').orderBy('order_number', 'asc').where('recipe_id', stepId)
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
            var newItemAdded = newRecipe
            var stepPromises = []
            for (var i = 0; i < stepArray.length; i++) {
                stepPromises.push(knex('step').insert({recipe_id:newItemAdded[0].id, body:stepArray[i], order_number:i+1}))
            }
            Promise.all(stepPromises)
              .then(result => {
                res.send(newItemAdded)
              })
          })
      }
    })
    .catch(result => {
      knex('author').insert({name:authorName}).returning('id')
        .then(result => {
          knex('recipe').insert({name:recipeName, author_id:result[0], description:recipeDesc, image_URL:imageURL}).returning(['id', 'name', 'author_id', 'description', 'image_URL'])
            .then(sendingBackNewRecipeNewUser => {
              var newItemAdded = sendingBackNewRecipeNewUser
              var stepPromises = []
              for (var i = 0; i < stepArray.length; i++) {
                  stepPromises.push(knex('step').insert({recipe_id:newItemAdded[0].id, body:stepArray[i], order_number:i+1}))
              }
              Promise.all(stepPromises)
                .then(result => {
                  res.send(newItemAdded)
                })
            })
        })
    })
})


router.post('/ingredient', (req, res) => {
  var recipeId = req.body.recipe_id
  var ingredientName = req.body.name
  var ingredientUnits = req.body.units
  var ingredientQuantity = req.body.quantity

  knex('ingredient').insert({name:ingredientName}).returning('id')
    .then(result => {
      var holdsNewId = result[0]
      knex('ingredient_recipe').insert({ingredient_id:holdsNewId, recipe_id:recipeId, quantity:ingredientQuantity, units:ingredientUnits})
        .then(nextresult => {
          res.send(200)
        })
    })
})

router.patch('/ingredientpatch', (req, res) => {
  var ingredientIdPatch = req.body.ingredient_id
  var recipeIdPatch = req.body.recipe_id
  var patchIngredient = req.body.name
  var patchUnits = req.body.units
  var patchQuantity = req.body.quantity

  knex('ingredient').where('id', ingredientIdPatch).update({name:patchIngredient})
    .then(result => {
      knex('ingredient_recipe').where('ingredient_id', ingredientIdPatch).update({quantity:patchQuantity, units:patchUnits})
        .then(nextresult => {
          res.send(200)
        })
    })
})


router.patch('/', (req, res) => {
  var patchId = req.body.recipe_id
  var patchBody = req.body.description
  var patchTitle = req.body.name
  var patchImg = req.body.image_URL
  var stepArray = req.body.stepArray

  knex('recipe').where('id', patchId).update({name:patchTitle, description:patchBody, image_URL:patchImg})
    .then(result => {
      var newItemAdded = result
      var stepPromises = []
      for (var i = 0; i < stepArray.length; i++) {
          stepPromises.push(knex('step').where({
            recipe_id: patchId,
            order_number: i + 1}).update({recipe_id:patchId, body:stepArray[i], order_number:i+1}))
        }
      Promise.all(stepPromises)
        .then(result => {
          res.sendStatus(200).send(newItemAdded)
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

router.delete('/ingredient/:id', (req, res) => {
  var ingredientToDelete = req.params.id
  knex('ingredient_recipe').where('ingredient_id', ingredientToDelete).del()
    .then(result => {
      knex('ingredient').where('id', ingredientToDelete).del()
        .then(newresult => {
          res.send(200)
        })
    })
})

router.delete('/step/:id', (req, res) => {
  var stepToDelete = req.params.id
  knex('step').where('id', stepToDelete).del()
    .then(result => {
      console.log(result)
      res.send(200)
    })
})



module.exports = router
