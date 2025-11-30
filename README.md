# Where in the World? 🌎
## Overview
This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Additionally, this project aims to assess my ability to apply the skills and knowledge acquired throughout the MERN Stack course in a practical, real-world scenario. 

------------------------------------------------
## Table of contents

- [Overview](#overview)
  - [GitHub](#github)
  - [The challenge](#the-challenge)
  - [Link to Website](#view-live-website)
  - [Previews](#previews)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [Reflection Questions](#reflection-questions)
  - [Useful resources](#useful-resources)
- [Author](#author)

### GitHub Link
https://github.com/ANIO-Official/where-in-the-world 
### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### View Live Website

https://where-in-the-world-app-anio.netlify.app

### Previews
**DESKTOP | LIGHT MODE**

![Main Page Light Mode](./final-screenshots/where-in-the-world-light-mode-main-page-ANIO.png)
![Detailed Page Light Mode](./final-screenshots/where-in-the-world-light-mode-detailed-page-ANIO.png)

**DESKTOP | DARK MODE**

![Main Page Dark Mode](./final-screenshots/where-in-the-world-dark-mode-main-page-ANIO.png)
![Detailed Page Dark Mode](./final-screenshots/where-in-the-world-dark-mode-detailed-page-ANIO.png)

**MOBILE**

![Mobile View](./final-screenshots/where-in-the-world-dark-mode-mobile-page-ANIO.png)

**TABLET**

![Tablet View](./final-screenshots/where-in-the-world-light-mode-tablet-page-ANIO.png)


## My process
Brief about my process. Here are my steps:

 1. Git init.

  - git init in bash terminal within VSCode.

 2. Semantic HTML Format & Layout/Frame Setup

  - Look at the design images provided by Frontend Mentor and breakdown the different parts necessary to create the pages.
  - Create the basic structure of the HTML page.
  - Use Semantic HTML tags for ease of reading for Assistive Technologies.

 3. Make it Responsive

  - Link Bootstrap CSS Library to document.
  - Use Bootstrap grid utility classes: row, col, row-col & breakpoints to create a responsive grid layout.
  - Add necessary height and width adjustments as necessary for breakpoints in CSS media queries.
  - Test the responsiveness of the page within Google Chrome Dev tools.
  - Adjust measurements and utility class placment as necessary.

 4. Style the basic inital parts with placeholders.

  - Create a card template. Use a plan gray colored background to help with sizing the placeholder area of flag.
  - Use the Bootstrap Card component to create an easy card layout for a template to later clone in the JS code.
  - Adjust Bootstrap Card component styling in CSS to match the design style.
  - Link font required by Frontend mentor challenge, apply to body in CSS.

 5. CSS Accessibility Styling & A Custom CSS Properties 

  - Create and apply custom color and sizing properties at :root in CSS based on provided design details.
  - Add focus & hover states for interactive areas such as inputs, selects, and buttons.

 6. Filter & Search

  - Adjust Styling of Search Bar, change type to "search", and follow proper Accessibility html tags by wrapping inside html 'search' tag.
  - Adjust Styling of Filter Select

 7. TypeScript (Ultimately Removed and Refactored into one JS file due to scope)

  - Originally, I coded this app with TypeScript(TS) modules, however upon trying to compile to JS code and perform DOM Manipulation, I ran into many issues that would push the project out of scope due to my current understanding of TS in relation to DOM Manipulation. As TypeScript is *not* the focus of this project, I decided to reorganize and refactor my code to a single JavaScript(JS) file. It took about an hour or less of time, and it was 100% worth it for now. 
  - I will have to look more into TS's handling of DOM manipulation to handle proper typing. I did read TypeScript's documentation on the DOM, but I found myself misunderstanding how to manipulate it properly while typing variables and functions returns.
  - Since I am confident in DOM manipulation in Javascript, I decided to pivot to this method instead.

 8. JavaScript

  - Cache Global DOM Variables
  - Create array variables to hold object data fetched from REST Countries API.
  - Create CountryCard Class
  - Create custom Error sub Classes for error handling.
  - Fetch Request to API using async/await functions, returning the variable containing the object data for all countries from the API. fetchCountries for fetching the main data, fetchCountryCodes to fetch specifically the country cioc codes (and names for easy filter matching).
  - Create asynchronous renderCards() to await for fetched data, create an CountryCard object for each country, push each CountryCard object into the cardsData array, call createFragment() that accepts an array as a parameter and creates list items of card components to display in the cards batch (unordered list) based on the template previously made in step 4.
  - Add Filter & Search functionality by filtering the cardsData array to return CountryCard objects by region selected or search terms typed into the search bar, and calling createFragment() to display/re-render them.
  - Create Detailed Screen and utility functions to call to find and display the country's details.
  - Add event listeners to:

    1. Document to load all countries on DOMContentLoaded (renderCards())
    2. Country search bar to dynamically show matching countries containing the query on keydown (searchForCountry()).
    3. Region Filter Select to dynamically show matching countries of the same region on change of option (filterByRegion())
    4. The cards batch (unordered list) for event delegation. Control whenever any card (li)'s image or title is clicked, that the detailed view appears for them specifically.
    5. The country detailed view page for event delegation. When back is clicked, hide this screen and return (show) the main screen with all countries (toggleMainScreen()). When a border country is clicked, show their details instead (showDetails()).


 9. Test, BugFix, Adjustments

  - Test the HTML file in the chrome or chromium browser.
  - Fix bugs such as visual errors with CSS and dynamic elements.
  - Add 'col' utility class to dynamic card component list items.
  - Add hover states and aria-labels to cards and border countries to clarify they can be clicked.
  - Ensure errors appear in console and alerts to users by forcing and testing for an error message. 
  Add try/catch and async/await where needed.
  - Separate fetch request for ciocs due to 10 field limit with API url.

 10. Touch ups

  - Overall styling adjustments.
  - Adjustments to include tablet sized device responsive layout.
  - Check and adjust mobile layout to fix any visual bugs.

 11. Dark mode toggle

  - Create CSS .dark class styling for applicable areas.
  - Create functions toggleTheme() and setTheme() to properly update elements on press of toggle button and when items are dynamically created by the filter and search.

### Built with
- JavaScript
- Semantic HTML
- CSS
- BootStrap

## Reflection
 **Development Process**

 The process was overall very smooth up until the initial TypeScript attempt. I was able to quickly make the webpage responsive with Bootstrap grid and CSS media queries for area tweaks. Creating the JS Code was actually easier due to the way I originally organized my TypeScript modules (models, utility modules, dom-cache for variables). 

 You can read more about my process above at [My process](#my-process).
 
 **Challenges faced**
 
 When I moved onto coding the webpage, I wanted to challenge myself to create the project in TypeScript believing DOM manipulation would work similarly based on how I interpreted TypeScript's DOM documentation. However, I found that multiple errors appeared when I tried to compile the the TS files to JS code. One of which was "document is not defined.". I researched stackoverflow, TypeScript documentation, and previous Per Scholas modules. I did find answers but I did not fully understand them. And with the scope of the project, I did not feel it was the best use of my time to fiddle with TypeScript. I needed to make sure I was able to deliver a final product.

 The only other main problem was a small overlook where I kept forgetting that filter() returned an array when I was filtering for 1 object to return. 

 **Solutions implemented**

 In order to remedy my base TypeScript decision, I first uninitialized NPM and uninstalled TypeScript and it's types from the project by use of "rm -rf node_modules", "rm package-lock.json", deleting all d.ts and .ts files, and finally moving my needed file to a new folder directory. Additionally, I updated my gitHub by deleting any extra directories containing old files (ONLY AFTER migrating the TS modules' code to the JS file). 
 
 To fix the small filter() problem, I took a second look at what was actually returning using console.log of the variable I cached my filter result in. I realized it showed my Object within an array. And I remembered I had to access the the first indexed object to access the specific country's data I needed. Like so: 
```
 function getCountryData(query) {
  //Filter & return the country with a common name matching the query string.
  return countries.filter(
    (country) => country.name.common.toLowerCase() === query.toLowerCase()
  );
 } 
 const data = getCountryData(borderCountry); //returns an array of a single object
 const result = data[0]; //caches the single object in the array.
 ```

**Potential improvements**

 There are two main places for improvement I can find in this project. 
 
 The first is the organization of my JavaScript code. I did try to organize it well with headers to section off areas. This did help initially, but as I went on and to write more code I found myself unable to find them as easily. Once I understand how to use modules more efficiently in Javascript, I believe I can easily fix this issue. As there would be a decrease of code per module and and increase in quick readability.

 The second is my handling of the Dark Mode toggle. It does work efficiently: the CSS class .dark does make changing the color scheme quick. But I did find that the dynamically created cards when filtering and searching do not update due to them not existing when the variable to hold all list items is cached. Even with the use of ElementsByClassName, the dynamic items from the filter and search did not return. Ultimately, I had to enforce a second function setCardsTheme() to update the cards that generate from the search and filter. I would've liked to hand this in one function rather than two. I am still happy it worked in the end.
 

### Useful resources

--------------------------------------------------------

**GENERALLY HELPFUL DURING CODING PROCESS**

- [MDN | Adding Alt Text to Images in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt)
- [MDN | Returning All Property Values of an Object in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
- [MDN | Filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN | Returning the Keys of an Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [MDN | Tab Index (For Cards)](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex)
- [MDN | ARIA Hidden Vs Hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden)
- [MDN | Search & Accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/search)
- [MDN | Media Queries Usage Methods](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using)
- [MDN | Child Element Count of an HTML Element](https://developer.mozilla.org/en-US/docs/Web/API/Element/childElementCount)
- [MDN | Drop Shadows (Refresher)](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/filter-function/drop-shadow)
- [Bootstrap | Shadows (Comparison)](https://getbootstrap.com/docs/5.3/utilities/shadows/)
- [Your Blog App | A previous project with a similarly functioning search filter](https://github.com/ANIO-Official/your-blog-journaling-app)

--------------------------------------------------------

**REMOVING NPM INIT, TYPESCRIPT, AND DUPLICATE/OLD REPOS**

- [GitHub Deleting Files in Repository](https://docs.github.com/en/repositories/working-with-files/managing-files/deleting-files-in-a-repository)
- [Stack Overflow | NPM Uninit?](https://stackoverflow.com/questions/62061964/how-to-un-init-npm)

- [Stack Overflow | Search in a Form? Yay or Nay?](https://stackoverflow.com/questions/51688517/do-i-need-to-wrap-my-input-field-in-a-form-if-its-just-a-search-function)

--------------------------------------------------------

**CREATING THE DETAILED COUNTRY 'PAGE'**

- [Stack Overflow | Object Object Returns?!](https://stackoverflow.com/questions/47737093/json-parse-returning-object-object-instead-of-value)
- [Stack Overflow | Accessing the Properties of an object?](https://stackoverflow.com/questions/983267/how-to-access-the-first-property-of-a-javascript-object)
- [Free Code Camp | Object Object Meaning...](https://www.freecodecamp.org/news/object-object-in-javascript-meaning-in-js/)
- [Heart of Harmony | A previous project with 2 'Pages'](https://github.com/ANIO-Official/interactive-registration-form)

--------------------------------------------------------

**API DOCUMENTATION**
- [REST Countries API | Using Endpoints: Codes](https://restcountries.com/#endpoints-code)
- [REST Countries API | Gitlab | Available Fields](https://gitlab.com/restcountries/restcountries/-/blob/master/FIELDS.md)

## Author

- LinkedIn - [Amanda Ogletree](https://www.linkedin.com/in/amanda-ogletree-a61b60168)