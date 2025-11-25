
import * as DOMCache from "./dom/dom-cache"
import { filterByRegion, searchForCountry } from "./utils/filter"
import {renderCards} from "./utils/dynamic-list";


//Load default results

document.addEventListener('DOMContentLoaded', renderCards)

/* Filter Items by Country */
DOMCache.countrySearchBar?.addEventListener('keydown', searchForCountry)//load list on filter by Country

/* Filter Items by Region */
DOMCache.regionSelect?.addEventListener('change', filterByRegion) //load list on filter by Region


/* Theme Toggler */