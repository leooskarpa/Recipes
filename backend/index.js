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

app.use('/docs', oapi.swaggerui)

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  )
  next()
})

app.get(
  '/recipes',
  oapi.path({
    summary: 'Get all recipes',
    responses: {
      200: {
        description: 'Successful',
        content: {
          'application/json': {
            schema: {
              type: 'array',
            },
          },
        },
      },
      500: {
        description: 'Internal server error',
      },
    },
  }),
  (req, res) => {
    db.getAllRecipes()
      .then(response => {
        res.status(200).send(response)
      })
      .catch(error => {
        res.status(500).send(error)
      })
  }
)

app.get(
  '/recipe/:id',
  oapi.path({
    summary: 'Get recipe by Id',
    responses: {
      200: {
        description: 'Successful fetching recipe',
        content: {
          'application/json': {
            schema: {
              type: 'array',
            },
          },
        },
      },
      404: {
        description: "Recipe with that Id doesn't exist.",
      },
      500: {
        description: 'Internal server error',
      },
    },
  }),
  (req, res) => {
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
  }
)

app.get(
  '/recipe/:id/ingredients',
  oapi.path({
    summary: 'Get recipe ingredients by recipe Id',
    responses: {
      200: {
        description: 'Successful fetching ingredients',
        content: {
          'application/json': {
            schema: {
              type: 'array',
            },
          },
        },
      },
      404: {
        description: "Recipe with that Id or ingredients doesn't exist.",
      },
      500: {
        description: 'Internal server error',
      },
    },
  }),
  (req, res) => {
    db.getRecipeIngredients(req.params.id)
      .then(response => {
        if (response.rows.length > 0) {
          res
            .status(200)
            .send(wrapper(200, 'Fetched recipe ingredients.', response))
        } else {
          res
            .status(404)
            .send(
              wrapper(404, "This recipe ingredients don't exist.", response)
            )
        }
      })
      .catch(error => {
        res.status(500).send(wrapper(500, 'Server error.', error))
      })
  }
)

app.get(
  '/recipe/:id/country',
  oapi.path({
    summary: 'Get recipe country by recipe Id',
    responses: {
      200: {
        description: 'Successful fetching recipe country',
        content: {
          'application/json': {
            schema: {
              type: 'array',
            },
          },
        },
      },
      404: {
        description: "Recipe with that Id or with country doesn't exist.",
      },
      500: {
        description: 'Internal server error',
      },
    },
  }),
  (req, res) => {
    db.getRecipeCountry(req.params.id)
      .then(response => {
        if (response.rows.length > 0) {
          res
            .status(200)
            .send(wrapper(200, 'Fetched recipe country.', response))
        } else {
          res
            .status(404)
            .send(wrapper(404, "This recipes country doesn't exist.", response))
        }
      })
      .catch(error => {
        res.status(500).send(wrapper(500, 'Server error.', error))
      })
  }
)

app.get(
  '/recipe/:id/preptime',
  oapi.path({
    summary: 'Get recipe preptime by recipe Id',
    responses: {
      200: {
        description: 'Successful fetching recipe preptime',
        content: {
          'application/json': {
            schema: {
              type: 'array',
            },
          },
        },
      },
      404: {
        description: "Recipe with that Id or with preptime set doesn't exist.",
      },
      500: {
        description: 'Internal server error',
      },
    },
  }),
  (req, res) => {
    db.getRecipePrepTime(req.params.id)
      .then(response => {
        if (response.rows.length > 0) {
          res
            .status(200)
            .send(wrapper(200, 'Fetched recipe preptime.', response))
        } else {
          res
            .status(404)
            .send(
              wrapper(404, "This recipes preptime doesn't exist.", response)
            )
        }
      })
      .catch(error => {
        res.status(500).send(wrapper(500, 'Server error.', error))
      })
  }
)

app.post(
  '/recipe',
  oapi.path({
    summary: 'Put new recipe in db',
    responses: {
      200: {
        description: 'Successful creating new recipe',
      },
      500: {
        description: 'Internal server error',
      },
    },
    requestBody: {
      description: 'Recipe to add to the db',
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          examples: {
            recipe: {
              summary: 'Recipe Example',
              value: {
                id: 10,
                name: 'Test',
                steps: '{{Boil water.}, {Put eggs in boiling water.}}',
                preptime: 10,
                cooktime: 20,
                servings: 4,
                type: 'breakfast',
                countryid: 1,
                description: 'Fast breakfast for fast people.',
              },
            },
          },
        },
      },
    },
  }),
  (req, res) => {
    db.postNewRecipeMethod(req.body)
      .then(response => {
        res.status(200).send(wrapper(200, 'Recipe saved to db.', response))
      })
      .catch(error => {
        res.status(500).send(wrapper(500, 'Server error.', error))
      })
  }
)

app.put(
  '/recipe/:id',
  oapi.path({
    summary: 'Update recipe in db',
    responses: {
      200: {
        description: 'Successful updating recipe',
      },
      500: {
        description: 'Internal server error',
      },
    },
    requestBody: {
      description: 'Recipe to update in the db',
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          examples: {
            recipe: {
              summary: 'Recipe Example',
              value: {
                name: 'Test 2',
                preptime: 30,
                cooktime: 60,
                servings: 4,
              },
            },
          },
        },
      },
    },
  }),
  (req, res) => {
    db.updateRecipeMethod(req.params.id, req.body)
      .then(response => {
        res.status(200).send(wrapper(200, 'Recipe updated.', response))
      })
      .catch(error => {
        console.error(error)
        res.status(500).send(wrapper(500, 'Server error.', error))
      })
  }
)

app.delete(
  '/recipe/:id',
  oapi.path({
    summary: 'Put new recipe in db',
    responses: {
      200: {
        description: 'Successfully deleting recipe at given id.',
      },
      500: {
        description: 'Internal server error',
      },
    },
  }),
  (req, res) => {
    db.deleteRecipeMethod(req.params.id)
      .then(response => {
        res.status(200).send(wrapper(200, 'Recipe deleted from db.', response))
      })
      .catch(error => {
        console.error(error)
        res.status(500).send(wrapper(500, 'Server error.', error))
      })
  }
)

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
