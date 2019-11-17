import React from 'react';
import './Navigation.css'

const Navigation = ({ onSignout }) => {
  return (
    <nav>
      <p
        onClick={() => onSignout('signin')}
        className='f3 link dim black underline pa3 pointer'
        style={{ marginTop: "-0.8em " }}>Sign out</p>
    </nav>
  )
}

export default Navigation 