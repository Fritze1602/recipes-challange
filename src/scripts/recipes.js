import uuidv4 from 'uuid/v4'
import { isJson } from './utils'
import moment from 'moment'
import {getFilters} from './filters'


let recipes = []

const loadRecipes = () => {
    const recipesJson = localStorage.getItem('recipes')
    if (recipesJson) {
        recipes = (isJson(recipesJson)) ? JSON.parse(recipesJson) : []
    } else {
        recipes = []
    }
}

const getRecipes = () => recipes

const getRecipeById = (id) => {
    const recipe = recipes.find((recipe) => recipe.id === id)
    return recipe
}

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const createRecipe = () => {
    const recipeId = uuidv4()
    recipes.push({
        id: recipeId,
        lastChange: moment().valueOf(),
        name: '',
        msg: '',
        preps: '',
        thumbs: '',
        ingredients: []
    })
    saveRecipes()
    return recipeId
}

const deleteRecipe = (id) => {
    const delIndex = recipes.findIndex((item) => item.id === id)
    if (delIndex > -1) {
        recipes.splice(delIndex, 1)
    }
    saveRecipes()
}

const updateRecipeHead = (id, update) => {
    const recipe = getRecipeById(id)
    if (typeof update.name === 'string') {
        recipe.name = update.name
        recipe.lastChange = moment().valueOf()
    }
    if (typeof update.preps === 'string') {
        recipe.preps = update.preps
    }
    // if (typeof update.available === 'string'){
    //     recipe.name = update.name
    // }
    if (typeof update.thumbs === 'string') {
        recipe.thumbs = update.thumbs
    }
    updateRecipeLastDate(id)
    saveRecipes()
}

const updateRecipeLastDate = (id) => {
    const recipe = getRecipeById(id)
    recipe.lastChange = moment().valueOf()
}

const updateRecipeStatusMsg = (id) => {
    const recipe = getRecipeById(id)
    let availCount = 0
    const totalIngredients = recipe.ingredients.length
    recipe.ingredients.forEach((ingredient) => {
        if (ingredient.available === true) {
            availCount++
        }
    })
    let msg = ''
    if (totalIngredients === 0) {
        msg = 'please add ingredients'
    } else if (availCount === 0) {
        msg = `No ingredients available (${availCount} / ${totalIngredients})`
    } else if (availCount < totalIngredients) {
        msg = `Some ingredients available (${availCount} / ${totalIngredients})`
    } else {
        msg = `All ingredients available (${availCount} / ${totalIngredients})`
    }
    recipe.msg = msg
    saveRecipes()
    return msg
}

const sortRecipes = (receipesArray) => {
    let recipes = receipesArray
    const order = getFilters().order
    const { sortBy, direction } = order
    // abc
    if (sortBy === 'abc' && direction === 'desc') {
        recipes.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1
            }
            return 0
        })
    } else if (sortBy === 'abc' && direction === 'asc') {
        recipes.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1
            }
            return 0
        })
    } else if (sortBy === 'date' && direction === 'asc') {
        recipes.sort((a, b) => {
            if (a.lastChange < b.lastChange) {
                return -1
            }
            if (a.lastChange > b.lastChange) {
                return 1
            }
            return 0
        })
    } else if (sortBy === 'date' && direction === 'desc') {
        console.log('fired sort')
        recipes.sort((a, b) => {
            if (a.lastChange > b.lastChange) {
                return -1
            }
            if (a.lastChange < b.lastChange) {
                return 1
            }
            return 0
        })
    }
}

// Ausführung
loadRecipes()

export {
    getRecipes,
    getRecipeById,
    loadRecipes,
    saveRecipes,
    createRecipe,
    deleteReceipt,
    updateRecipeHead,
    updateRecipeLastDate,
    deleteRecipe,
    updateRecipeStatusMsg,
    sortRecipes
}


