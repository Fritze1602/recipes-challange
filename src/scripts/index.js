import { setFilters } from './filters'
import { createReceipe} from './receipes'
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

document.querySelector('#add-receipe').addEventListener('click', (e) => {
   const hash = createReceipe()
   location.assign(`./edit.html#${hash}`)
})



