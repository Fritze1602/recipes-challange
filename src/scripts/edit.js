import {initializeEditPage, generateIngredientDom, toggleTitleFormat} from './edit-view'
import {updateRecipeHead, getRecipes, deleteRecipe, updateRecipeStatusMsg} from './recipes'
import {createIngredient, updateIngredient} from './ingredients'
import '../styles/styles.scss'

const recipeId = window.location.hash.substring(1)
const titleEl =  document.querySelector('#title')
const subtitleEl = document.querySelector('#subtitle')
const recipes = getRecipes()

if(recipes.findIndex((recipe) => recipe.id === recipeId ) >-1 ){
    initializeEditPage()
} else {
    location.assign(`./index.html`)
}

document.querySelector('#title-input').addEventListener('input', (e) => {
    updateRecipeHead(recipeId, {name: e.target.value})
    titleEl.textContent = e.target.value.length > 0 ? e.target.value : 'edit title'
    toggleTitleFormat()
})

document.querySelector('#recipe-head textarea').addEventListener('input', (e) => {
    updateRecipeHead(recipeId, {
        preps: e.target.value
    })
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
})

document.querySelector('#remove').addEventListener('click', (e)=>{
    deleteRecipe(recipeId)
    location.assign('./index.html')
})