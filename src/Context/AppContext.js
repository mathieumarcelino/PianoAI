// ----- IMPORT -----
import React, { createContext, useState } from "react";
// ------------------

export const AppContext = createContext();

export const AppProvider = (props) => {

    const [data, setData] = useState({
        music: [],
        note: undefined,
        status: undefined // undefined = unload, 0 = pause, 1 = play, 2 = refresh
    });

    return(
        <AppContext.Provider value={[data, setData]}>
            {props.children}
        </AppContext.Provider>
    );
};