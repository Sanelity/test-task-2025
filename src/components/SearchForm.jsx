import { InputGroup, Form, Button, FloatingLabel } from "react-bootstrap"
import { apiConfig } from "./getAPI/apiConfig";

export function SearchForm({API, setQueryMethod, getDataMethod}){
    const defaultHint = "Select API before search";


    const hint = API == null || !apiConfig[API] ? defaultHint : apiConfig[API].inputHint;
    const isButtonEnabled = API != null && apiConfig[API] != null;


    return(
        <>
            <InputGroup hasValidation>
                <FloatingLabel
                    controlId="floatingInput"
                    label={hint}
                >
                    <Form.Control
                    placeholder={hint}
                    aria-label={hint}
                    aria-describedby="basic-addon2"
                    onChange={(e) => setQueryMethod(e.target.value)}
                    />
                </FloatingLabel>
                
                <Button variant={(isButtonEnabled) ? "success" : "danger"}
                        id="search-btn" 
                        disabled={!isButtonEnabled} 
                        onClick={getDataMethod}
                        >
                    Search
                </Button>
            </InputGroup>
        </>
    )
}