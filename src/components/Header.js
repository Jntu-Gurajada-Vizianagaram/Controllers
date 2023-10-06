import React from 'react'
import './css/Header.css'
import logo from '../media/logo.jpg'
import {GrMail} from 'react-icons/gr'
import {BsStopwatchFill} from 'react-icons/bs'


const Header = () => {
  return (
    <div className='header-main'>
        <div className='header'>
            <div className='logo'>
                <img src={logo} alt='JNTU LOGO' height={200} width={200}/>
            </div>
            <div className='logo-name'>
                <pre>JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM-535003,A.P <br/>(Established by Andhra Pradesh Act No.22 of 2021)</pre>
            </div>
            <div className='contact-header'>
                <pre><GrMail/> | Email : support@jntugv.edu.in</pre>
                <hr/>
                <pre><GrMail/> | Email : enquiry@jntugv.edu.in </pre>
                <pre><BsStopwatchFill/> | Office Timings : Mon-Sat : 10:00 AM to 5:00 PM</pre>
                
            </div>
        </div>
    </div>
  )
}

export default Header