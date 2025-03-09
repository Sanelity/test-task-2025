import { CardFactory } from "./card/cardFactory";
import { LoadingScreen } from "./LoadingScreen";
import { TableFactory } from "./table/tableFactory";



export function DisplayWindow({selectedMode, API, VAR, data, isLoading}){

    if(isLoading) return(<LoadingScreen/>);
    else {
        switch(selectedMode){
        case "card": 
            return(<CardFactory API={API} VAR={VAR} data={data}/>)
        case "table":
            return(<TableFactory API={API} VAR={VAR} data={data}/>)
        default:
            return(<>Please, select view mode</>)
        }
    }
    
}