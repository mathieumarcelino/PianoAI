import React, { useEffect, useState, useContext, useRef } from 'react';
import './Header.css';
import { AppContext } from '../../Context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRotate } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const [context, setContext] = useContext(AppContext);
    const [play, setPlay] = useState(false);
    const [rotate, setRotate] = useState(false);
    const isFirstRender = useRef(true);

    function filterString(inputString) {
        const regex = /([a-gA-G])([2-9]?)/g;
        let result = '';
        let match;
    
        while ((match = regex.exec(inputString)) !== null) {
            if (match[2]) {
                result += match[1] + match[2] + ' ';
            } else {
                result += match[1] + ' ';
            }
        }
    
        return result.trim().toUpperCase();
    }
    
    function generateRandomString() {
        const letters = 'abcdefg';
        const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
    
        return `${randomLetter()} ${randomLetter()} ${randomLetter()}`;
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if(context.status === 2 || context.status === undefined){
            let inputText = generateRandomString();
            let longueur = 52;
            let creativity = 0.5;
            let url = `https://api.piano.mathi3u.com/music/g/${encodeURIComponent(inputText)}/${encodeURIComponent(longueur)}/${encodeURIComponent(creativity)}`
            console.log(url);
            fetch(url)
                .then(res => res.text())
                .then(
                    (result) => {
                        let musicStr = filterString(result);
                        let musicArr = musicStr.split(' ');
                        let statusUpdated = (context.status === undefined) ? 0 : 1;
                        setContext({
                            music: musicArr.slice(0, 30),
                            note: -1,
                            status: statusUpdated
                        });
                    }
                )
                .catch(error => {
                    let musicStr = 'C D E F G A B C D E F G A B C D E F G A B C D E F G A B B B';
                    let musicArr = musicStr.split(' ');
                    let statusUpdated = (context.status === undefined) ? 0 : 1;
                    setContext({
                        music: musicArr,
                        note: -1,
                        status: statusUpdated
                    });
                }
            )
        }
    }, [context.status]);

    const handlePlay = () => {
        setContext(prevContext => {
            let newStatus;
            if (prevContext.status === 0) {
                newStatus = 1;
            } else if (prevContext.status === 1) {
                newStatus = 0;
            } else {
                return prevContext;
            }
            return { ...prevContext, status: newStatus };
        });
    };

    const handleRotate = () => {
        setContext(prevContext => {
            return { ...prevContext, status: 2 };
        });
        setRotate(!rotate);
    };

    const handleKeyDown = (event) => {
        if (event.code === 'Space') {
            handlePlay();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if(!rotate){
            return;
        }
        const interval = setInterval(() => {
            setRotate(!rotate);
        }, 500);

        return () => clearInterval(interval);
    }, [rotate]);

    useEffect(() => {
        if(context.status === 0){
            setPlay(false);
        } 
        else if(context.status === 1) {
            setPlay(true);
        }
    }, [context.status]);
    

    return (
        <header className='header'>
            <div className='container-title'>
                <h1 className='title'>Piano<span className='multicolor'>AI</span></h1>
            </div>
            <div className='container-button'>
                <div className='container-button-item' onClick={handlePlay}>
                    <FontAwesomeIcon icon={play === false ? faPlay : faPause} size="lg" />
                </div>
                <div className='container-button-item' onClick={handleRotate}>
                    <FontAwesomeIcon icon={faRotate} size="lg" className={`${rotate ? 'rotate rotate-icon' : ''}`} />
                </div>
            </div>
        </header>
    )
}

export default Header;
