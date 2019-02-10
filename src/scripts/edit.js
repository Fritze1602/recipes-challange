import {initializeEditPage, generateIngredientDom, toggleTitleFormat} from './edit-view'
import {updateReceipeHead, getReceipes, deleteReceipe, updateReceipeStatusMsg} from './receipes'
import {createIngredient, updateIngredient} from './ingredients'
import '../styles/styles.scss'

const receipeId = window.location.hash.substring(1)
const titleEl =  document.querySelector('#title')
const subtitleEl = document.querySelector('#subtitle')
const receipes = getReceipes()

if(receipes.findIndex((receipe) => receipe.id === receipeId ) >-1 ){
    initializeEditPage()
} else {
    location.assign(`./index.html`)
}

document.querySelector('#title-input').addEventListener('input', (e) => {
    updateReceipeHead(receipeId, {name: e.target.value})
    titleEl.textContent = e.target.value.length > 0 ? e.target.value : 'edit title'
    toggleTitleFormat()
})

document.querySelector('#receipe-head textarea').addEventListener('input', (e) => {
    updateReceipeHead(receipeId, {
        preps: e.target.value
    })
})

document.querySelector('#add-form').addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log('submit fired')
    const text = e.target.elements.addNewIngredient.value
    const ingredientId = createIngredient(receipeId)
    updateIngredient(receipeId, ingredientId, {name: text})
    generateIngredientDom(ingredientId, text)
    e.target.elements.addNewIngredient.value = ''
    subtitleEl.textContent = updateReceipeStatusMsg(receipeId)
})

document.querySelector('#remove').addEventListener('click', (e)=>{
    deleteReceipe(receipeId)
    location.assign('./index.html')
})