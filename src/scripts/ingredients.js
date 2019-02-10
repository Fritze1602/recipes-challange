import uuidv4 from 'uuid/v4'
import {getReceipes, saveReceipes} from './receipes'

// ***********************
// Ingredients **************
// ******************************

const createIngredient = (receipeId) => {
    const receipe = getReceipes().find((item) => item.id === receipeId )
    const id = uuidv4()
    receipe.ingredients.push(
    {
        id,
        name: 'Add Ingredient',
        available: false},
    )
    saveReceipes()
    return id
}

// update ingredient
const updateIngredient = (receipeID, ingredentID, updates) => {
    const receipe = getReceipes().find((receipe) => receipe.id === receipeID )
    const ingredient = receipe.ingredients.find((ingredient) => ingredient.id === ingredentID)
    if (typeof updates.name === 'string') {
        ingredient.name = updates.name
    }
    if (typeof updates.available === 'boolean') {
       
        ingredient.available = updates.available
    }
    
    saveReceipes()
}

// delete ingredient
const deleteIngredient = (receipeID, ingredentID) => {
    const receipe = getReceipes().find((receipe) => receipe.id === receipeID )
    const delId = receipe.ingredients.findIndex((ingredient) => ingredient.id === ingredentID)
    if(delId > -1) {
        receipe.ingredients.splice(delId, 1)
    }
    saveReceipes()
}

const getIngredient = (receipeID, ingredentID) => {
    const receipe = getReceipes().find((receipe) => receipe.id === receipeID )
    return receipe.ingredients.find((ingredient) => ingredient.id === ingredentID)
}

export {createIngredient, updateIngredient, deleteIngredient , getIngredient}
