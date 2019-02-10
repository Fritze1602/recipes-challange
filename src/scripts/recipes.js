import uuidv4 from 'uuid/v4'
import {isJson, orderRecipesByName} from './utils'
//import {getFilters} from './filters'


let recipes = []

const loadRecipes = () => {
    const recipesJson = localStorage.getItem('recipes')
    if(recipesJson){
        recipes = (isJson(recipesJson)) ? JSON.parse(recipesJson) : [] 
        orderRecipesByName()
    }else{
        recipes = []
    }
}

const getRecipes = () => recipes

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const createRecipe = () => {
    const recipeId = uuidv4()
    recipes.push({

        id: recipeId,
        name: '',
        msg: '',
        preps: '',
        ingredients: []
    })
    saveRecipes()
    return recipeId
}

const deleteRecipe = (id) => {
    const delIndex = recipes.findIndex((item) => item.id === id )
    if(delIndex > -1){
        recipes.splice(delIndex, 1)
    }
    saveRecipes()
}

const updateRecipeHead = (id, update) => {
    const recipe = recipes.find((item) => item.id === id )
    if (typeof update.name === 'string'){
        recipe.name = update.name
    }
    if (typeof update.preps === 'string'){
        recipe.preps = update.preps
    }
    if (typeof update.available === 'string'){
        recipe.name = update.name
    }
    
    saveRecipes()
}

const updateRecipeStatusMsg = (id) => {
    const recipe = recipes.find((item) => item.id === id )
    let availCount = 0
    const totalIngredients = recipe.ingredients.length
    recipe.ingredients.forEach((ingredient)=>{
        if(ingredient.available === true) {
            availCount++
        }
    })
    let  msg = ''
    if( totalIngredients === 0) {
        msg = 'please add ingredients'
    } else if(availCount === 0 ){
        msg =`No ingredients available (${availCount} / ${totalIngredients})`
    }   else if(availCount < totalIngredients ){
        msg =`Some ingredients available (${availCount} / ${totalIngredients})`
    }  else {
        msg =`All ingredients available (${availCount} / ${totalIngredients})`
    }
    recipe.msg = msg
    saveRecipes()
    return msg
}

// Ausführung
loadRecipes()

export {getRecipes, saveRecipes, createRecipe, deleteReceipt, updateRecipeHead, deleteRecipe, updateRecipeStatusMsg}


