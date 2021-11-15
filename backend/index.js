const express = require('express')
const db = require('./db.js')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/recipes', (req, res) => {
  db.getAllRecipes()
    .then(response => {
      res.status(200).send(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
