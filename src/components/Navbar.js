import React from 'react'
import { NavLink } from 'react-router-dom'
import {HiDesktopComputer} from 'react-icons/hi'
import {GiTeacher} from 'react-icons/gi'
import {MdTipsAndUpdates,MdAdminPanelSettings,MdOutlineCastForEducation} from 'react-icons/md'

import './css/Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar-main'>
        <div className='navbar'>
            <div className='admin-link'>
                <NavLink to='/admin' className='admin-nav'>
                    <span>
                        <MdAdminPanelSettings /> Admin 
                    </span>
                </NavLink>
            </div>
            <div className='updates-link' >
                <NavLink to='/updates' className='updates-nav'>
                    <span>
                        <MdTipsAndUpdates />Updates 
                    </span>
                </NavLink>
            </div>
            <div className='dmc-link' >
                <NavLink to='/DMC' className='dmc-nav'>
                <span>
                   <HiDesktopComputer/> DMC
                </span>
                </NavLink>
            </div>
            <div className='hods-link' >
                <NavLink to='/HODS' className='hods-nav'>
                    <span>
                        <GiTeacher/> HODS
                    </span>
                </NavLink>
            </div>
            <div className='aff-clgs-link' >
                <NavLink to='/Affliated-College' className='aff-clgs-nav'>
                    <span>
                        <MdOutlineCastForEducation/> Affliated Colleges
                    </span>
                </NavLink>
            </div>
        </div>
    </div> 
  )
}

export default Navbar