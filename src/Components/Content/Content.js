// ----- IMPORT -----
import React, {useContext, useEffect, useState} from 'react';
import './Content.css';

import { AppContext } from '../../Context/AppContext';
// ------------------


const Content = () => {

    const [context, setContext] = useContext(AppContext);
    const [texts, setTexts] = useState([]);

    useEffect(() => {
        console.log(context.music.length);

        let itemPerLines = 1;
        if (context.music !== undefined){
            if(window.innerWidth > 768){
                if(context.music.length >= 48){
                    itemPerLines = context.music.length/4;
                }
                else {
                    itemPerLines = context.music.length/3;
                }
            }
            else {
                itemPerLines = (context.music.length < 26) ? context.music.length/7 : context.music.length/5;
            }
        }
        const sizePerText = (100/itemPerLines > 7) ? 100/itemPerLines : 7;

        console.log(itemPerLines,sizePerText, context.status);

        const generatedSpans = context.music.map((note, index) => {
            return ((note, index) => {
                let text = (
                    <div className={`container-text-note ${context.status === 2 ? 'reload' : ''}`} style={{ minWidth: `${sizePerText}%` }}>
                      <span className={`text-note ${context.note === index ? `current ${note.charAt(0)}` : context.note > index ? 'passed' : ''}`}>
                        {note}
                      </span>
                    </div>
                  );

                return text;
            })(note, index);
        });

        setTexts(generatedSpans);
    
    }, [context.music, context.note, context.status]);

    return(
        <div className='content'>
            <div className='content-center'>
                {texts}
            </div>
        </div>
    )
}

export default Content;