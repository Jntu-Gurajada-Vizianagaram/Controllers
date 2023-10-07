import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/Navbar.css';
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import CorporateFareSharpIcon from '@mui/icons-material/CorporateFareSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = () => {
  return (
    <div className='navbar-main'>
        <div className="NavBar">
                <Stack direction="row" spacing={5}>
                    <Button className="hover-effect" startIcon={<HomeIcon />}>Home</Button>
                    <Button className="hover-effect" startIcon={<PersonSharpIcon />}><NavLink to='/admin'>
                    Admin
                </NavLink></Button>
                    <Button className="hover-effect" startIcon={<CorporateFareSharpIcon />}><NavLink to='/Affliated-College'>
                    Colleges
                </NavLink></Button>
                    <Button className="hover-effect" startIcon={<NotificationsActiveIcon />}><NavLink to='/updates'>
                    Updates
                </NavLink></Button>
                    <Button className="hover-effect" startIcon={<NotificationsActiveIcon />}><NavLink to='/DMC'>
                    DMC
                </NavLink></Button>
                    <Button className="hover-effect" startIcon={<GroupsIcon />}><NavLink to='/HODS'>
                    HODS
                </NavLink></Button>
                    <Button className="hover-effect" startIcon={<LogoutIcon />}>Logout</Button>
                </Stack>
            </div>
    </div> 
  )
}

export default Navbar;