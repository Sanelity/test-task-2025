
import { DataFetch } from "./dataFetch";

export class PokeAPI{
    static #source = "https://pokeapi.co/api/v2/pokemon/"

    static async getPokemonData(pokemon_name){
        try{
            let data = await DataFetch.getData(this.#source + pokemon_name);

            if (data === null) throw new Error("PokeAPI: Pokemon not found");

            let nest = {};
            nest[0] = data;
            return nest;
        }catch(e){
            console.error(e.message);
            return null
        }
    }
}