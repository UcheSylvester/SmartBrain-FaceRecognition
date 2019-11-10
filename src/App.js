import React from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <div className="body-container">
        <Rank />
        <ImageLinkForm />
      </div>
      {/*<FaceRecogntion /> */}
    </div>
  );
}

export default App;
