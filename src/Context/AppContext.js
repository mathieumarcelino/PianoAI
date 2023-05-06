// ----- IMPORT -----
import React, { createContext, useState } from "react";
// ------------------

export const AppContext = createContext();

export const AppProvider = (props) => {

    const [data, setData] = useState({
        note: 1,
    });

    return(
        <AppContext.Provider value={[data, setData]}>
            {props.children}
        </AppContext.Provider>
    );
};