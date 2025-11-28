/*
=============GLOBAL VARIABLES=============
*/
const cardsBatch = document.getElementById("cards-batch");
const cardTemplate = document.querySelector(".card-template");
const countrySearchBar = document.getElementById("country-search-bar");
const regionSelect = document.getElementById("region-select");
const searchError = document.getElementById("search-error");
const themeToggler = document.getElementById("theme-toggler");

const mainContent = document.getElementById("main-content-container");
const countryDetails = document.getElementById("country-details-container");

let countries = []; //Holds object data array returned from main data fetch request.
let countryCodes = []; //Holds object data array returned from country & name fetch request.
let cardsData = []; //Holds CountryCard objects (Data).

//==============CLASSES=============

class CountryCard {
  flag;
  altText;
  name;
  population;
  region;
  capital;
  constructor(flag, altText, name, population, region, capital) {
    (this.flag = flag),
      (this.altText = altText),
      (this.name = name),
      (this.population = population),
      (this.region = region),
      (this.capital = capital);
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

//Detailed view Information
class DetailedCountryCard extends CountryCard {
  nativeName;
  subRegion;
  tld;
  currencies;
  languages;
  borders;
  constructor(
    flag,
    altText,
    name,
    population,
    region,
    capital,
    nativeName,
    subRegion,
    tld,
    currencies,
    languages,
    borders
  ) {
    super(flag, altText, name, population, region, capital);
    (this.nativeName = nativeName),
      (this.subRegion = subRegion),
      (this.tld = tld),
      (this.currencies = currencies),
      (this.languages = languages),
      (this.borders = borders);
  }
}

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
/* UTILITY FUNCTIONS ==========================================*/
//Filter 'countries array' for specific country information.
function getCountryData(query) {
  //Filter & return the country with a common name matching the query string.
  return countries.filter(
    (country) => country.name.common.toLowerCase() === query.toLowerCase()
  );
}

//Return the last property of the passed object
function getLastPropertyValue(object) {
  const allValues = Object.values(object);
  return allValues[allValues.length - 1];
}

//Return all properties of the passed object
function getAllValues(object) {
  const allValues = Object.values(object);
  return allValues;
}
//return countries matching the country codes (cioc) from the result borders property.
function getCountriesByCode(result) {
  let allCountries = []; //holds the matching countries results
  console.log(`Borders for ${result}}: ${result.borders}`);
  for (let code of result.borders) {
    //For each cioc code string in the borders property
    const countryCodeMatch = countryCodes.filter(
      (country) => country.cioc.toLowerCase() === code.toLowerCase()
    );
    if (countryCodeMatch.length !== 0) {//only push when a country returns.
      console.log(`${code} matched with ${countryCodeMatch}`);
      allCountries.push(countryCodeMatch[0].name.common); //Use index 0 because filter returns an array
    }
    else( console.log(`${code} does not have a match`)); //log when there is no country in the API matching.
    /*
             Above code checks for a matching cioc code. Use toLowerCase to ensure strings are returned for comparison.
             Cache the result that matches to countryCodeMatch.
             Add the country's common name to the allCountries array if the country exist in the database.
             return the resulting array.
            */
  }
  return allCountries;
}
//Create a DetailedCountryCard object using the data from the result (country object from 'countries' array)
async function createDetailedCountryCard(result) {
  /*
        Create a new DetailedCountryCard object with the data matching the country.
        1. Fetch the country codes & names for all countries. First to avoid creating the detailed before all information
            is returned. The initial fetch request does not include the cioc due to a 10 field request limit on the API.
            Store the resulting country objects in countryCodes.
        2. The native name needed is deeply nested in the names property of country objects.The native name needed will
            always be the last object in the nativeNames object inside the names property. 
            To access it, run the getLastPropertyValue function then cached the result into variable 'lastNativeName'.
        4. Currencies is also a deeply nested property like nativeNAmes. Use getLastPropertyValue to retrieve the currency
            name. Currencies is an object that has one property that holds an object with a name and symbol value.
        5. The borders property, of the country object in result, holds an array of strings. These strings are cioc codes
            representing different countries. In order to get their common names to display, I need to use the fetched codes,
            from step 1, to compare the borders property codes to the countries codes in the countryCodes array.
            [Like so:  ["AUT","FRA","SMR","SVN","CHE","VAT"] |<--borders compare to countryCodes(country).cioc-->| "AUT" ]
        6. Create a DetailedCountryCard object to hold all the properties of the selected country using the data from the 
            country's object data cached in 'result' from the countries array and the cached variables from steps 2-5.  
        */
  await fetchCountryCodes(); //fetch all country codes

  //Call utility functions and Cached nested data variables needed for DetailedCountryCard Setup
  const lastNativeName = getLastPropertyValue(result.name.nativeName);
  const currency = getLastPropertyValue(result.currencies);
  const languages = getAllValues(result.languages);
  const borders = getCountriesByCode(result);
  console.log("all borders: ", borders);

  return new DetailedCountryCard(
    result.flags.png,
    result.flags.alt,
    result.name.common,
    result.population,
    result.region,
    result.capital,
    lastNativeName.common,
    result.subregion,
    result.tld[0],
    currency.name,
    languages.join(", "),
    borders
  );
}

//================EVENT HANDLING======================

/*Load default results  ------------------------------*/
document.addEventListener("DOMContentLoaded", renderCards);
/* Filter Items by Country  ------------------------------*/
countrySearchBar.addEventListener("keydown", searchForCountry); //load list on filter by Country
/* Filter Items by Region  ------------------------------*/
regionSelect.addEventListener("change", filterByRegion); //load list on filter by Region

/* Toggle Country Details ------------------------------
 Event Delegation: Shows the full details for any country card clicked on the main page.
 1. Get the Title of the card clicked by accessing the innerText of the card title element.<h2>
 2. Filter & Return the country from the 'countries' global array variable that  has a matching common.name.
 3. Create a DetailedCountryCard object using that country's data from the 'countries' array.
 4. Cache the DetailedCountryCard object into a variable named 'selectedCountry'
 4.5. Some information is deeply nested. For readability sake, access those variables first, then cache the
      results into new varaibles to reference to create the DetailedCountryCard. 
 5. Show the Details 'Screen' by toggling the main screen HTML elements to hidden = true, and toggling the Details Screen
    HTML elements to hidden = false.
 */
cardsBatch.addEventListener("click", async (event) => {
  /*
     1. Check if the clicked target is a image or title of a card on the main content screen.
     2. Based on the image or title, Cache the clicked card (li) to the variable 'card'.
     3. Search the card for the 'card-title' element and cache the inner text of that element to the variable 'countryNaem'. 
     4. Filter the 'countries' array using the getCountryData function, and cache the result to the variable 'data'.
     5. The data variable hold an array with the singular object. Cache the single object (indexed a 0) to the variable 'result'.
    */
  if (
    event.target.classList.contains("card-img-top") ||
    event.target.classList.contains("card-title")
  ) {
    const card = event.target.closest("li");
    const countryName = card.querySelector(".card-title").innerText;
    const data = getCountryData(countryName); //returns an array of a single object
    const result = data[0]; //cache object

    //Setup the Country Details Screen using the data from the new obejct.
    try {
      //Create new DetailedCountryCard object to reference using the data
      const selectedCountry = await createDetailedCountryCard(result); //returns a promise
      showDetails(selectedCountry); //setup
    } catch (error) {
      if (countryDetails.hidden === true) {
        //check if showDetails made the screen visible.
        throw new DataError(
          "Failed to create DetailedCountryCard object to display country details page."
        );
      }
      if (error instanceof DataError) {
        //show error when the detailed screen dows not appear.
        alert(
          "Error: Unable to load Country details page. Try again later or refresh page. "
        );
        console.error("Data Error: ", error.message);
      }
    }
    toggleMainScreen(); //hide main screen with all cards. Show specific country on details screen.
  }
});
//Event Delegation. Click border country to change detail view. Press Back to Return to main
countryDetails.addEventListener("click", (event) => {
  //Filter 'countries array' for specific country information.

  //Hide Details Screen when back button is clicked
  const backButton = countryDetails.querySelector("#back-button");
  if (event.target === backButton) {
    toggleMainScreen();
  }
  //Show border country when clicked
  if (event.target.classList.contains("detail-border-country")) {
    const borderCountry = event.target.innerText; //border country <p>
    const data = getCountryData(borderCountry); //returns an array of a single object
    const result = data[0]; //cache the object for manipulation
    const selectedCountry = createDetailedCountryCard(result);
    showDetails(selectedCountry);
  }
});

/* Theme Toggler */

//================API FETCH REQUEST======================

/*
 Fetched separately due to a 10 fields search limitation.
 Holds only names and codes for referencing in Details Page.
*/
async function fetchCountryCodes() {
  try {
    //Fetch name and codes
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cioc"
    );
    if (!response.ok) {
      throw new FetchError(
        "Failed to fetch country name and cioc code from REST Countries API."
      );
    }
    countryCodes = await response.json();
    if (countryCodes === undefined || null) {
      throw new DataError(
        "Country cioc code & name returned Undefined. Failed to parse response data from API. Check fetch request, API status, or syntax."
      );
    }
    console.log("We got a response for country codes!");
  } catch {
    if (error instanceof FetchError) {
      //for public
      alert(
        "Error: Could not reach API for country cioc codes. Please try again later."
      );
      //for devs
      return console.error("Fetch Error:", error.message);
    }
    if (error instanceof DataError) {
      //for public
      alert(
        "Error: Unable to load country detailed view at this time. We apologize! Please try again later or refresh the page."
      );
      //for devs
      return console.error("Data Error:", error.message);
    }
  } finally {
    console.log("Fetched all country codes.");
  }
  return countryCodes;
}

//Fetch Main Information
async function fetchCountries() {
  try {
    //Fetch specific fields of all countries
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders"
    );
    if (!response.ok) {
      throw new FetchError(
        "Failed to fetch country data from REST Countries API."
      );
    }
    countries = await response.json();
    if (countries === undefined || null) {
      throw new DataError(
        "Data returned Undefined. Failed to parse response data from API. Check fetch request, API status, or syntax."
      );
    }
    console.log("We got a response for country data!");
  } catch (error) {
    if (error instanceof FetchError) {
      //for public
      alert(
        "Error: Could not reach API for country data. Please try again later."
      );
      //for devs
      return console.error("Fetch Error:", error.message);
    }
    if (error instanceof DataError) {
      //for public
      alert(
        "Error: Unable to load country data at this time. We apologize! Please try again later or refresh the page."
      );
      //for devs
      return console.error("Data Error:", error.message);
    }
  } finally {
    console.log(
      "Fetch request complete: Fetched country data from REST Countries API."
    );
  }
  return countries;
}
//================DYNAMIC CONTENT CREATION======================
/*
 Specifically for Creating Displaying the Country Data on the Main Content Screen.
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
  for (let object of array) {
    //Clone the card template and cache it's parts to edit per country rendered
    const cardLI = cardTemplate.cloneNode(true);
    const cardImgTop = cardLI.querySelector(".card-img-top");
    const cardTitle = cardLI.querySelector(".card-title");
    const cardText = cardLI.querySelector(".card-text");

    //Display Setup
    cardLI.style.display = "block";
    cardLI.classList.remove("card-template"); //Remove template class.
    cardImgTop.src = object.flag;
    cardImgTop.alt = object.altText;
    cardTitle.textContent = object.name;
    cardText.innerHTML = `
            <b>Population:</b> ${object.population}<br>
            <b>Region:</b> ${object.region}<br>
            <b>Capital:</b> ${object.capital}<br>`;

    fragment.appendChild(cardLI); //Attach to fragment
  }
  cardsBatch.innerHTML = ""; //Clear the batch
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
  for (let country of countries) {
    const newCard = new CountryCard(
      country.flags.png,
      country.flags.alt,
      country.name.common,
      country.population,
      country.region,
      country.capital[0]
    );
    cardsData.push(newCard);
  }
  console.log("Checking Data...Example...Country 2 Information:", cardsData[1]);
  createFragment(cardsData);
}

/* 
 Specifially for displaying information on the Country Details Screen 
 Detail Page Setup. Accepts a country object with data as a parameter 
 */
