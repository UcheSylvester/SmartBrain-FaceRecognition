import React from 'react';
import './Navigation.css'

const Navigation = ({ onRouteChange, isSignedIn }) => {

  if (isSignedIn) {
    return (
      <nav className="navigation">
        <p
          onClick={() => onRouteChange('signin')}
          className='f3 link dim black pa3 pointer'
          style={{ marginTop: "-0.8em " }}>Sign out</p>
      </nav>
    )
  } else {
    return (
      <nav className="navigation">
        <p
          onClick={() => onRouteChange('signin')}
          className='f3 link dim black pa3 pointer'
          style={{ marginTop: "-0.8em " }}>Sign In</p>

        <p
          onClick={() => onRouteChange('register')}
          className='f3 link dim black pa3 pointer'
          style={{ marginTop: "-0.8em " }}>Register</p>
      </nav>
    )
  }


}

export default Navigation 