import { ButtonGroup, Button } from "react-bootstrap";
import { capitalize } from "./util";

import './ModeSelector.css'


export function ModeSelector({ selectedMode, setModeMethod}){
    const viewModes = ["card","table"];


    
    function isSelectedMode(mode){
        if(selectedMode == mode) return true;
        return false;
    }


    return(
        <ButtonGroup>
            {viewModes.map((mode) =>
                <Button
                    className="button"
                    key={mode}
                    variant={(isSelectedMode(mode)) ? "success" : "secondary"}
                    disabled={isSelectedMode(mode)}
                    value={mode}
                    onClick={() => setModeMethod(mode)}
                >
                    {capitalize(mode) + " view"}
                </Button>
            
            )}
        </ButtonGroup>
    )
}