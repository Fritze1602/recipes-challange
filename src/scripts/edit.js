import {initializeEditPage, generateIngredientDom, toggleTitleFormat, updateDateEl, formatThumbs} from './edit-view'
import {updateRecipeHead, getRecipes, getRecipeById , deleteRecipe, updateRecipeStatusMsg} from './recipes'
import {createIngredient, updateIngredient} from './ingredients'

import '../styles/styles.scss'

const recipeId = window.location.hash.substring(1)
const titleEl =  document.querySelector('#title')
const subtitleEl = document.querySelector('#subtitle')
const recipes = getRecipes()
const recipe = getRecipeById(recipeId)

if(recipes.findIndex((recipe) => recipe.id === recipeId ) >-1 ){
    initializeEditPage()
} else {
    location.assign(`./index.html`)
}

document.querySelector('#title-input').addEventListener('input', (e) => {
    updateRecipeHead(recipeId, {name: e.target.value})
    titleEl.textContent = e.target.value.length > 0 ? e.target.value : 'edit title'
    toggleTitleFormat()
    updateDateEl()
})

document.querySelector('#recipe-head textarea').addEventListener('input', (e) => {
    updateRecipeHead(recipeId, {
        preps: e.target.value
    })
    updateDateEl()
})

document.querySelector('#thumb-up').addEventListener('click', (e) => {
    updateRecipeHead(recipeId, {
        thumbs: recipe.thumbs === 'thumb_up' ? '' : 'thumb_up'
    })
    formatThumbs()
    updateDateEl()
})
document.querySelector('#thumb-down').addEventListener('click', (e) => {
    updateRecipeHead(recipeId, {
        thumbs: recipe.thumbs === 'thumb_down' ? '' : 'thumb_down'
    })
    formatThumbs()
    updateDateEl()
   
})

document.querySelector('#add-form').addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log('submit fired')
    const text = e.target.elements.addNewIngredient.value
    const ingredientId = createIngredient(recipeId)
    updateIngredient(recipeId, ingredientId, {name: text})
    generateIngredientDom(ingredientId, text)
    e.target.elements.addNewIngredient.value = ''
    subtitleEl.textContent = updateRecipeStatusMsg(recipeId)   
    updateDateEl() 
})

document.querySelector('#remove').addEventListener('click', (e)=>{
    deleteRecipe(recipeId)
    location.assign('./index.html')
})