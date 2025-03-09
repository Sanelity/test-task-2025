
import { DataFetch } from "./dataFetch";
import { getTodayDate, isValidDate, tryParseDate } from "../dateGetter"

export class NASAAPI{

    static #api_key = "7AV8Q10UMXio0KPSAggfh1gTs8ra5peHFW8y0iug"
            ///Astronomy Picture of the Day
    static #sourceAPOD = `https://api.nasa.gov/planetary/apod`;
            ///Curiosity rover pictures of the Mars
    static #sourceCuriosity = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`;



    static async getCuriosityPictures(query_date){
        let numberOfPhotos = 15;

        let date = this.#validateRequestedData(query_date);
        
        const data = await DataFetch.getData(this.#setCuriosityRequest(date));

        const length = Object.keys(data.photos).length;

        if(length <= 15) return data.photos;

        const randomIndex = Math.floor(Math.random() * (length - numberOfPhotos));
        const randomPhotos = data.photos.slice(randomIndex, randomIndex + numberOfPhotos);

        return randomPhotos
    }


    static async getAPOD(query_date){
        let date = this.#validateRequestedData(query_date);

        const data = await DataFetch.getData(this.#setAPODRequest(date));

        if(!data)return null
        let nest = {};
        nest[0] = data;
        return nest;
    }
    static #setAPODRequest(date){
        return this.#sourceAPOD + `?date=${date}` + `&api_key=${this.#api_key}`
    }
    static #setCuriosityRequest(date){
        return this.#sourceCuriosity + `?earth_date=${date}` + `&api_key=${this.#api_key}`
    }

    static #validateRequestedData(string_yyyy_mm_dd){
        try{
            if (!string_yyyy_mm_dd) {
                throw new Error("Date is undefined or null. Using today's date.");
            }

            if(!isValidDate(string_yyyy_mm_dd)){
                throw new Error(`Incorrect data. Check the data entered and the format of the data!`);
            }

            return tryParseDate(string_yyyy_mm_dd);
        }catch(error){
            console.error(`[NASAAPI] Error: ${error.message}`)
            
            return getTodayDate();
        }
    }
}