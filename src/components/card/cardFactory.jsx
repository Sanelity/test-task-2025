import { useState, useEffect } from "react";
import { CardItem } from "./cardItem";
import { Button } from "react-bootstrap";
import { apiConfig } from "../getAPI/apiConfig";



export function CardFactory({data, API, VAR}){
    const style = {width: '8rem', margin: '8px'};

    const [id,setId] = useState(0);

    useEffect(() => {
        setId(0);
    }, [data]);

    function isNotOneCard(){
        if(Object.keys(data).length > 1) return true;
        return false;
    }

    function getNextCard(){
        let length = Object.keys(data).length;

        try{
            if(!((id + 1) < length)) throw new Error(`No data for the next card! You have reached the end.`)
            setId(id + 1)
        }catch(error){
            alert(`${error.message}`);
        }
    }
    
    function getPreviousCard(){
        try{
            if(!((id - 1) >= 0)) throw new Error(`No data for the card! You have reached the beginning.`)
            setId(id - 1)
        }catch(error){
            alert(`${error.message}`);
        }
    }

    function isNextDisabled(){
        let length = Object.keys(data).length;
        if(((id + 1) >= length)) return true;
        return false
    }
    function isPreviousDisabled(){
        if(((id - 1) < 0)) return true;
        return false
    }

    if(data && data[id]){
        return(
            <>
                <CardItem 
                title = {data[id].title}
                description = {data[id].description}
    
                img_url = {data[id].img_url}
    
                extra_name = {apiConfig[API].config[VAR].extra}
                extra = {data[id].extra}
    
                useful_url_name = {apiConfig[API].config[VAR].useful_url.name}
                useful_url = {data[id].useful_url}
                ></CardItem>
                {isNotOneCard() && 
                <div>
                    <Button style={style} variant="danger" onClick={() => getPreviousCard()} disabled={isPreviousDisabled()}> Previos Card</Button>
                    <Button style={style} variant="success" onClick={() => getNextCard()} disabled={isNextDisabled()}> Next Card</Button>
                </div>
                }
                
            </>
        )
    }
    
}