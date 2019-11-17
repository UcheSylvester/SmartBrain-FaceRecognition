import React from 'react';
import './FaceRecognition.css'


const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div className="center">
      <div className="absolute" style={{ top: '425px' }}>
        <img id="input-image" src={imageUrl} alt="" width="500px" height="auto" />
        <div id="bounding-box" style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol
        }}></div>
      </div>
    </div>
  )
}

export default FaceRecognition