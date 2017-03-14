const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const recipes = require('./routes/recipes.js')
const reviews = require('./routes/reviews.js')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var corsOptions = {
  origin: ['localhost', 'https://sugs-grecipes.firebaseapp.com'],
  optionsSuccessStatus:200
}

app.use(cors(corsOptions))

app.use('/recipes', recipes)
app.use('/reviews', reviews)

app.listen(PORT, () => {
  console.log(`CORS-Enabled web server listening on port ${PORT}`)
})