function showDetails(country) {
  //Cache the parts of the Details screen
  const countryFlag = countryDetails.querySelector("#flag-img");
  const countryName = countryDetails.querySelector("#detail-country-name");
  const informationlLeft = countryDetails.querySelector("#information-left");
  const informationRight = countryDetails.querySelector("#information-right");
  const borderCountries = countryDetails.querySelector(
    "#detail-border-countries"
  );

  console.log(`setting up the following country ${country}`);
  //Set the values of all parts
  countryFlag.src = country.flag;
  countryFlag.alt = country.altText;
  countryName.innerText = country.name;
  informationlLeft.innerHTML = `
        <b>Native Name:</b> ${country.nativeName}<br>
        <br>
        <b>Population:</b> ${country.population}<br>
        <br>
        <b>Region:</b> ${country.region}<br>
        <br>
        <b>Sub Region:</b> ${country.subRegion}<br>
        <br>
        <b>Capital:</b> ${country.capital}<br>
    `;
  informationRight.innerHTML = `
        <b>Top Level Domain:</b> ${country.tld}<br>
        <br>
        <b>Currencies:</b> ${country.currencies}<br>
        <br>
        <b>Languages:</b> ${country.languages}<br>
    `;
  borderCountries.innerHTML = " " //clear before updating
  
  if(country.borders.length === 0){ //show when none
    borderCountries.innerHTML = '<p>None (。_。)</p>'
  }
  for (let borderCountry of country.borders) { //show all countries that border
    borderCountries.innerHTML += `<p class="detail-border-country col-4">${borderCountry}</p>`;
  }
}

