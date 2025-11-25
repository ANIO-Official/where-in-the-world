export default class CountryCard{
    flag: string
    altText: string
    name: string
    population: number
    region: string
    capital: string

    constructor(flag:string, altText:string, name:string, population:number, region:string, capital:string){
        this.flag = flag,
        this.altText = altText,
        this.name =name,
        this.population = population,
        this.region = region,
        this.capital = capital
    }
}

/*
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