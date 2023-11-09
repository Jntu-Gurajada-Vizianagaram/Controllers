import React from "react";
import "../../css/admin_css/Admin.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdminsCRUDControl from './AdminsCRUDControl';
import AllCrudControls from "./AllCrudControls";
import AllRequestControls from "./AllRequestControls";



const Admin = () => {

  
  
  return (
    <div className="admin-main">
      {/* <div>
        <a href="/">
          <button>
            Logout
            <MdLogout />
            {
              // {session}
            }
          </button>
          <br />
        </a>
        <div className="all-requests">
          <span>All Requests</span>
          <div className="updates-requests">Update Requests</div>
          <div className="dmc-requests">DMC Requests</div>
          <div className="news-requests">News and Event Request</div>
          <div className="dept-requests">Department Circular Requests</div>
        </div>
      </div>
      <div className="all-consoles">
        
      </div>
      <AdminsCRUDControl/> */}
       <Accordion>
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
    </Accordion>
    </div>
  );
};

export default Admin;