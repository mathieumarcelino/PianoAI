// ----- IMPORT -----
import React from 'react';
import './Piano.css';
import WhiteKey from '../WhiteKey/WhiteKey';
import BlackKey from '../BlackKey/BlackKey';
// ------------------


const Piano = () => {
    return(
        <div className="piano">
            <WhiteKey type={"B"}/>
            <WhiteKey type={"A"}/>
            <WhiteKey type={"G"}/>
            <WhiteKey type={"F"}/>
            <WhiteKey type={"E"}/>
            <WhiteKey type={"D"}/>
            <WhiteKey type={"C"}/>

            <BlackKey pos={1}/>
            <BlackKey pos={2}/>
            <BlackKey pos={3}/>
            <BlackKey pos={4}/>
            <BlackKey pos={5}/>
        </div>
    )
}

export default Piano;