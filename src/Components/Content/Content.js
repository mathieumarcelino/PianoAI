// ----- IMPORT -----
import React from 'react';
import './Content.css';
// ------------------


const Content = ({text}) => {

    return(
        <div className="content">
            <span>{text}</span>
        </div>
    )
}

export default Content;