import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar-main'>
        <div className='navbar'>
            <div className='admin-link'>
                <NavLink to='/admin' className='admin-nav'>
                    Admin
                </NavLink>
            </div>
            <div className='updates-link' >
                <NavLink to='/updates' className='updates-nav'>
                    Updates
                </NavLink>
            </div>
            <div className='dmc-link' >
                <NavLink to='/DMC' className='dmc-nav'>
                    DMC
                </NavLink>
            </div>
            <div className='hods-link' >
                <NavLink to='/HODS' className='hods-nav'>
                    HODS
                </NavLink>
            </div>
            <div className='aff-clgs-link' >
                <NavLink to='/Affliated-College' className='aff-clgs-nav'>
                    Affliated Colleges
                </NavLink>
            </div>
        </div>
    </div> 
  )
}

export default Navbar