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
      input: '',
      imageUrl: '',
      box: ''
    }
  }

  calculateFaceLocation = (data) => {
    const faceRegion = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('input-image')
    const width = image.width;
    const height = image.height;

    // console.log(faceRegion, width, height)

    return {
      leftCol: faceRegion.left_col * width,
      topRow: faceRegion.top_row * height,
      rightCol: width - (faceRegion.right_col * width),
      bottomRow: height - (faceRegion.bottom_row * height)
    }
  }

  setFaceBox = (box) => {
    console.log(box)
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onButtonSubmit = () => {
    console.log('clicked')
    this.setState({
      imageUrl: this.state.input
    })

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.setFaceBox(this.calculateFaceLocation(response)))
      .catch(error => console.log(error))
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
        <FaceRecogntion box={this.state.box} imageUrl={this.state.imageUrl} />

        </div>

      </div>
    );
  }
}


export default App;
