import {getReceipes} from './receipes'

const isJson = (str) => {
    try {
       JSON.parse(str)
    } catch (e) {
        return false
    } 
    return true
}

const orderReceipesByName = () => {
    let receipes = getReceipes()
    receipes = receipes.sort((a, b)=>{
       if ( a.name < b.name ) {
           return -1
       } 
       if ( a.name > b.name ) {
        return 1
       }
       return 0 
    })
}

export { isJson, orderReceipesByName } 