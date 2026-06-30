import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import CampaignIcon from '@mui/icons-material/Campaign';
import CollectionsIcon from '@mui/icons-material/Collections';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PublicIcon from '@mui/icons-material/Public';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import EventPhotosRequests from './requests/EventPhotosRequests';
import UpdatesRequests from './requests/UpdatesRequests';
import WebAdminRequests from './requests/WebAdminRequests';

const requestSections = [
  {
    id: 'updates',
    title: 'Notification requests',
    description: 'Review and publish update/notification submissions.',
    icon: <CampaignIcon />,
    content: <UpdatesRequests />,
  },
  {
    id: 'webadmin',
    title: 'Web admin requests',
    description: 'Approve web content requests from content managers.',
    icon: <PublicIcon />,
    content: <WebAdminRequests />,
  },
  {
    id: 'eventphotos',
    title: 'Event photo requests',
    description: 'Moderate event/gallery photo requests before publishing.',
    icon: <CollectionsIcon />,
    content: <EventPhotosRequests />,
  },
];

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 18,
  '&:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  minHeight: 74,
  backgroundColor: '#f8fafc',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1.5),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderTop: '1px solid #e2e8f0',
  background: '#fff',
}));

export default function AdminHome() {
  const [expanded, setExpanded] = React.useState('updates');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          mb: 3,
          borderRadius: 4,
          color: '#fff',
          background: 'linear-gradient(135deg, #082044 0%, #0c4a8f 100%)',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Box
            sx={{
              width: 58,
              height: 58,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,.14)',
            }}
          >
            <PendingActionsIcon sx={{ fontSize: 34 }} />
          </Box>
          <Box>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,.72)', fontWeight: 800 }}>
              Admin dashboard
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
              Review pending publishing requests
            </Typography>
            <Typography sx={{ mt: 1, color: 'rgba(255,255,255,.8)' }}>
              Use this area to validate updates, web content, and event media before they reach the public site.
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {requestSections.map((section) => (
          <Grid item xs={12} md={4} key={section.id}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                p: 2.5,
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                bgcolor: '#f8fafc',
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{ color: '#0c4a8f' }}>{section.icon}</Box>
                <Box>
                  <Typography sx={{ fontWeight: 900 }}>{section.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {section.description}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {requestSections.map((section) => (
        <Accordion
          key={section.id}
          expanded={expanded === section.id}
          onChange={handleChange(section.id)}
        >
          <AccordionSummary aria-controls={`${section.id}-content`} id={`${section.id}-header`}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ color: '#0c4a8f' }}>{section.icon}</Box>
              <Box>
                <Typography sx={{ fontWeight: 900 }}>{section.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {section.description}
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>{section.content}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
