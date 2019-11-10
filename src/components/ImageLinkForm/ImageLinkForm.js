import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = () => {
  return (
    <div>
      <p className="f3">
        {'This magic brain will detect faces. Give it a try...'}
      </p>

      <div className="center">
        <div className="shadow-5 pa4 br3 form center">
          <input type="text" className="f4 pa2 w-70 center" />
          <button className="w-30 grow f4 ph3 link pv2 dib white bg-light-purple">Detect</button>
        </div>
      </div>
    </div>
  )

}

export default ImageLinkForm