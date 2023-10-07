import React from 'react'
import './css/Header.css'
import logo from '../media/logo.jpg'
import {GrMail} from 'react-icons/gr'
import {BsStopwatchFill} from 'react-icons/bs'


const Header = () => {
  return (
    <div className='header-main'>
        <div className="logo">
                <a href="https://jtugv.edu.in">
                    <img src="https://dhondi.ai/logos/jntugv.png" width="150" height="150" alt="JNTU Logo" />
                </a>
                <a className="logoText" href="https://jntugv.edu.in">
                    <h1>जवाहरलाल नेहरू प्रौद्योगिकी विश्वविद्यालय-गुरजादा, विजयनगरम</h1>
                    <hr />
                    <h2>Jawaharlal Nehru Technological University - Gurajada, Vizianagaram</h2>
                </a>
            </div>
    </div>
  )
}

export default Header