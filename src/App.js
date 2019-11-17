import React, { Component } from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecogntion from './components/FaceRecognition/FaceRecognition'

// import Clarifai from 'clarifai'

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '95d6002e6c0946308b035aa3fbf0ffee'
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onButtonSubmit = () => {
    console.log('clicked')

    app.models.predict(
      Clarifai.COLOR_MODEL,
      "http://bakebookey.com/wp-content/uploads/2019/01/download.jpg")
      .then(
        (response) => {
          console.log('response', response)
        },
        (error) => {
          console.log('error', error)
        }
      )
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <Logo />
          <Navigation />
        </div>

        <div className="body-container">
          <Rank />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />

          <FaceRecogntion />
        </div>
      </div>
    );
  }
}


export default App;
