import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
import {
  FaBell,
  FaBuilding,
  FaChartLine,
  FaFileAlt,
  FaImages,
  FaLink,
  FaPhotoVideo,
  FaUserFriends,
  FaVideo,
} from 'react-icons/fa';

const consoleSections = [
  {
    title: 'Notifications',
    description: 'Create, edit, revise, expire, and remove public notifications.',
    icon: <FaBell />,
    to: '/dashboard/notification-console',
  },
  {
    title: 'Press Notes',
    description: 'Publish press notes with uploaded source documents and extracted content.',
    icon: <FaFileAlt />,
    to: '/dashboard/news-console',
  },
  {
    title: 'Carousel Images',
    description: 'Manage homepage carousel visibility through one media endpoint set.',
    icon: <FaPhotoVideo />,
    to: '/dashboard/carousel-console',
  },
  {
    title: 'Gallery Images',
    description: 'Maintain public gallery records and image metadata.',
    icon: <FaImages />,
    to: '/dashboard/gallery-console',
  },
  {
    title: 'Event Albums',
    description: 'Upload, edit, and delete event photo albums directly.',
    icon: <FaImages />,
    to: '/dashboard/event-gallery-console',
  },
  {
    title: 'Site Navigation',
    description: 'Control menu links, dropdowns, reference keys, and CMS targets.',
    icon: <FaLink />,
    to: '/dashboard/site-navigation',
  },
  {
    title: 'YouTube',
    description: 'Manage public video embeds used by the website.',
    icon: <FaVideo />,
    to: '/dashboard/youtube-console',
  },
  {
    title: 'Colleges',
    description: 'Maintain affiliated college records from the organization console.',
    icon: <FaBuilding />,
    to: '/dashboard/colleges-console',
  },
  {
    title: 'Executive Council',
    description: 'Manage the university Executive Council roster, roles, designations, and affiliations.',
    icon: <FaUserFriends />,
    to: '/dashboard/executive-council-console',
  },
  {
    title: 'API Dashboard',
    description: 'View API docs, traffic, response spikes, and route groups.',
    icon: <FaChartLine />,
    to: '/dashboard/developer-dashboard',
  },
];

export default function AdminHome() {
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          mb: 2,
          borderRadius: 2,
          color: '#fff',
          background: 'linear-gradient(135deg, #082044 0%, #0c4a8f 100%)',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,.14)',
            }}
          >
            <FaChartLine size={18} />
          </Box>
          <Box>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,.72)', fontWeight: 800, fontSize: '0.68rem' }}>
              Admin dashboard
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1.1, fontSize: { xs: '1.15rem', md: '1.25rem' } }}>
              Direct content management
            </Typography>
            <Typography sx={{ mt: 0.75, color: 'rgba(255,255,255,.8)', fontSize: '0.84rem' }}>
              Requests and approval queues have been removed. Authorized users now publish and update records through their assigned CRUD consoles.
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={2}>
        {consoleSections.map((section) => (
          <Grid item xs={12} md={6} xl={4} key={section.title}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                p: 2,
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                bgcolor: '#ffffff',
              }}
            >
              <Stack spacing={1.5} sx={{ height: '100%' }}>
                <Stack direction="row" spacing={1.25} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      display: 'grid',
                      placeItems: 'center',
                      flex: '0 0 auto',
                      borderRadius: 1.5,
                      color: '#0c4a8f',
                      bgcolor: '#e8f2ff',
                    }}
                  >
                    {React.cloneElement(section.icon, { size: 15 })}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 900, fontSize: '0.88rem' }}>{section.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      {section.description}
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  component={RouterLink}
                  to={section.to}
                  variant="contained"
                  sx={{
                    mt: 'auto',
                    alignSelf: 'flex-start',
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontWeight: 800,
                    fontSize: '0.76rem',
                    minHeight: 32,
                    boxShadow: 'none',
                  }}
                >
                  Open Console
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
