// ----- IMPORT -----
import './App.css';
import React from 'react';

import Header from './Components/Header/Header';
import Content from './Components/Content/Content';
import Piano from './Components/Piano/Piano';
import Note from './Components/Note/Note';

import {AppProvider} from "./Context/AppContext"

// ------------------

function App() {

  return (
    <div>
      <AppProvider>
        <Header />
        <Content />
        <Piano />
        <Note />
      </AppProvider>
    </div>
  );
}

export default App;
