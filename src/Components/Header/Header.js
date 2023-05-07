// ----- IMPORT -----
import React, { useEffect, useState, useContext } from 'react';
import './Header.css';
import { AppContext } from "../../Context/AppContext";
// ------------------


const Header = () => {

    const [context, setContext] = useContext(AppContext);

    useEffect(() => {
        let musicStr = 'B F2 D G A B2 C A B D4';
        let musicArr = musicStr.split(' ');
    
        setContext({
            music: musicArr,
            note: -1
        });
        
      }, []);


    return(
        <header className="header">
            <div className="container-title">
                <h1 className="title">Piano<span className="multicolor">AI</span></h1>
            </div>
        </header>
    )
}

export default Header;