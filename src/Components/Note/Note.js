import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import './Note.css';
import { AppContext } from "../../Context/AppContext";

import bSong from '../../Assets/Songs/b.mp3';
import aSong from '../../Assets/Songs/a.mp3';
import gSong from '../../Assets/Songs/g.mp3';
import fSong from '../../Assets/Songs/f.mp3';
import eSong from '../../Assets/Songs/e.mp3';
import dSong from '../../Assets/Songs/d.mp3';
import cSong from '../../Assets/Songs/c.mp3';

const NOTE_SOURCES = { B: bSong, A: aSong, G: gSong, F: fSong, E: eSong, D: dSong, C: cSong };
const FADE_OUT = 0.03; // 30ms fade-out to avoid audio click artifacts

const Note = () => {

    const [context, setContext] = useContext(AppContext);
    const [spans, setSpans] = useState([]);
    const [rightOffset, setRightOffset] = useState(0);
    const [intervalTime, setintervalTime] = useState(999999999);

    const audioCtxRef = useRef(null);
    const buffersRef = useRef({});
    const currentSourceRef = useRef(null);
    const currentGainRef = useRef(null);
    const loadedRef = useRef(false);

    // Unlock AudioContext on user interaction (required on iOS/Android)
    useEffect(() => {
        const unlock = () => {
            if (audioCtxRef.current?.state === 'suspended') {
                audioCtxRef.current.resume();
            }
        };
        document.addEventListener('touchstart', unlock, { passive: true });
        document.addEventListener('click', unlock, { passive: true });
        return () => {
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('click', unlock);
        };
    }, []);

    const ensureAudioContext = useCallback(() => {
        if (!audioCtxRef.current) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return null;
            audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        return audioCtxRef.current;
    }, []);

    const loadBuffers = useCallback(async () => {
        if (loadedRef.current) return;
        const ctx = ensureAudioContext();
        if (!ctx) return;
        loadedRef.current = true;
        await Promise.all(
            Object.entries(NOTE_SOURCES).map(async ([note, url]) => {
                try {
                    const res = await fetch(url);
                    const arrayBuf = await res.arrayBuffer();
                    buffersRef.current[note] = await ctx.decodeAudioData(arrayBuf);
                } catch (e) {
                    console.error(`Failed to load note ${note}:`, e);
                    loadedRef.current = false;
                }
            })
        );
    }, [ensureAudioContext]);

    const stopNote = useCallback((immediate = false) => {
        if (!currentSourceRef.current) return;
        const source = currentSourceRef.current;
        const gain = currentGainRef.current;
        const ctx = audioCtxRef.current;
        currentSourceRef.current = null;
        currentGainRef.current = null;
        if (immediate || !ctx || !gain) {
            try { source.stop(); } catch (e) {}
            return;
        }
        // Short fade-out to prevent audio click artifacts
        const now = ctx.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0, now + FADE_OUT);
        setTimeout(() => { try { source.stop(); } catch (e) {} }, (FADE_OUT + 0.01) * 1000);
    }, []);

    const playNote = useCallback((noteLetter) => {
        const ctx = ensureAudioContext();
        if (!ctx) return;
        const buffer = buffersRef.current[noteLetter];
        if (!buffer) return;

        stopNote(false);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.01); // 10ms fade-in
        gainNode.connect(ctx.destination);

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(gainNode);
        source.start(ctx.currentTime);

        currentSourceRef.current = source;
        currentGainRef.current = gainNode;
    }, [ensureAudioContext, stopNote]);

    useEffect(() => {
        if (context.status === 0) {
            setintervalTime(999999999);
            stopNote(true);
        }
        else if (context.status === 1) {
            setintervalTime(6);
            loadBuffers();
        }
        else if (context.status === 2) {
            stopNote(true);
            const interval = setInterval(() => {
                setRightOffset(0);
            }, 200);
            return () => clearInterval(interval);
        }
    }, [context.status, loadBuffers, stopNote]);

    useEffect(() => {
        if (context.note !== undefined && context.note !== -1 && context.status !== 2) {
            const noteLetter = context.music[context.note]?.charAt(0);
            if (noteLetter && NOTE_SOURCES[noteLetter]) {
                playNote(noteLetter);
            }
        }
    }, [context.note, context.music, context.status, playNote]);

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
