/*
=============GLOBAL VARIABLES=============
*/
const cardsBatch = document.getElementById('cards-batch');
const cardTemplate = document.querySelector('.card-template');
const countrySearchBar = document.getElementById('country-search-bar');
const regionSelect = document.getElementById('region-select');
const searchError = document.getElementById('search-error');
const themeToggler = document.getElementById('theme-toggler');


let countries; //Holds object data array returned from fetch request
let cardsData; //Holds CountryCard objects (Data)

//==============CLASSES=============

class CountryCard {
    flag;
    altText;
    name;
    population;
    region;
    capital;
    constructor(flag, altText, name, population, region, capital) {
        this.flag = flag,
            this.altText = altText,
            this.name = name,
            this.population = population,
            this.region = region,
            this.capital = capital;
    }
}
/*
    API & Class information

    REST Countries API in regards to the requirements of the
        FrontendMentor Challenge

    Provides for each country:
    - A PNG & SVG along with alt text.
        || field: 'flags' [flag is not the same]
        || type: string
    - A Common, official, and native name
        || field: 'name'
        || type: string
    - A Population count
        || field: 'population'
        || type: number
    - A Region
        || field: 'region'
        || type: string
    - A Capital
        || field: 'capital'
        || type: string
*/ 
//================ERROR HANDLING======================

 class DataError extends Error {
    constructor(message) {
        super(message);
        this.name = "Data Error";
    }
}
class FetchError extends Error {
    constructor(message) {
        super(message);
        this.name = "Fetch Error";
    }
}

//================EVENT HANDLING======================

//Load default results
document.addEventListener('DOMContentLoaded', renderCards);
/* Filter Items by Country */
DOMCache.countrySearchBar?.addEventListener('keydown', searchForCountry); //load list on filter by Country
/* Filter Items by Region */
DOMCache.regionSelect?.addEventListener('change', filterByRegion); //load list on filter by Region
/* Theme Toggler */ 

//================API FETCH REQUEST======================
async function fetchCountries() {
    try {
        //Fetch specific fields of all countries
        const response = await fetch('https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital');
        if (!response.ok) {
            throw new FetchError('Failed to fetch country data from REST Countries API.');
        }
        countries = await response.json();
        if (countries === undefined || null) {
            throw new DataError('Data returned Undefined. Failed to parse response data from API. Check fetch request, API status, or syntax.');
        }
    }
    catch (error) {
        if (error instanceof FetchError) {
            //for public
            alert('Error: Could not reach API for country data. Please try again later.');
            //for devs
            return console.error('Fetch Error:', error.message);
        }
        if (error instanceof DataError) {
            //for public
            alert('Error: Unable to load country data at this time. We apologize! Please try again later or refresh the page.');
            //for devs
            return console.error('Data Error:', error.message);
        }
    }
    finally {
        console.log('Fetch request complete: Fetched country data from REST Countries API.');
    }
    return countries;
}
//================DYNAMIC CONTENT CREATION======================
/*
 Specifically for Creating Displaying the Country Data.
 1. Create a fragment to batch load the country cards in the document.
 2. Take the countryCard type object array passed and create new HTML card elements (li)
    for each.
 3. Append each newly created element to the fragment
 4. Clear the inner HTML of the ul (cardsBatch).
 5. Attach the fragment containing the new cards to the ul.
*/
function createFragment(array) {
    const fragment = document.createDocumentFragment(); //Holds the Card (li) code that will display
    /*
     Create a HTML Card (li element) based on the template cloned
     for each item in the cardsData array
    */
    array.map((country) => {
        //Clone the card template and cache it's parts to edit per country rendered
        const cardLI = cardTemplate.cloneNode(true);
        const cardImgTop = cardLI.querySelector('.card-image-top');
        const cardTitle = cardLI.querySelector('.card-title');
        const cardText = cardLI.querySelector('.card-text');
        //Display Setup
        cardLI.style.display = 'block';
        cardLI.classList.remove('card-template'); //Remove template class.
        cardImgTop.src = country.flag;
        cardImgTop.alt = country.altText;
        cardTitle.textContent = country.name;
        cardText.innerHTML = `
            <b>Population:</b> ${country.population}<br>
            <b>Region:</b> ${country.region}<br>
            <b>Capital:</b> ${country.capital}<br>`;
        fragment.appendChild(cardLI); //Attach to fragment
    });
    cardsBatch.innerHTML = ''; //Clear the batch
    cardsBatch.appendChild(fragment); //Attach the rendered cards
}

