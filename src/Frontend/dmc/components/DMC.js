import React from 'react'
import '../../css/dmc_css/DMC.css'
import {FcMultipleCameras} from 'react-icons/fc'
import {FcGallery} from 'react-icons/fc'



const DMC = () => {
  return (
    <div className='dmc-main'>
      <div class="title">
        DIGITAL MONITORING CELL(DMC)
      </div>
      <div class="link">
        <div><a href="gallery"> <FcGallery/> GALLERY</a></div>
        <div><a href="Upload"> <FcMultipleCameras/> Upload Photos</a></div>
      </div>
    </div>
  )
  
}

export default DMC;