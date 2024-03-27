import React from "react";
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { NavLink } from "react-router-dom";
import jntugvlogo from '../media/jntugv.png'
import mods from "./Logins/Login";

const Firstpage=()=>{

  if(mods.uds && mods.uds.islogin){
    window.location.href='/profiles'
  }
  

    return(
        <div style={{textAlign:"center",paddingLeft:"15%",paddingRight:"15%"}}>
            <img src={jntugvlogo} width='200px' height='200px' alt='logo'></img>
        <Typography variant="h5" gutterBottom margin={0}><br></br>
        Jawaharlal Nehru Technological University Gurajada Vizianagaram<br></br><br></br>
        JNTUGV College of Engineering Vizianagaram
        <h6>(Established by Andhra Pradesh Act No.22 by 2021)</h6>
</Typography>
      <hr height={2}></hr>
      <Typography variant='h4' style={{marginTop:'10px'}}>
        University Admin Consoles
      </Typography>
      <br></br>
  <Button variant='contained' ><NavLink to='/login' style={{textDecoration:'none', color: "inherit"}}>Login</NavLink></Button>
  </div>
    );
}

export default Firstpage;