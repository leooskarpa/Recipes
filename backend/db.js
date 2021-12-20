const Pool = require('pg').Pool

const dbPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'RecipesOR',
  password: 'admin',
  port: 5433,
})

const queryAllRecipes = () => {
  return `
select recipe.name,
recipe.steps,
recipe.description,
recipe.type,
recipe.cooktime,
recipe.preptime,
recipe.servings,
c.name as cousine,
i.name as ingredientName,
i.amount as ingredientAmount

from recipe
left join country c on c.id = recipe.countryid
left join ingredient i on recipe.id = i.recipe_id;`
}

const queryRecipe = id => {
  return `
  select recipe.id as id,
  recipe.name as name,
  recipe.cooktime,
  recipe.preptime,
  recipe.servings,
  recipe.description,
  recipe.steps,
  recipe.type,
  i.name as ingredient_name,
  i.amount,
  c.name as country

  from recipe
  left join country c on c.id = recipe.countryid
  left join ingredient i on recipe.id = i.recipe_id

  where recipe.id = ${id};`
}

const queryRecipeIngredients = id => {
  return `
  select i.name as ingredient_name,
  i.amount

  from recipe
  left join country c on c.id = recipe.countryid
  left join ingredient i on recipe.id = i.recipe_id

  where recipe.id = ${id}`
}

const queryRecipeCountry = id => {
  return `
  select c.name as countryName

  from recipe
  left join country c on c.id = recipe.countryid

  where recipe.id = ${id}`
}

const queryRecipePrepTime = id => {
  return `
  select preptime
  from recipe
  where recipe.id = ${id};`
}

const postNewRecipe = (
  id,
  name,
  steps,
  preptime,
  cooktime,
  servings,
  type,
  countryid,
  description
) => {
  return `
  insert into recipe(id, name, steps, preptime, cooktime, servings, type, countryid, description)
  values (${id}, ${name}, ${steps}, ${preptime}, ${cooktime}, ${servings}, ${type}, ${countryid}, ${description});
  `
}

const updateRecipe = (id, body) => {
  let query = `update recipe set `
  let atributes = []
  for (let [key, value] of Object.entries(body)) {
    atributes.push(key + ` = '${value}'`)
  }

  query += atributes.join(',') + ` where recipe.id = ${id};`

  return query
}

const deleteRecipe = id => {
  return `
  delete from recipe where recipe.id = ${id};
  `
}

// Services
const getAllRecipes = () => {
  return new Promise((resolve, reject) => {
    dbPool.query(queryAllRecipes(), (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.rows)
      }
    })
  })
}

const getRecipe = id => {
  return new Promise((resolve, reject) => {
    dbPool.query(queryRecipe(id), (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const getRecipeIngredients = id => {
  return new Promise((resolve, reject) => {
    dbPool.query(queryRecipeIngredients(id), (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const getRecipeCountry = id => {
  return new Promise((resolve, reject) => {
    dbPool.query(queryRecipeCountry(id), (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const getRecipePrepTime = id => {
  return new Promise((resolve, reject) => {
    dbPool.query(queryRecipePrepTime(id), (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const postNewRecipeMethod = body => {
  return new Promise((resolve, reject) => {
    const {
      id,
      name,
      steps,
      preptime,
      cooktime,
      servings,
      type,
      countryid,
      description,
    } = body
    dbPool.query(
      postNewRecipe(
        id,
        name,
        steps,
        preptime,
        cooktime,
        servings,
        type,
        countryid,
        description
      ),
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

const updateRecipeMethod = (id, body) => {
  return new Promise((resolve, reject) => {
    dbPool.query(updateRecipe(id, body), (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const deleteRecipeMethod = id => {
  return new Promise((resolve, reject) => {
    dbPool.query(deleteRecipe(id), (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = {
  getAllRecipes,
  getRecipe,
  getRecipeIngredients,
  getRecipeCountry,
  getRecipePrepTime,
  postNewRecipeMethod,
  updateRecipeMethod,
  deleteRecipeMethod,
}
