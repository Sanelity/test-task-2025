
import { DataFetch } from "./dataFetch";

export class RestCountriesAPI {
    static #source = "https://restcountries.com/v3.1/";
  
    static async getAllCountriesData() {
      try {
        const data = await DataFetch.getData(this.#source + `all`);
        return data !== null ? data : [];
      } catch (error) {
        console.error("Error when retrieving data of all countries:", error);
        return null;
      }
    }
  
    static async getCountriesDataSearch(country) {
      try {
        if (!country) return await this.getAllCountriesData();
  
        const data = await DataFetch.getData(this.#setRequestSearch(country));
        return data !== null ? data : [];
      } catch (error) {
        console.error(`Error when retrieving country data "${country}":`, error);
        return null;
      }
    }
  
    static #setRequestSearch(string_Country) {
      return this.#source + `name/${string_Country}`;
    }
  }