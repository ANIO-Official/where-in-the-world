import { DataError, FetchError } from "../utils/error-handling"

interface flagsObj{
    "png": string
    "svg": string
    "alt": string
}
interface nameObj{
    "common": string
    "official": string
    "nativeName": string
}

export interface isCountry{
    "flag": flagsObj
    "name": nameObj
    "population": number
    "region": string
    "capital": string
}

export let countries: isCountry[]

//Fetch Country Information from API

export async function fetchCountries(){
    try{
        //Fetch specific fields of all countries
        const response = await fetch('https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital')
        if(!response.ok){
            throw new FetchError('Failed to fetch country data from REST Countries API.')
        }
        countries = await response.json()
        if(countries === undefined || null){
            throw new DataError('Data returned Undefined. Failed to parse response data from API. Check fetch request, API status, or syntax.')
        }
    }catch(error){
        if(error instanceof FetchError){
            //for public
            alert('Error: Could not reach API for country data. Please try again later.')
            //for devs
            return console.error('Fetch Error:', error.message)
        }
        if(error instanceof DataError){
            //for public
            alert('Error: Unable to load country data at this time. We apologize! Please try again later or refresh the page.')
            //for devs
            return console.error('Data Error:', error.message)
        }
        
    }finally{
        console.log('Fetch request complete: Fetched country data from REST Countries API.')
    }
    return countries
}