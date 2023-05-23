import React, { useEffect, useState, useContext, useRef } from 'react';
import './Note.css';
import { AppContext } from "../../Context/AppContext";

import bSong from '../../Assets/Songs/b.mp3' ;
import aSong from '../../Assets/Songs/a.mp3' ;
import gSong from '../../Assets/Songs/g.mp3' ;
import fSong from '../../Assets/Songs/f.mp3' ;
import eSong from '../../Assets/Songs/e.mp3' ;
import dSong from '../../Assets/Songs/d.mp3' ;
import cSong from '../../Assets/Songs/c.mp3' ;

const Note = () => {

    const [context, setContext] = useContext(AppContext);
    const [spans, setSpans] = useState([]);
    const [rightOffset, setRightOffset] = useState(0);
    const [intervalTime, setintervalTime] = useState(999999999);
    const audioRef = useRef(null);

    useEffect(() => {
        if (context.status === 0) {
            setintervalTime(999999999);
            if(audioRef.current != null){
                audioRef.current.pause();
            }
        }
        else if (context.status === 1){
            setintervalTime(6);
            if(audioRef.current != null){
                audioRef.current.play();
            }
        }
        else if (context.status === 2){
            audioRef.current = null;
            const interval = setInterval(() => {
                setRightOffset(0);
            }, 200);
    
            return () => clearInterval(interval);
        }
    }, [context.status]);

    useEffect(() => {
        if (context.note !== undefined && context.note !== -1 && context.status !== 2) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            
            if (context.music[context.note].charAt(0) === 'B') {
                audioRef.current = new Audio(bSong);
                audioRef.current.play();
            }
            else if (context.music[context.note].charAt(0) === 'A'){
                audioRef.current = new Audio(aSong);
                audioRef.current.play();
            }
            else if (context.music[context.note].charAt(0) === 'G'){
                audioRef.current = new Audio(gSong);
                audioRef.current.play();
            }
            else if (context.music[context.note].charAt(0) === 'F'){
                audioRef.current = new Audio(fSong);
                audioRef.current.play();
            }
            else if (context.music[context.note].charAt(0) === 'E'){
                audioRef.current = new Audio(eSong);
                audioRef.current.play();
            }
            else if (context.music[context.note].charAt(0) === 'D'){
                audioRef.current = new Audio(dSong);
                audioRef.current.play();
            }
            else if (context.music[context.note].charAt(0) === 'C'){
                audioRef.current = new Audio(cSong);
                audioRef.current.play();
            }
        }
    }, [context.note, context.music, context.status]);

    useEffect(() => {
        if (context.note === undefined || context.note === context.music.length) {
            return;
        }

        const interval = setInterval(() => {
            setRightOffset(prevRightOffset => prevRightOffset + 0.25);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [intervalTime, context.music.length, context.note]);

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
    
    }, [context.music, context.note, rightOffset, setContext]);

    useEffect(() => {
        if (context.note === undefined) {
            setRightOffset(0);
            setContext(prevContext => {
                return { ...prevContext, note: -1 };
            });
        }
    }, [context.note, setContext]);

    return(
        <div className={`note ${(context.status === 2 ? 'reload' : '')}`} >
            {spans}
        </div>
    )
}

export default Note;
