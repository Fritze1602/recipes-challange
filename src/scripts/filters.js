
let filters = {
    searchText: ''
}

const setFilters = (searchText) => {
    filters = searchText
}

const getFilters = () => filters

export {setFilters, getFilters}