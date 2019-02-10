import { getRecipes, updateRecipeStatusMsg } from './recipes'
import { deleteIngredient, updateIngredient } from './ingredients'

const recipeId = window.location.hash.substring(1)
const recipes = getRecipes()
const recipe = recipes.find((recipe) => recipe.id === recipeId)

const h1El = document.querySelector('#title')
const subtitleEl = document.querySelector('#subtitle')
const headingInputEl = document.querySelector('#title-input')
const textareaEl = document.querySelector('#recipe-head textarea')

const initializeEditPage = () => {
    recipe.name.length > 0 ? h1El.textContent = recipe.name : h1El.textContent = 'Edit title'
    subtitleEl.textContent = updateRecipeStatusMsg(recipeId)
    toggleTitleFormat()
    headingInputEl.value = recipe.name
    textareaEl.value = recipe.preps
    renderIngredients()
}

const toggleTitleFormat = () => {
    recipe.name.length > 0 ? h1El.classList.remove('red-text', 'text-darken-3') : h1El.classList.add('red-text', 'text-darken-3')
}

const generateIngredientDom = (ingredientID, text, available) => {
    const ingredientSectionEl = document.querySelector('#ingredients')
    const wrapperEl = document.createElement('div')
    const labelEl = document.createElement('label')
    const checkEl = document.createElement('input')
    const checkLabelEl = document.createElement('span')
    const inputEl = document.createElement('input')
    const removeEl = document.createElement('i')

    checkEl.type = "checkbox"
    checkEl.classList.add("check-ingredient")
    checkEl.checked = available
    checkEl.addEventListener('change', (e) => {
        updateIngredient(recipeId, ingredientID, { available: e.target.checked })
        subtitleEl.textContent = updateRecipeStatusMsg(recipeId)
    })

    wrapperEl.appendChild(checkEl)
    labelEl.append(checkEl)
    labelEl.append(checkLabelEl)
    wrapperEl.appendChild(labelEl)

    inputEl.type = "text"
    inputEl.placeholder = "ingredients name"
    inputEl.value = text
    inputEl.addEventListener('input', (e) => {
        updateIngredient(recipeId, ingredientID, { name: e.target.value })
    })
    wrapperEl.appendChild(inputEl)

    removeEl.textContent = 'remove_circle_outline'
    removeEl.classList.add('material-icons')
    removeEl.addEventListener('click', (e) => {
        deleteIngredient(recipeId, ingredientID)
        subtitleEl.textContent = updateRecipeStatusMsg(recipeId)
        renderIngredients()
    })
    wrapperEl.appendChild(removeEl)
    ingredientSectionEl.appendChild(wrapperEl)
}

const renderIngredients = () => {
    document.querySelector('#ingredients').innerHTML = ''
    recipe.ingredients.forEach((ingredient) => {
        generateIngredientDom(ingredient.id, ingredient.name, ingredient.available)
    })
}
export { initializeEditPage, generateIngredientDom, toggleTitleFormat }