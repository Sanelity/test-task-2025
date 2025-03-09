export class DataFetch{

    static async getData(source, requestOptions){
        try{
            const response = await fetch(source, requestOptions);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("DataFetch:", error.message);
            return null;
        }
    }
}