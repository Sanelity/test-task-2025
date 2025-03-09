import { capitalize } from '../util';
import { CatAPI } from './catAPI';
import { NASAAPI } from './nasaAPI';
import { PokeAPI } from './pokeAPI';
import { RestCountriesAPI } from './restCountriesAPI';


//API configuration and data universalisation file
export const apiConfig = {
    catAPI: {
        config: {
            default: {
                title: {value:(data) => data.breeds[0].name, type: "text", name: "Breed"},
                description: {value: (data) => data.breeds[0].description,type: "text", name: "Description"},
                img_url: {value:(data) => data.url, type: "image", name: "Image"},
                extra: {
                    0:{value: (data) => data.breeds[0].origin, type: "text", name: "Breed Origin"} ,
                    1:{value: (data) => data.breeds[0].temperament, type: "text", name: "Temperament"},
                    2:{value: (data) => data.breeds[0].life_span, type: "text", name: "Life span in Years"},
                },
                useful_url:{value: (data) => data.breeds[0].wikipedia_url, type: "link", name: "Wikipedia"},
                order: ["img_url","title","description","extra","useful_url"],
                fetchStrategy: (input) => CatAPI.searchCatsByBreed(input),
            }
        },
        name: "Cat API",
        inputHint: "Type to search for Breeds, empty for Random",
    },
    nasaAPI: {
        config: {
            apod: {
                title: {value: (data) => data.title, type: "text", name: "Title"},
                description: {value: (data) => data.explanation, type: "text", name: "Explanation"},
                img_url: {value: (data) => data.url, type: "image", name: "Image"},

                extra: {
                    0: {value: (data) => data.date, type: "text", name: "Date"},
                    1: {value: (data) => data.copyright, type: "text", name: "Copyright"},
                    2: {value: (data) => null, type: null, name: null},
                },
                useful_url: {value: (data) => null, type: null, name: null},
                order: ["img_url","title","description","extra","useful_url"],
                fetchStrategy: (input) => NASAAPI.getAPOD(input),
            },
            curiosity: {
                title: {value: (data) => data.id, type: "text", name: "ID"},
                description: {value: (data) => data.camera.full_name, type: "text", name: "Camera"},
                img_url: {value: (data) => data.img_src, type: "image", name: "Image"},

                extra: {
                    0: {value: (data) => null, type: null, name: null},
                    1: {value: (data) => null, type: null, name: null},
                    2: {value: (data) => null, type: null, name: null},
                },
                useful_url: {value: (data) => null, type: null, name: null},
                order: ["img_url","title","description"],
                fetchStrategy: (input) => NASAAPI.getCuriosityPictures(input),
            }
        },
        name: "NASA API",
        inputHint: "Type to specify Date, empty for Today's date",
        variant: ["apod", "curiosity"],
    },
    pokeAPI: {
        config: {
            default: {
                title: {value: (data) => capitalize(data.species.name), type: "text", name: "Pokemon"},
                description: {value: (data) => capitalize(data.types[0].type.name), type: "text", name: "Type"},
                img_url: {value: (data) => data.sprites.front_default,  type: "image", name: "Image"},

                extra: {
                    0: {value: (data) => data.stats[0].base_stat, type: "text", name: "HP"},
                    1: {value: (data) => data.stats[1].base_stat, type: "text", name: "DEF"},
                    2: {value: (data) => data.stats[2].base_stat, type: "text", name: "ATK"},
                },
                useful_url: {value: (data) => null, type: null, name: null},
                order: ["img_url","title","description","extra"],
                fetchStrategy: (input) => PokeAPI.getPokemonData(input),
            }    
        },
        name: "Poke API",
        inputHint: "Type to search for Pokemon (try pokemon id)",
    },
    countriesAPI: {
        config: {
            default: {
                title: {value: (data) => data.name.official, type: "text", name: "Country"},
                description: {value: (data) => data.region +", "+ data.subregion, type: "text", name: "Region"},
                img_url: {value: (data) => data.flags.png, type: "image", name: "Flag"},

                extra: {
                    0: {value: (data) => data.capital, type: "text", name: "Capital"},
                    1: {value: (data) => data.population, type: "text", name: "Population"},
                    2: {value: (data) => data.area, type: "text", name: "Area KM2"},
                },
                useful_url: {value: (data) => data.maps.googleMaps, type: "link", name: "Google Maps"},
                order: ["img_url","title","description","extra","useful_url"],
                fetchStrategy: (input) => RestCountriesAPI.getCountriesDataSearch(input),
            }
        },
        name: "REST Countries API",
        inputHint: "Type to search for Country",
    },
}