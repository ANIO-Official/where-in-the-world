import * as DOMCache from "../dom/dom-cache"
import CountryCard from "../models/Card"
import * as APIService from "../services/apiService"

export let cardsData:CountryCard[] //holds CountryCard objects

/*
 Specifically for Creating Displaying the Data.
 1. Create a fragment to batch load the country cards in the document.
 2. Take the countryCard type object array passed and create new HTML card elements (li)
    for each. 
 3. Append each newly created element to the fragment
 4. Clear the inner HTML of the ul (cardsBatch).
 5. Attach the fragment containing the new cards to the ul.
*/
export function createFragment(array:CountryCard[]){
    const fragment = document.createDocumentFragment()

    /*
     Create a HTML Card (li element) based on the template cloned
     for each item in the cardsData array
    */
    array.map((country:CountryCard) =>{

        //Clone the card template and cache it's parts to edit per country rendered
        const cardLI = DOMCache.cardTemplate?.cloneNode(true)
        const cardImgTop = cardLI.querySelector('.card-image-top')
        const cardTitle= cardLI.querySelector('.card-title')
        const cardText = cardLI.querySelector('.card-text')

        //Display Setup
        cardLI.style.display = 'block'
        cardLI.classList.remove('card-template')//Remove template class.
        cardImgTop.src = country.flag
        cardImgTop.alt = country.altText
        cardTitle.textContent = country.name
        cardText.innerHTML = `
            <b>Population:</b> ${country.population}<br>
            <b>Region:</b> ${country.region}<br>
            <b>Capital:</b> ${country.capital}<br>`

        fragment.appendChild(cardLI)//Attach to fragment
    })

    DOMCache.cardsBatch?.innerHTML = '' //Clear the batch
    DOMCache.cardsBatch?.appendChild(fragment) //Attach the rendered cards
}

/*
 1. Get the country data from the API
 2. Create a CountryCard Object and cache them into the cardsData array
 3. Create & Display the HTML Card using the objects stored in cardsData
*/
export async function renderCards(){
    /*
        1. Set up the Card object data per country
        2. Push the new object into the array cardsData. // Saving Data in Array
        3. Display All cards using createFragement from dynamic-list module
    
    */
    await APIService.fetchCountries()
    cardsData = APIService.countries.map((country:APIService.isCountry):CountryCard => {
        return new CountryCard(country.flag.png, country.flag.alt, country.name.common, country.population, country.region, country.capital)
    })

    createFragment(cardsData)
}