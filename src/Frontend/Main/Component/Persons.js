import React from "react";
import Card from '@mui/material/Card';
import ImageList from '@mui/material/ImageList';
import { Box, Button, Typography } from "@mui/material";
import { Link, Link as RouterLink } from "react-router-dom";
import AdminImage from "../media/AdminImage.png";
import AffliatedColleges from "../media/AffliatedColleges.png";
import HOD from "../media/HOD.png";
import Updates from "../media/Updates.png";
import WebAdmin from "../media/WebAdmin.png";
import "../css/person.css"

const Persons = () =>{
    return(
        <div>
            <div style={{textAlign:"center",paddingLeft:"15%",paddingRight:"15%"}}>
            <img src='https://dhondi.ai/logos/jntugv.png' width='150px' height='150px' alt='logo'></img>
        <Typography variant="h5" gutterBottom margin={0}>
        Jawaharlal Nehru Technological University-Gurajada Vizianagaram<br></br>
</Typography>
      <hr height={2}></hr>
    <Box className="role-main-box">
          <Box className="role-box">
          <img src={AdminImage} width='130px' height='130px' alt='AdminImage'></img>
            <Button variant="contained" component={RouterLink} to="/Adminlogin">Admin</Button>
          </Box>
          <Box className="role-box">
          <img src={WebAdmin} width='130px' height='130px' alt='AdminImage'></img>
            <Button variant="contained" component={RouterLink} to="/webadminlogin">Web Admin</Button>
          </Box>
          <Box className="role-box">
          <img src={HOD} width='130px' height='130px' alt='AdminImage'></img>
            <Button variant="contained" component={RouterLink} to="/Hodlogin">HOD</Button>
          </Box>
          </Box>
          <Box className="role-main-box">
          <Box className="role-box">
          <img src={AffliatedColleges} width='130px' height='130px' alt='AdminImage'></img>
            <Button variant="contained" component={RouterLink} to="/Collegelogin" sx={{marginTop:"5px"}}>Colleges</Button>
          </Box>
          <Box className="role-box">
          <img src={Updates} width='130px' height='130px' alt='AdminImage'></img>
            <Button variant="contained" component={RouterLink} to="/Updatelogin">Updates</Button>
          </Box>
        </Box>
      </div>
        </div>
    );
}

export default Persons;