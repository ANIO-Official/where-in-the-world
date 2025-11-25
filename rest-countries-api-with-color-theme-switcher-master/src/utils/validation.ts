import * as DOMCache from "../dom/dom-cache"

    const searchInput = DOMCache.countrySearchBar
    const searchError = DOMCache.searchError

 searchInput.addEventListener('input', (event)=>{
    switch (true){
        case searchInput.validity.patternMismatch:
            searchInput.setCustomValidity('Ensure the country name uses only letters a-z.')
            break;
        case searchInput.validity.patternMismatch:
            searchInput.setCustomValidity('Ensure the country name uses only letters a-z.')
            break;
        default: searchInput.setCustomValidity('')
    }
    searchError?.textContent = searchInput.validationMessage

 })