// ----- IMPORT -----
import React from 'react';
import './Note.css';
// ------------------


const Note = ({pos}) => {
    return(
        <div className="note">
            <div className='moving'>
                <span className='n nB s1'></span>
                <span className='n nA s2'></span>
                <span className='n nG s3'></span>
                <span className='n nF s1'></span>
                <span className='n nE s1'></span>
                <span className='n nD s4'></span>
                <span className='n nC s1'></span>
            </div>
        </div>
    )
}

export default Note;