// ----- IMPORT -----
import React, { useEffect, useState, useContext } from 'react';
import './Piano.css';
import { AppContext } from '../../Context/AppContext';
import WhiteKey from '../WhiteKey/WhiteKey';
import BlackKey from '../BlackKey/BlackKey';
// ------------------


const Piano = () => {

    const [context] = useContext(AppContext);
    const [noteSelected, setNoteSelected] = useState('');

    useEffect(() => {
        if (context.note !== undefined && context.note !== -1) {
            setNoteSelected(context.music[context.note].charAt(0));
        }
        else {
            setNoteSelected('');
        }
    }, [context.note, context.music]);

    return(
        <div className='piano'>
            <WhiteKey type={'B'} active={noteSelected === 'B' ? 'active' : ''}/>
            <WhiteKey type={'A'} active={noteSelected === 'A' ? 'active' : ''}/>
            <WhiteKey type={'G'} active={noteSelected === 'G' ? 'active' : ''}/>
            <WhiteKey type={'F'} active={noteSelected === 'F' ? 'active' : ''}/>
            <WhiteKey type={'E'} active={noteSelected === 'E' ? 'active' : ''}/>
            <WhiteKey type={'D'} active={noteSelected === 'D' ? 'active' : ''}/>
            <WhiteKey type={'C'} active={noteSelected === 'C' ? 'active' : ''}/>

            <BlackKey pos={1}/>
            <BlackKey pos={2}/>
            <BlackKey pos={3}/>
            <BlackKey pos={4}/>
            <BlackKey pos={5}/>
        </div>
    )
}

export default Piano;
