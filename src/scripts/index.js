import { setFilters } from './filters'
import { createRecipe} from './recipes'
import {renderApp} from './index-view'
import '../styles/styles.scss'


renderApp()

window.addEventListener("load", function(event) {
  document.querySelector('body').classList.remove('loading')
});

// Filter
document.querySelector('#filter').addEventListener('input', (e) => {
   setFilters(e.target.value)
   renderApp()
})

document.querySelector('#add-recipe').addEventListener('click', (e) => {
   const hash = createRecipe()
   location.assign(`./edit.html#${hash}`)
})



