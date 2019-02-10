import {getRecipes} from './recipes'

const isJson = (str) => {
    try {
       JSON.parse(str)
    } catch (e) {
        return false
    } 
    return true
}

const orderRecipesByName = () => {
    let recipes = getRecipes()
    recipes = recipes.sort((a, b)=>{
       if ( a.name < b.name ) {
           return -1
       } 
       if ( a.name > b.name ) {
        return 1
       }
       return 0 
    })
}

export { isJson, orderRecipesByName } 