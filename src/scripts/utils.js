const isJson = (str) => {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}

// initialize Materialize Elements 
const initializeMaterializeDropdown = () => {
    document.addEventListener('DOMContentLoaded', function () {
        const elems = document.querySelectorAll('.dropdown-trigger');
        const instances = M.Dropdown.init(elems, { constrainWidth: false });
    })
}
const initializeMaterializeSelect = () => {
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});
    })
}

export { isJson, initializeMaterializeDropdown, initializeMaterializeSelect } 