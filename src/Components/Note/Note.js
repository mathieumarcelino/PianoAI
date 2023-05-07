import React, { useEffect, useState, useContext } from 'react';
import './Note.css';
import { AppContext } from "../../Context/AppContext";

const Note = () => {

    const [context, setContext] = useContext(AppContext);
    const [spans, setSpans] = useState([]);
    const [rightOffset, setRightOffset] = useState(0);
    const intervalTime = 12; // x millisecondes, modifiez cette valeur selon vos besoins

    useEffect(() => {
        console.log(context.note);

        if (context.note === undefined || context.note === context.music.length) {
            return;
        }

        const interval = setInterval(() => {
            setRightOffset(prevRightOffset => prevRightOffset + 0.25);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [context.note]);

    useEffect(() => {
        if (context.note === undefined) {
            return;
        }

        let position = 0;
        const size = 10;

        const generatedSpans = context.music.map((note, index) => {
            return ((note, index) => {
                let span;

                const multiplier = (note.length === 1) ? 1 : parseInt(note.charAt(1), 10);

                if (context.note > index) {
                    position += multiplier;
                    return null;
                }

                if (rightOffset - size * position < 0) {
                    return null;
                }

                // if(index == 2){
                //     console.log(rightOffset - size * position);
                // }

                if(rightOffset - size * (position + multiplier) - 70 > 0){
                    setContext(prevContext => {
                        return { ...prevContext, note: undefined };
                    });
                }

                if(rightOffset - size * position - 70 === 0){
                    setContext(prevContext => {
                        return { ...prevContext, note: index };
                    });   
                }

                span = <span key={index} className={`n n${note.charAt(0)}`} style={{ right: `${-(size*position + size*multiplier) + rightOffset}vw`, width: `${size*multiplier}vw` }}></span>;
                position += multiplier;
        
                return span;
            })(note, index);
        });

        setSpans(generatedSpans);
    
    }, [context.music, context.note, rightOffset]);

    useEffect(() => {
        if (context.note === undefined) {
            setRightOffset(0);
            setContext(prevContext => {
                return { ...prevContext, note: -1 };
            });
        }
    }, [context.note]);

    return(
        <div className="note">
            {spans}
        </div>
    )
}

export default Note;
