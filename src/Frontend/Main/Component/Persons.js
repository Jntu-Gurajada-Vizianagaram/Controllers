import React from "react";
import Card from '@mui/material/Card';
import ImageList from '@mui/material/ImageList';
import { Box, Button, Typography } from "@mui/material";
import { Link, Link as RouterLink } from "react-router-dom";
import jntugvlogo from '../media/jntugv.png'
import "../css/person.css"
import Roleaccess from '../Component/Roles'
import mods from "./Logins/Login";
const Persons = () =>{
  const admin_details =mods.uds
  if(!(mods.uds)){
    window.location.href='/'
  }
  
    return(
        <div>
            <div style={{textAlign:"center",paddingLeft:"15%",paddingRight:"15%"}}>
            <img src={jntugvlogo} width='150px' height='150px' alt='logo'></img>
        <Typography variant="h5" gutterBottom margin={0}>
        Jawaharlal Nehru Technological University-Gurajada Vizianagaram<br></br>
</Typography>
      <hr height={2}></hr>
      <Typography variant="h5" gutterBottom margin={7}>
            You are Already logged in as <h1>{admin_details.admin}</h1>
          </Typography>
        <Box className="image-grid">
          { 
            Roleaccess[admin_details.role].map((acc,index)=>
            (
              <Box className="role-box" key={index}>
                <img src={acc.img} width='130px' height='130px' alt={acc.role+"-img"}></img>
            <Button variant="contained" component={RouterLink} to={acc.to} >{acc.role}</Button>
          </Box>
            ))
          }
          
        </Box>
          <Typography variant="h5" gutterBottom margin={10}>
            <Button variant="contained" component={RouterLink} to='/' 
            onClick={(e)=>{
              localStorage.removeItem("accesser")
            }}
            >Logout</Button>
          </Typography>
      </div>
        </div>
    );
}

export default Persons;