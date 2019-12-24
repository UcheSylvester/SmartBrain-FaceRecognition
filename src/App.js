import React, { Component } from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecogntion from './components/FaceRecognition/FaceRecognition'
import Sigin from './components/Signin/Signin'
import Register from './components/Register/Register'


const initialState = {
  input: '',
  imageUrl: '',
  box: '',
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  // Calculating face location based on the data recieved from API
  calculateFaceLocation = (data) => {
    const faceRegion = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('input-image')
    const width = image.width;
    const height = image.height;

    return {
      leftCol: faceRegion.left_col * width,
      topRow: faceRegion.top_row * height,
      rightCol: width - (faceRegion.right_col * width),
      bottomRow: height - (faceRegion.bottom_row * height)
    }
  }

  // setting the face box state
  setFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    })

    // using the clarifai api to detect face and send request to db
    fetch('https://polar-inlet-44239.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => {
        return response.json()
      })
      .then(response => {
        if (response) {
          fetch('http://localhost:8080/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              // Modifying entries based on count returned from backend
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(error => console.log(error))
        }
        this.setFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(error))
  }

  onRouteChange = (route) => {
    if (route === 'signout' || route === 'signin') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state

    return (
      <div className="App">
        <div className="row">
          <Logo />
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
          />
        </div>

        <div className="body-container">
          {
            route === 'home' ?
              <div>
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecogntion
                  box={box}
                  imageUrl={imageUrl}
                />
              </div>
              : (
                route === 'signin'
                  ? <Sigin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )

          }
        </div>

      </div>
    );
  }
}


export default App;
