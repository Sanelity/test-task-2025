import { useEffect, useState } from "react";
import { APISelector } from "./components/APISelector";
import { SearchForm } from "./components/SearchForm";
import { ModeSelector } from "./components/ModeSelector";
import { DisplayWindow } from "./components/DisplayWindow";
import { APIAdapter } from "./components/getAPI/apiAdapter";

import './DataViewer.css'


export function DataViewer(){
    const [selectedMode, setMode] = useState(null);
    const [selectedAPI, setAPI] = useState(null);
    const [selectedVariant, setVariant] = useState("default");
    const [query, setQuery] = useState(null);

    const [data, setData] = useState(null);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setData(null);
    }, [selectedAPI,selectedVariant]);

    async function getData(){
        setLoading(true)
        try{
            const loadedData = await APIAdapter.getData(query, selectedVariant, selectedAPI);
            if(!loadedData) throw new Error("Data not found!")
            setData(loadedData);
        }catch(error){
            console.error(error)
            alert(error.message)
        }finally{
            setLoading(false);
        }
    }


    return(
        <div className="content">
            <div className="controls">
                <SearchForm setQueryMethod={setQuery} API={selectedAPI} getDataMethod={getData}/>
                <div className="mode">
                    <APISelector setAPIMethod={setAPI} API={selectedAPI} setVariantMethod={setVariant}/>
                    <ModeSelector  setModeMethod={setMode} selectedMode={selectedMode}/>
                </div>
            </div>
            
            <div>
            <DisplayWindow  
                selectedMode={selectedMode} data={data}
                VAR={selectedVariant} API={selectedAPI} 
                isLoading={isLoading}/>
            </div>
            
        </div>
    )
}