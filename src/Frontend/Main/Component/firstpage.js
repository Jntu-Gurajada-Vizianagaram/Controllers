import React from "react";
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { NavLink } from "react-router-dom";

const Firstpage=()=>{
    return(
        <div style={{textAlign:"center",paddingLeft:"15%",paddingRight:"15%"}}>
            <img src='https://dhondi.ai/logos/jntugv.png' width='200px' height='200px' alt='logo'></img>
        <Typography variant="h5" gutterBottom margin={0}>
        Jawaharlal Nehru Technological University-Gurajada Vizianagaram<br></br>
        {/* College of Engineering,Vizianagaram */}
        (Established by Andhra Pradesh Act No.22 by 2021)
</Typography>
      <hr height={2}></hr>
      <Typography variant='h5' style={{marginTop:'10px'}}>
        Academic Console
      </Typography>
      <br></br>
  <Button variant='contained' ><NavLink to='/login' style={{textDecoration:'none', color: "inherit"}}>Login</NavLink></Button>
  </div>
    );
}

export default Firstpage;