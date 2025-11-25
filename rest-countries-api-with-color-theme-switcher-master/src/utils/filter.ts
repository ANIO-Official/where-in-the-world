import * as DOMCache from "../dom/dom-cache"
import type CountryCard from "../models/Card"
import { cardsData, createFragment } from "./dynamic-list"

const searchInput = DOMCache.countrySearchBar
const regionSelect = DOMCache.regionSelect

//Fiter Data Array by Country then load filtered results
export function searchForCountry(){
    const query = searchInput.value //Set query to user input
    console.log(`Searching for country: ${query}`)//check

    //SEARCH FOR COUNTRY BY QUERY(Name) =================
    function querySearch(array: CountryCard[], query: string) {
        //Filter & return countries in array matching the query
        return array.filter((country) => country.name.toLowerCase().includes(query.toLowerCase()))
    }
    //Cache results, display the results to the document.
    const filteredCountryData = querySearch(cardsData, query) //send array of results to variable.
    createFragment(filteredCountryData) //render all filtered items array
    console.log(`Showing ${filteredCountryData.length} results.`)//check
}

//Filter Data Array by Region then load filtered results
export function filterByRegion(){
    //SEARCH FOR COUNTRY BY REGION =================
    function regionSearch(array: CountryCard[], region: string) {
        //Filter & return countries in array matching the query
        return array.filter((country) => country.region.toLowerCase().includes(region.toLowerCase()))
    }
    switch(true){
        case regionSelect.value === "Africa":
            const countriesOfAfrica = regionSearch(cardsData, "Africa") //find and cache results into variable
            createFragment(countriesOfAfrica)//render results to document
            console.log(`Showing ${countriesOfAfrica.length} results.`)//check
            break;
        case regionSelect.value === "America":
            const countriesOfAmerica = regionSearch(cardsData, "Africa") //find and cache results into variable
            createFragment(countriesOfAmerica)//render results to document
            console.log(`Showing ${countriesOfAmerica.length} results.`)//check
            break;
        case regionSelect.value === "Asia":
            const countriesOfAsia= regionSearch(cardsData, "Africa") //find and cache results into variable
            createFragment(countriesOfAsia)//render results to document
            console.log(`Showing ${countriesOfAsia.length} results.`)//check
            break;

        case regionSelect.value === "Europe":
            const countriesOfEurope = regionSearch(cardsData, "Africa") //find and cache results into variable
            createFragment(countriesOfEurope)//render results to document
            console.log(`Showing ${countriesOfEurope.length} results.`)//check
            break;

        case regionSelect.value === "Oceania":
            const countriesOfOceania = regionSearch(cardsData, "Africa") //find and cache results into variable
            createFragment(countriesOfOceania)//render results to document
            console.log(`Showing ${countriesOfOceania.length} results.`)//check
            break;
        default:
    }

}
