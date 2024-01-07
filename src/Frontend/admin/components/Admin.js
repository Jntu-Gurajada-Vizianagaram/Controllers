import React from "react";
import "../css/Admin.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdminsCRUDControl from '../components/AdminCRUDControl';
import AllCrudControls from "../components/AllCrudControl";
import AllRequestControls from "../components/AllRequestControl";



const Admin = () => {

  
  
  return (
    <div className="admin-main">
      <div>
        <a href="/">
          
          <br />
        </a>
        <div className="all-requests">
          <h1>All Pending or Active Requests</h1>
        </div>
      </div>
      <div className="all-consoles">
        
      </div>
      {/* <AdminsCRUDControl/> */}
       {/* <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography> Admins Requests </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <AllRequestControls/>
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography>ALL Consoles</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <AllCrudControls/>
        </Typography>
      </AccordionDetails>
    </Accordion>*/}
    </div> 
  );
};

export default Admin;