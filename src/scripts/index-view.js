// index.html
import { getRecipes, sortRecipes } from './recipes'
import { getFilters } from './filters'
//import { sortRecipes } from './utils'
import moment from 'moment'

const recipesEl = document.querySelector('#recipes')
const renderApp = () => {
    console.log(getRecipes())

    recipesEl.innerHTML = ''
    const recipes = getRecipes()
    const filters = getFilters()
    const displayedRecipes = (filters.searchText.length > 0) ? recipes.filter((recipe) => recipe.name.toLowerCase().includes(filters.searchText.toLowerCase())) : recipes
    sortRecipes(displayedRecipes)
    if (displayedRecipes.length > 0) {
        displayedRecipes.forEach((recipe) => {
            //recipesEl.appendChild(generateRecipeDom(recipe.name, recipe.msg, recipe.id, recipe.lastChange, recipe.thumbs))
            recipesEl.appendChild(generateRecipeDom(recipe))
        })
    } else {
        renderEmptyMsg()
    }
}

const renderEmptyMsg = () => {
    const msgEl = document.createElement('p')
    msgEl.classList.add('collection-item')
    msgEl.textContent = "No recipes to show. Add one or change your filters"
    recipesEl.append(msgEl)
}

//const generateRecipeDom = (headingTxt, msgTxt, id, lastChange, thumbs) => {
const generateRecipeDom = ({name, msg, id, lastChange, thumbs}) => {
    const recipeEl = document.createElement('a')
    recipeEl.href = `./edit.html#${id}`
    recipeEl.classList.add('black-text', 'collection-item')
    //date El
    const dateEl = document.createElement('p')
    dateEl.classList.add('right')
    const symbolEl = document.createElement('i')
    symbolEl.classList.add('material-icons')
    symbolEl.textContent = 'access_time'
    dateEl.appendChild(symbolEl)
    dateEl.innerHTML += `  ${moment(lastChange).fromNow()}`
    recipeEl.appendChild(dateEl)
    //Heading settings
    const headingEl = document.createElement('h5')
    if (name.length > 0) {
        headingEl.textContent = name
        headingEl.classList.remove('red-text', 'text-darken-1')
    } else {
        headingEl.textContent = 'Edit Title'
        headingEl.classList.add('red-text', 'text-darken-1')
    }
    //Thumb El
    const thumbEl = document.createElement('i')
    if (thumbs ==='' || thumbs === undefined) {
        thumbEl.className = 'material-icons grey-text text-lighten-1'
        thumbEl.textContent = 'thumbs_up_down'
    } else if (thumbs === 'thumb_up') {
        thumbEl.className = 'material-icons green-text text-lighten-2'
        thumbEl.textContent = 'thumb_up'
    } else if (thumbs === 'thumb_down') {
        thumbEl.className = 'material-icons  red-text text-lighten-2'
        thumbEl.textContent = 'thumb_down'
    }
    headingEl.appendChild(thumbEl)
    recipeEl.appendChild(headingEl)
    //msg settings
    const msgEl = document.createElement('p')
    msgEl.textContent = msg.length > 0 ? msg : 'Add ingredients'
    recipeEl.appendChild(msgEl)
    return recipeEl
}

export { renderApp }