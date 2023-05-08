import React, { useEffect, useState, useContext } from 'react';
import './Header.css';
import { AppContext } from '../../Context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRotate } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const [context, setContext] = useContext(AppContext);
    const [play, setPlay] = useState(false);
    const [rotate, setRotate] = useState(false);

    useEffect(() => {
        let musicStr = 'F G A F G2 F G A2 A2 G2 G2 F G A F G2 F G A2 A2 F2 F2 F G A F G2 F G A2 A2 G2 G2 F G A F G2 F G A2 A2';
        //F G A F G2 F G A2 A2 G2 G2 F G A F G2 F G A2 A2 F2 F2 F G A F G2 F G A2 A2 G2 G2 F G A F G2 F G A2 A2 F2 F2
        // MAX LEN 52
        let musicArr = musicStr.split(' ');

        setContext({
            music: musicArr,
            note: -1,
            status: 0
        });
    }, []);

    useEffect(() => {
        if(context.status !== 2){
            return;
        }
        const interval = setInterval(() => {
            // let musicStr = 'F G A F G2 F G A2 A2 G2 G2 F G A F G2 F G A2 A2 F2 F2 F G A F G2 F G A2 A2 G2 G2 F G A F G2 F G A2 A2';
            let inputText = '';
            let longueur = Math.random() * (160 - 60) + 60;
            let creativite = 50;
            let url = `http://127.0.0.1:8280/pianoai/g/${encodeURIComponent(inputText)}/${encodeURIComponent(longueur)}/${encodeURIComponent(creativite)}`
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        let musicArr = result.split(' ');
                        setContext({
                            music: musicArr,
                            note: -1,
                            status: 1
                        });
                    }
                )
                .catch(error => {
                    let musicStr = 'C D E F G A B C D E F G A B C D E F G A B C D E F G A B C D E F G A B C D E F G A B';
                    let musicArr = musicStr.split(' ');
                    setContext({
                        music: musicArr,
                        note: -1,
                        status: 1
                    });
                }
            )
        }, 200);

        return () => clearInterval(interval);
    }, [context.status]);

    const handlePlay = () => {
        console.log(play);

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
