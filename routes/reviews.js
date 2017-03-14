const router = require('express').Router()
const knex = require('../db/knex.js')

router.get('/all/:id', (req, res) => {
  var recipeId = req.params.id
  knex('review').where('recipe_id', recipeId)
    .then(result => {
      res.send(result)
    })
})

router.get('/specific/:id', (req, res) => {
  var reviewId = req.params.id
  knex('review').where('id', reviewId)
    .then(result => {
      res.send(result)
    })
})

router.post('/', (req, res) => {
  var postId = req.body.recipe_id
  var postReview = req.body.body
  var postRating = req.body.rating
  var authorName = req.body.author_name

  knex('author').where('name', authorName)
    .then(result => {
      if (result[0].name == authorName) {
        knex('review').insert({recipe_id:postId, author_id:result[0].id, body:postReview, rating:postRating})
          .then(result => {
            knex('review').where('body', postReview)
              .then(newCommentToSendback => {
                res.send(newCommentToSendback)
              })
          })
      }
    })
    .catch(result => {
      knex('author').insert({name:authorName}).returning('id')
        .then(result => {
          knex('review').insert({recipe_id:postId, author_id:result[0], body:postReview, rating:postRating}).returning(['id', 'recipe_id', 'author_id', 'body', 'rating'])
            .then(sendingBackNewCommentNewUser => {
              res.send(sendingBackNewCommentNewUser)
            })
        })
    })
})


module.exports = router
