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

router.patch('/', (req, res) => {
  var commentChange = req.body.body
  var reviewToEdit = req.body.review_id
  var ratingEdit = req.body.rating

  knex('review').where('id', reviewToEdit).update({body:commentChange, rating:ratingEdit})
    .then(result => {
      res.send(200)
    })
})

router.delete('/:id', (req, res) => {
  var itemDelete = req.params.id
  knex('review').where('id', itemDelete).del()
    .then(result => {
      res.send(200)
    })
})


module.exports = router
