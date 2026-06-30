import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import AdminsCRUDControl from './AdminCRUDControl';
import DirectorsCRUDControl from './DirectorsCRUDControl';
import UpdateCRUD from './UpdateCRUDControl';
import '../css/ConsoleManagement.css';

const consoleSections = [
  {
    id: 'notifications',
    title: 'Notifications CRUD',
    description: 'Create, edit, and manage public notifications and update records.',
    icon: <NotificationsActiveIcon />,
    content: <UpdateCRUD />,
  },
  {
    id: 'admins',
    title: 'Admins CRUD',
    description: 'Manage admin accounts, roles, and approved organizational emails.',
    icon: <ManageAccountsIcon />,
    content: <AdminsCRUDControl />,
  },
  {
    id: 'directors',
    title: 'Directors CRUD',
    description: 'Maintain directorate profiles and director records.',
    icon: <PeopleAltIcon />,
    content: <DirectorsCRUDControl />,
  },
];

const AllCrudControls = () => {
  const [expandedPanel, setExpandedPanel] = useState('notifications');

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <Box className="console-management-page">
      <Box className="console-management-hero">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography className="console-management-eyebrow">
              Admin workspace
            </Typography>
            <Typography variant="h4" className="console-management-title">
              Console Management
            </Typography>
            <Typography className="console-management-subtitle">
              Expand a section below. Tables now use the full dashboard width so records are easier to review.
            </Typography>
          </Box>
          <Chip
            label={`${consoleSections.length} consoles`}
            className="console-management-chip"
          />
        </Stack>
      </Box>

      <Box className="console-management-accordions">
        {consoleSections.map((section) => (
          <Accordion
            key={section.id}
            expanded={expandedPanel === section.id}
            onChange={handleAccordionChange(section.id)}
            className="console-management-accordion"
            disableGutters
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${section.id}-content`}
              id={`${section.id}-header`}
              className="console-management-summary"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box className="console-management-icon">{section.icon}</Box>
                <Box>
                  <Typography className="console-management-section-title">
                    {section.title}
                  </Typography>
                  <Typography className="console-management-section-desc">
                    {section.description}
                  </Typography>
                </Box>
              </Stack>
            </AccordionSummary>
            <AccordionDetails className="console-management-details">
              <Box className="console-management-table-area">
                {section.content}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default AllCrudControls;
