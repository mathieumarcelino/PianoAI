// ----- IMPORT -----
import React, {useContext} from 'react';
import './Content.css';

import { AppContext } from "../../Context/AppContext";
// ------------------


const Content = () => {

    const [context, setContext] = useContext(AppContext);

    return(
        <div className="content">
            <span>C D G2 F3 E A B F2 D G A B2 C A B D4 C D G2 F3 E A B F2 D G A B2 C A B D4 C D G2 F3 E A B F2 D G A B2 C A B D4</span>
        </div>
    )
}

export default Content;