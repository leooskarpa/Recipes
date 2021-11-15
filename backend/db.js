const Pool = require('pg').Pool

const dbPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'RecipesOR',
  password: 'admin',
  port: 5433,
})

const queryAllRecipes = `select recipe.name,
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

const getAllRecipes = () => {
  return new Promise((resolve, reject) => {
    dbPool.query(queryAllRecipes, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.rows)
      }
    })
  })
}

module.exports = {
  getAllRecipes,
}
