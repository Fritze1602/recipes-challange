import { getReceipes, updateReceipeStatusMsg } from './receipes'
import { deleteIngredient, updateIngredient } from './ingredients'

const receipeId = window.location.hash.substring(1)
const receipes = getReceipes()
const receipe = receipes.find((receipe) => receipe.id === receipeId)

const h1El = document.querySelector('#title')
const subtitleEl = document.querySelector('#subtitle')
const headingInputEl = document.querySelector('#title-input')
const textareaEl = document.querySelector('#receipe-head textarea')

const initializeEditPage = () => {
    receipe.name.length > 0 ? h1El.textContent = receipe.name : h1El.textContent = 'Edit title'
    subtitleEl.textContent = updateReceipeStatusMsg(receipeId)
    toggleTitleFormat()
    headingInputEl.value = receipe.name
    textareaEl.value = receipe.preps
    renderIngredients()
}

const toggleTitleFormat = () => {
    receipe.name.length > 0 ? h1El.classList.remove('red-text', 'text-darken-3') : h1El.classList.add('red-text', 'text-darken-3')
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
        updateIngredient(receipeId, ingredientID, { available: e.target.checked })
        subtitleEl.textContent = updateReceipeStatusMsg(receipeId)
    })

    wrapperEl.appendChild(checkEl)
    labelEl.append(checkEl)
    labelEl.append(checkLabelEl)
    wrapperEl.appendChild(labelEl)

    inputEl.type = "text"
    inputEl.placeholder = "ingredients name"
    inputEl.value = text
    inputEl.addEventListener('input', (e) => {
        updateIngredient(receipeId, ingredientID, { name: e.target.value })
    })
    wrapperEl.appendChild(inputEl)

    removeEl.textContent = 'remove_circle_outline'
    removeEl.classList.add('material-icons')
    removeEl.addEventListener('click', (e) => {
        deleteIngredient(receipeId, ingredientID)
        subtitleEl.textContent = updateReceipeStatusMsg(receipeId)
        renderIngredients()
    })
    wrapperEl.appendChild(removeEl)
    ingredientSectionEl.appendChild(wrapperEl)
}

const renderIngredients = () => {
    document.querySelector('#ingredients').innerHTML = ''
    receipe.ingredients.forEach((ingredient) => {
        generateIngredientDom(ingredient.id, ingredient.name, ingredient.available)
    })
}
export { initializeEditPage, generateIngredientDom, toggleTitleFormat }