import Form from 'react-bootstrap/Form';
import { capitalize } from './util';
import { apiConfig } from './getAPI/apiConfig';

import './APISelector.css'

export function APISelector({setAPIMethod, API, setVariantMethod}){

    const defaultTitle = "Select API here";

    function selectAPI(apiKey){
        if(apiKey == defaultTitle) setAPIMethod(null);
        else{
        setAPIMethod(apiKey);

        const variants = apiConfig[apiKey]?.variant;
        selectVariant(variants ? variants[0] : "default");
        }
    }
    function selectVariant(apiKey){
        setVariantMethod(apiKey)
    }

    return(
        <div className='selector'>
            <Form.Select style={{ minWidth: "8rem"}} defaultValue={"none"} onChange={(event) => selectAPI(event.target.value)}>
                <option>{defaultTitle}</option>
                {Object.keys(apiConfig).map((apiKey) => (
                    <option key={apiKey} value={apiKey}>
                        {apiConfig[apiKey].name}
                    </option>
                ))}
            </Form.Select>


            {apiConfig[API]?.variant && (
                <Form.Select style={{maxWidth: "6rem"}} defaultValue={"default"} onChange={(event) => selectVariant(event.target.value)}>
                    {apiConfig[API].variant.map((variant) => (
                        <option key={variant} value={variant}>
                            {capitalize(variant)}
                        </option>
                    ))}
                </Form.Select>
            )}
        </div>
    )



}