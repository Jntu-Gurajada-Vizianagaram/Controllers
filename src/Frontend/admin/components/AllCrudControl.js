import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import AdminsCRUDControl from './AdminCRUDControl';
import DirectorsCRUDControl from './DirectorsCRUDControl';
import UpdateCRUD from './UpdateCRUDControl';

const AllCrudControls = () => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Times New Roman" }}><h3>Click To expand</h3></div>

      <Accordion expanded={expandedPanel === 'panel1'} onChange={handleAccordionChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={{ display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Times New Roman" }}>
            <h2 >Notifications CRUD</h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <UpdateCRUD />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expandedPanel === 'panel2'} onChange={handleAccordionChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography style={{ display: "flex", textAlign: "center", fontFamily: "Times New Roman" }}>
            <h2 >Admins CRUD</h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <AdminsCRUDControl />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expandedPanel === 'panel3'} onChange={handleAccordionChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography style={{ display: "flex", textAlign: "center", fontFamily: "Timesnewroman" }}>
            <h2 >Directors CRUD</h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <DirectorsCRUDControl />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AllCrudControls;
