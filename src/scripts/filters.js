
let filters = {
    searchText: '',
    order: {
        sortBy: '',
        direction: ''
    }
}

const setFilters = (filtersObj) => {
    if (typeof filtersObj.searchText === 'string') {
        filters.searchText = filtersObj.searchText
    }
    if (filtersObj.order) {
        if (filtersObj.order.sortBy.length > 0) {
            filters.order.sortBy = filtersObj.order.sortBy
        }
        if (filtersObj.order.direction.length > 0) {
            filters.order.direction = filtersObj.order.direction
        }
    }
}

const getFilters = () => filters

export { setFilters, getFilters }