import { setFilters } from './filters'
import { createRecipe, loadRecipes, getRecipes } from './recipes'
import { renderApp } from './index-view'
import { initializeMaterializeSelect } from './utils'

import '../styles/styles.scss'


renderApp()


window.addEventListener("load", function (event) {
   document.querySelector('body').classList.remove('loading')
})

// Filter
document.querySelector('#filter').addEventListener('input', (e) => {
   setFilters({ searchText: e.target.value })
   renderApp()
})

document.querySelector('#add-recipe').addEventListener('click', (e) => {
   const hash = createRecipe()
   location.assign(`./edit.html#${hash}`)
})

document.querySelector('#filter-select').addEventListener('change', (e) => {
   if (e.target.value === '1') {
      setFilters({ order: { sortBy: 'abc', direction: 'desc' } })
   } else if (e.target.value === '2') {
      setFilters({ order: { sortBy: 'abc', direction: 'asc' } })
   } else if (e.target.value === '3'){
      setFilters({ order: { sortBy: 'date', direction: 'desc' } })
   } else if (e.target.value ==='4'){
      setFilters({ order: { sortBy: 'date', direction: 'asc' } })
   } else if (e.target.value === '5') {
      setFilters({ order: { sortBy: ' ', direction: ' ' } })
      loadRecipes()
   }
   renderApp()
})

// Framework Elements
initializeMaterializeSelect()