/* Show/Hide Country Details Screen. Used above and for backbutton on details screen*/
function toggleMainScreen() {
  if (countryDetails.hidden) {
    countrySearchBar.hidden = true;
    regionSelect.hidden = true;
    mainContent.hidden = true;
    countryDetails.hidden = false;
    console.log("Showing Main screen"); //check
    return;
  }
  countrySearchBar.hidden = false;
  regionSelect.hidden = false;
  mainContent.hidden = false;
  countryDetails.hidden = true;
  console.log("Showing Details Screen"); //check
  return;
}

//================FILTER CONTENT FUNCTIONALITY======================
//Filter Data Array by Country then load filtered results
function searchForCountry() {
  const query = countrySearchBar.value; //Set query to user input
  console.log(`Searching for country: ${query}`); //check
  //SEARCH FOR COUNTRY BY QUERY(Name) =================
  function querySearch(array, query) {
    //Filter & return countries in array matching the query
    return array.filter((country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  //Cache results, display the results to the document.
  const filteredCountryData = querySearch(cardsData, query); //send array of results to variable.
  createFragment(filteredCountryData); //render all filtered items array
  console.log(`Showing ${filteredCountryData.length} results.`); //check
}

//Remove Filter on Empty and Unfocus. Show all results
countrySearchBar.addEventListener("blur", () => {
  if (countrySearchBar.value === "") {
    createFragment(cardsData); //render document fragment of stored data
    console.log("Returning unfiltered feed.");
  }
});

//Filter Data Array by Region then load filtered results
function filterByRegion() {
  //SEARCH FOR COUNTRY BY REGION =================
  function regionSearch(array, region) {
    //Filter & return countries in array matching the query
    return array.filter((country) =>
      country.region.toLowerCase().includes(region.toLowerCase())
    );
  }
  switch (true) {
    case regionSelect.value === "Africa":
      const countriesOfAfrica = regionSearch(cardsData, "Africa"); //find and cache results into variable
      createFragment(countriesOfAfrica); //render results to document
      console.log(`Showing ${countriesOfAfrica.length} results.`); //check
      break;
    case regionSelect.value === "America":
      const countriesOfAmerica = regionSearch(cardsData, "America"); //find and cache results into variable
      createFragment(countriesOfAmerica); //render results to document
      console.log(`Showing ${countriesOfAmerica.length} results.`); //check
      break;
    case regionSelect.value === "Asia":
      const countriesOfAsia = regionSearch(cardsData, "Asia"); //find and cache results into variable
      createFragment(countriesOfAsia); //render results to document
      console.log(`Showing ${countriesOfAsia.length} results.`); //check
      break;
    case regionSelect.value === "Europe":
      const countriesOfEurope = regionSearch(cardsData, "Europe"); //find and cache results into variable
      createFragment(countriesOfEurope); //render results to document
      console.log(`Showing ${countriesOfEurope.length} results.`); //check
      break;
    case regionSelect.value === "Oceania":
      const countriesOfOceania = regionSearch(cardsData, "Oceania"); //find and cache results into variable
      createFragment(countriesOfOceania); //render results to document
      console.log(`Showing ${countriesOfOceania.length} results.`); //check
      break;
    default:
      createFragment(cardsData); //show all
      console.log(`Showing all results.`);
  }
}
//================INPUT FIELD VALIDATION======================
countrySearchBar.addEventListener("input", (event) => {
  switch (true) {
    case countrySearchBar.validity.patternMismatch:
      countrySearchBar.setCustomValidity(
        "Ensure the country name uses only letters a-z."
      );
      break;
    case countrySearchBar.validity.tooShort:
      countrySearchBar.setCustomValidity(
        "3 characters minimum. It makes your search must easier. (o゜▽゜)o☆"
      );
      break;
    case countrySearchBar.validity.valid && cardsBatch.childElementCount === 0:
      countrySearchBar.setCustomValidity(
        "Valid but no results! ○|￣|_ (。_。)(＃°Д°)"
      );
      break;
    default:
      countrySearchBar.setCustomValidity("");
  }
  searchError.textContent = countrySearchBar.validationMessage;
});
