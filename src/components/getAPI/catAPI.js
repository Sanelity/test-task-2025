import { DataFetch } from "./dataFetch";


export class CatAPI{
    static #source = "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10"

    static #breedsCache = null;

    static #headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "live_nTcjQcbnV0PBdNzPXQF61jC3TAv9G17eU6iYbuEmUbKcVkijxuQoquy6ewItAb9a"
      });
      
    static #requestOptions = {
        method: 'GET',
        headers: this.#headers,
        redirect: 'follow'
      };

    static async #getBreeds() {
        if (this.#breedsCache) return this.#breedsCache;

        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        if (!response.ok) throw new Error("Breed list loading error");

        this.#breedsCache = await response.json();
        return this.#breedsCache;
    }
    static async #getImages(breedId = null) {
        const url = breedId 
            ? `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=3`
            : this.#source;

        return await DataFetch.getData(url, this.#requestOptions);
    }
    static async #findClosestBreed(query) {
        if (!query || query === "") return null;

        const breeds = await this.#getBreeds();
        query = query.toLowerCase();

        const exactMatch = breeds.find(breed => breed.name.toLowerCase() === query);
        if (exactMatch) return exactMatch;

        const closestMatch = breeds.find(breed => breed.name.toLowerCase().startsWith(query));
        return closestMatch || null;
    }

    static async searchCatsByBreed(query) {
        const closestBreed = await this.#findClosestBreed(query);
        
        if (!closestBreed || Object.keys(closestBreed).length === 0 || closestBreed === "") {
            return this.#getImages();
        }

        return this.#getImages(closestBreed.id);
    }
}