import React from 'react'
import UpdateCRUD from './UpdateCRUDControl'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdminsCRUDControl from './AdminCRUDControl';

const AllCrudControls = () => {
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center", fontFamily:"Timesnewroman" }}><h3>Click To expand</h3></div>
    
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography style={{display:"flex",justifyContent:"center",alignItems:"center", fontFamily:"Timesnewroman" }}> 
        <h2 >Notifications CRUD</h2></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <UpdateCRUD/>
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography style={{display:"flex",textAlign:"center", fontFamily:"Timesnewroman" }}>
          <h2 >Admins CRUD</h2></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <AdminsCRUDControl/>
        </Typography>
      </AccordionDetails>
    </Accordion>
  </div>
  )
}

export default AllCrudControls