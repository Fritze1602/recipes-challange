// index.html
import {getRecipes, deleteIngredient, updateIngredient} from './recipes'
import {getFilters} from './filters'


const recipesEl = document.querySelector('#recipes')

const renderApp = () => {
    recipesEl.innerHTML = ''
    const recipes = getRecipes()
    const filters = getFilters()
    const displayedRecipes = (filters.length>0) ? recipes.filter((recipe)=> recipe.name.toLowerCase().includes(filters.toLowerCase())):recipes
    if(recipes.length > 0){
    displayedRecipes.forEach((recipe) => {     
        recipesEl.appendChild(generateRecipeDom(recipe.name, recipe.msg, recipe.id)) 
    });
    }else {
        renderEmptyMsg()
    } 
}

const renderEmptyMsg = () => {
    const msgEl = document.createElement('p')
    msgEl.classList.add('collection-item')
    msgEl.textContent ="No recipes. Add your first ..."
    recipesEl.append(msgEl)
} 

const generateRecipeDom = (headingTxt, msgTxt, id) => {
    const recipeEl = document.createElement('a')
    recipeEl.href = `./edit.html#${id}`
    recipeEl.classList.add('black-text','collection-item')
    //Heading settings
    const headingEl = document.createElement('h5')
    //headingEl.textContent = headingTxt.length>0 ? headingTxt : 'Edit Title'
    if (headingTxt.length > 0) {
        headingEl.textContent = headingTxt
        headingEl.classList.remove('red-text', 'text-darken-1')
    } else {
        headingEl.textContent = 'Edit Title'
        headingEl.classList.add('red-text', 'text-darken-1')
    }


    recipeEl.appendChild(headingEl)
    //msg settings
    const msgEl = document.createElement('p')
    msgEl.textContent = msgTxt.length > 0 ? msgTxt : 'Add ingredients'
    recipeEl.appendChild(msgEl)
    return recipeEl
}

export {renderApp}