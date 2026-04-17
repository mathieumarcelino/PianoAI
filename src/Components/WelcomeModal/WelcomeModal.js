import React, { useContext } from 'react';
import './WelcomeModal.css';
import { AppContext } from '../../Context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const WelcomeModal = () => {
    const [context, setContext] = useContext(AppContext);

    if (context.status !== undefined) return null;

    const handleStart = () => {
        setContext(prevContext => ({ ...prevContext, status: 2 }));
    };

    return (
        <div className="welcome-overlay">
            <div className="welcome-modal">
                <h1 className="welcome-title">
                    Piano<span className="welcome-multicolor">AI</span>
                </h1>
                <p className="welcome-subtitle">
                    Discover a unique melody generated in real time by artificial intelligence — every session is a new composition.
                </p>
                <button className="welcome-cta" onClick={handleStart}>
                    <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                    Start generate music
                </button>
            </div>
        </div>
    );
};

export default WelcomeModal;
