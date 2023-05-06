// ----- IMPORT -----
import React from 'react';
import './WhiteKey.css';
// ------------------


const WhiteKey = ({type}) => {
    return(
        <div className={"whitekey " + type}>
            <span>{type}</span>
        </div>
    )
}

export default WhiteKey;