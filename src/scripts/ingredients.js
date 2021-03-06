import uuidv4 from 'uuid/v4'
import {getRecipes, saveRecipes, updateRecipeLastDate} from './recipes'
import moment from 'moment'

// ***********************
// Ingredients **************
// ******************************

const createIngredient = (recipeId) => {
    const recipe = getRecipes().find((item) => item.id === recipeId )
    const id = uuidv4()
    recipe.ingredients.push(
    {
        id,
        name: 'Add Ingredient',
        available: false},
    )
    recipe.lastChange = moment().valueOf()
    saveRecipes()
    return id
}

// update ingredient
const updateIngredient = (recipeID, ingredentID, updates) => {
    const recipe = getRecipes().find((recipe) => recipe.id === recipeID )
    const ingredient = recipe.ingredients.find((ingredient) => ingredient.id === ingredentID)
    if (typeof updates.name === 'string') {
        ingredient.name = updates.name
    }
    if (typeof updates.available === 'boolean') {
        ingredient.available = updates.available
    }
    updateRecipeLastDate(recipeID)
    saveRecipes()
}

// delete ingredient
const deleteIngredient = (recipeID, ingredentID) => {
    const recipe = getRecipes().find((recipe) => recipe.id === recipeID )
    const delId = recipe.ingredients.findIndex((ingredient) => ingredient.id === ingredentID)
    if(delId > -1) {
        recipe.ingredients.splice(delId, 1)
    }
    updateRecipeLastDate(recipeID)
    saveRecipes()
}

const getIngredient = (recipeID, ingredentID) => {
    const recipe = getRecipes().find((recipe) => recipe.id === recipeID )
    return recipe.ingredients.find((ingredient) => ingredient.id === ingredentID)
}

export {createIngredient, updateIngredient, deleteIngredient , getIngredient}
