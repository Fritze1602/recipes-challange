// index.html
import {getReceipes, deleteIngredient, updateIngredient} from './receipes'
import {getFilters} from './filters'


const receipesEl = document.querySelector('#receipes')

const renderApp = () => {
    receipesEl.innerHTML = ''
    const receipes = getReceipes()
    const filters = getFilters()
    const displayedReceipes = (filters.length>0) ? receipes.filter((receipe)=> receipe.name.toLowerCase().includes(filters.toLowerCase())):receipes
    if(receipes.length > 0){
    displayedReceipes.forEach((receipe) => {     
        receipesEl.appendChild(generateReceipeDom(receipe.name, receipe.msg, receipe.id)) 
    });
    }else {
        renderEmptyMsg()
    } 
}

const renderEmptyMsg = () => {
    const msgEl = document.createElement('p')
    msgEl.classList.add('collection-item')
    msgEl.textContent ="No receipes. Add your first ..."
    receipesEl.append(msgEl)
} 

const generateReceipeDom = (headingTxt, msgTxt, id) => {
    const receipeEl = document.createElement('a')
    receipeEl.href = `./edit.html#${id}`
    receipeEl.classList.add('black-text','collection-item')
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


    receipeEl.appendChild(headingEl)
    //msg settings
    const msgEl = document.createElement('p')
    msgEl.textContent = msgTxt.length > 0 ? msgTxt : 'Add ingredients'
    receipeEl.appendChild(msgEl)
    return receipeEl
}

export {renderApp}