/*
 1. Get the country data from the API
 2. Create a CountryCard Object and cache them into the cardsData array
 3. Create & Display the HTML Card using the objects stored in cardsData
*/
async function renderCards() {
    /*
        1. Set up the Card object data per country
        2. Push the new object into the array cardsData. // Saving Data in Array
        3. Display All cards using createFragement from dynamic-list module
    
    */
    await fetchCountries();
    cardsData = countries.map((country) => {
        new CountryCard(country.flag.png, country.flag.alt, country.name.common, country.population, country.region, country.capital);
    });
    createFragment(cardsData);
}
//================FILTER CONTENT FUNCTIONALITY======================
//Filter Data Array by Country then load filtered results
function searchForCountry() {
    const query = countrySearchBar.value; //Set query to user input
    console.log(`Searching for country: ${query}`); //check
    //SEARCH FOR COUNTRY BY QUERY(Name) =================
    function querySearch(array, query) {
        //Filter & return countries in array matching the query
        return array.filter((country) => country.name.toLowerCase().includes(query.toLowerCase()));
    }
    //Cache results, display the results to the document.
    const filteredCountryData = querySearch(cardsData, query); //send array of results to variable.
    createFragment(filteredCountryData); //render all filtered items array
    console.log(`Showing ${filteredCountryData.length} results.`); //check
}

//Filter Data Array by Region then load filtered results
function filterByRegion() {
    //SEARCH FOR COUNTRY BY REGION =================
    function regionSearch(array, region) {
        //Filter & return countries in array matching the query
        return array.filter((country) => country.region.toLowerCase().includes(region.toLowerCase()));
    }
    switch (true) {
        case regionSelect.value === "Africa":
            const countriesOfAfrica = regionSearch(cardsData, "Africa"); //find and cache results into variable
            createFragment(countriesOfAfrica); //render results to document
            console.log(`Showing ${countriesOfAfrica.length} results.`); //check
            break;
        case regionSelect.value === "America":
            const countriesOfAmerica = regionSearch(cardsData, "Africa"); //find and cache results into variable
            createFragment(countriesOfAmerica); //render results to document
            console.log(`Showing ${countriesOfAmerica.length} results.`); //check
            break;
        case regionSelect.value === "Asia":
            const countriesOfAsia = regionSearch(cardsData, "Africa"); //find and cache results into variable
            createFragment(countriesOfAsia); //render results to document
            console.log(`Showing ${countriesOfAsia.length} results.`); //check
            break;
        case regionSelect.value === "Europe":
            const countriesOfEurope = regionSearch(cardsData, "Africa"); //find and cache results into variable
            createFragment(countriesOfEurope); //render results to document
            console.log(`Showing ${countriesOfEurope.length} results.`); //check
            break;
        case regionSelect.value === "Oceania":
            const countriesOfOceania = regionSearch(cardsData, "Africa"); //find and cache results into variable
            createFragment(countriesOfOceania); //render results to document
            console.log(`Showing ${countriesOfOceania.length} results.`); //check
            break;
        default:
    }
}
//================INPUT FIELD VALIDATION======================
countrySearchBar.addEventListener('input', (event) => {
    switch (true) {
        case countrySearchBar.validity.patternMismatch:
            searchInput.setCustomValidity('Ensure the country name uses only letters a-z.');
            break;
        case countrySearchBar.validity.patternMismatch:
            searchInput.setCustomValidity('Ensure the country name uses only letters a-z.');
            break;
        default: countrySearchBar.setCustomValidity('');
    }
    searchError?.textContent = countrySearchBar.validationMessage;
});