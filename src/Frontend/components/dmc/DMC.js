import React from 'react'
import '../../css/dmc_css/DMC.css'
import {FcMultipleCameras} from 'react-icons/fc'
import {FcGallery} from 'react-icons/fc'
import {FcLink} from 'react-icons/fc'
import { Outlet } from 'react-router-dom'

const DMC = () => {
  return (
    <div className='dmc-main'>
      <div class="title">
        DIGITAL MONITORING CELL(DMC)
      </div>
      <div class="link">
        <div><a href="Upload"> <FcGallery/> GALLERY</a></div>
        <div><a href="/DMC/DMC-Upload"> <FcMultipleCameras/> Upload Photos</a></div>
        <div><a href="/DMC/DMC-Trades"> <FcLink/> Upload Tenders</a></div>
      <Outlet/>
      </div>
    </div>
  )
}

export default DMC;