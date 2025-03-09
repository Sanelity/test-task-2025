import { apiConfig } from "./apiConfig";

export class APIAdapter{

    static async getData(query, selectedVariant, selectedAPI){
        try{
            const api = apiConfig[selectedAPI]
            if (!api) throw new Error(`Selected "${selectedAPI}" not found`);

            let rawAPIData = await api.config[selectedVariant].fetchStrategy(query);

            if (!rawAPIData || Object.keys(rawAPIData).length === 0) {
                throw new Error("Data not loaded or API returned an empty response");
            }

            let length = Object.keys(rawAPIData).length;
            let dataArray = {};


            for(let i = 0; i < length; i++){
                let refinedInstance = this.#refineDataInstance(rawAPIData[i], selectedVariant, selectedAPI);
                this.#pushNewInstanceToArray(dataArray, refinedInstance);
            }
            return dataArray;
        }catch(error){
            console.error("API Adapter:", error.message);
            return null;
        }
    }

    static #pushNewInstanceToArray(array, dataInstance){
        let length = Object.keys(array).length;

        array[length] = dataInstance;
        return array;
    }

    static #refineDataInstance(rawData, variant, apiType){
        const config = apiConfig[apiType].config[variant];
        try{
            let refinedData = {};

            if (config.title && config.title.type !== null && rawData) {
                refinedData.title = config.title.value(rawData) ?? null;
            }
            
            if (config.description && config.description.type !== null && rawData) {
                refinedData.description = config.description.value(rawData) ?? null;
            }
            
            if (config.img_url && config.img_url.type !== null && rawData) {
                refinedData.img_url = config.img_url.value(rawData) ?? null;
            }
            
            if (config.extra && rawData) {
                refinedData.extra = {};
            
                for (let i = 0; i < 3; i++) {
                    if (config.extra[i] && config.extra[i].type !== null) {
                        refinedData.extra[i] = config.extra[i].value(rawData) ?? null;
                    }
                }
            }
            
            if (config.useful_url && config.useful_url.type !== null && rawData) {
                refinedData.useful_url = config.useful_url.value(rawData) ?? null;
            }
            
            return refinedData;
        }catch(error){
            console.error("API Adapter: Provided field is Missing, no data or wrong Config settings", error)
        }
    }
}