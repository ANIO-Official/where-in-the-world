export class DataError extends Error {
		constructor(message:string){
		super(message)
		this.name = "Data Error"
		}
	}	

	export class FetchError extends Error {
		constructor(message:string){
		super(message)
		this.name = "Fetch Error"
		}
	}