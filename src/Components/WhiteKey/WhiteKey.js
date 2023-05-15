// ----- IMPORT -----
import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import './WhiteKey.css';
// ------------------


const WhiteKey = ({type, active}) => {

    const [context] = useContext(AppContext);

    return(
        <div className={`whitekey ${type} ${(context.status !== 2 ? active : 'fade-reload')}`}>
            <span>{type}</span>
        </div>
    )
}

export default WhiteKey;