const express = require('express')
const openapi = require('@wesleytodd/openapi')
const db = require('./db.js')

const app = express()
const port = 3000
const oapi = openapi({
  openapi: '3.0.0',
  info: {
    title: 'Recipe App',
    version: '1.0.0',
  },
})

app.use(express.json())
app.use(oapi)
app.set('content-type', 'application/json')

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  )
  next()
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

app.get('/recipe/:id', (req, res) => {
  db.getRecipe(parseInt(req.params.id))
    .then(response => {
      if (response.rows.length > 0) {
        res.status(200).send(wrapper(200, 'Fetched recipe object.', response))
      } else {
        res
          .status(404)
          .send(wrapper(404, "This recipe doesn't exist.", response))
      }
    })
    .catch(error => {
      res.status(500).send(wrapper(500, 'Server error.', error))
    })
})

app.get('/recipe/:id/ingredients', (req, res) => {
  db.getRecipeIngredients(req.params.id)
    .then(response => {
      if (response.rows.length > 0) {
        res
          .status(200)
          .send(wrapper(200, 'Fetched recipe ingredients.', response))
      } else {
        res
          .status(404)
          .send(wrapper(404, "This recipe ingredients don't exist.", response))
      }
    })
    .catch(error => {
      res.status(500).send(wrapper(500, 'Server error.', error))
    })
})

app.get('/recipe/:id/country', (req, res) => {
  db.getRecipeCountry(req.params.id)
    .then(response => {
      if (response.rows.length > 0) {
        res.status(200).send(wrapper(200, 'Fetched recipe country.', response))
      } else {
        res
          .status(404)
          .send(wrapper(404, "This recipes country doesn't exist.", response))
      }
    })
    .catch(error => {
      res.status(500).send(wrapper(500, 'Server error.', error))
    })
})

app.get('/recipe/:id/preptime', (req, res) => {
  db.getRecipePrepTime(req.params.id)
    .then(response => {
      if (response.rows.length > 0) {
        res.status(200).send(wrapper(200, 'Fetched recipe preptime.', response))
      } else {
        res
          .status(404)
          .send(wrapper(404, "This recipes preptime doesn't exist.", response))
      }
    })
    .catch(error => {
      res.status(500).send(wrapper(500, 'Server error.', error))
    })
})

app.post('/recipe', (req, res) => {
  db.postNewRecipeMethod(req.body)
    .then(response => {
      res.status(200).send(wrapper(200, 'Recipe saved to db.', response))
    })
    .catch(error => {
      res.status(500).send(wrapper(500, 'Server error.', error))
    })
})

app.put('/recipe/:id', (req, res) => {
  db.updateRecipeMethod(req.params.id, req.body)
    .then(response => {
      res.status(200).send(wrapper(200, 'Recipe updated.', response))
    })
    .catch(error => {
      console.error(error)
      res.status(500).send(wrapper(500, 'Server error.', error))
    })
})

app.delete('/recipe/:id', (req, res) => {
  db.deleteRecipeMethod(req.params.id)
    .then(response => {
      res.status(200).send(wrapper(200, 'Recipe deleted from db.', response))
    })
    .catch(error => {
      console.error(error)
      res.status(500).send(wrapper(500, 'Server error.', error))
    })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

const wrapper = (status, message, response) => {
  return {
    status: status,
    message: message,
    response: response.rows,
  }
}
