// ----- IMPORT -----
import React from 'react';
import './WhiteKey.css';
// ------------------


const WhiteKey = ({type, active}) => {

    return(
        <div className={'whitekey ' + type + ' ' + active}>
            <span>{type}</span>
        </div>
    )
}

export default WhiteKey;