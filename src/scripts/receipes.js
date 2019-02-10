import uuidv4 from 'uuid/v4'
import {isJson, orderReceipesByName} from './utils'
//import {getFilters} from './filters'


let receipes = []

const loadReceipes = () => {
    const receipesJson = localStorage.getItem('receipes')
    if(receipesJson){
        receipes = (isJson(receipesJson)) ? JSON.parse(receipesJson) : [] 
        orderReceipesByName()
    }else{
        receipes = []
    }
}

const getReceipes = () => receipes

const saveReceipes = () => {
    localStorage.setItem('receipes', JSON.stringify(receipes))
}

const createReceipe = () => {
    const receipeId = uuidv4()
    receipes.push({

        id: receipeId,
        name: '',
        msg: '',
        preps: '',
        ingredients: []
    })
    saveReceipes()
    return receipeId
}

const deleteReceipe = (id) => {
    const delIndex = receipes.findIndex((item) => item.id === id )
    if(delIndex > -1){
        receipes.splice(delIndex, 1)
    }
    saveReceipes()
}

const updateReceipeHead = (id, update) => {
    const receipe = receipes.find((item) => item.id === id )
    if (typeof update.name === 'string'){
        receipe.name = update.name
    }
    if (typeof update.preps === 'string'){
        receipe.preps = update.preps
    }
    if (typeof update.available === 'string'){
        receipe.name = update.name
    }
    
    saveReceipes()
}

const updateReceipeStatusMsg = (id) => {
    const receipe = receipes.find((item) => item.id === id )
    let availCount = 0
    const totalIngredients = receipe.ingredients.length
    receipe.ingredients.forEach((ingredient)=>{
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
    receipe.msg = msg
    saveReceipes()
    return msg
}

// Ausführung
loadReceipes()

export {getReceipes, saveReceipes, createReceipe, deleteReceipt, updateReceipeHead, deleteReceipe, updateReceipeStatusMsg}


