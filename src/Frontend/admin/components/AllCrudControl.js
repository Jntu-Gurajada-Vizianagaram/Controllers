import ApartmentIcon from '@mui/icons-material/Apartment';
import CollectionsIcon from '@mui/icons-material/Collections';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../Authentications/AuthContext';
import { canAccessPage, normalizeRole } from '../../Authentications/accessControl';
import '../css/ConsoleManagement.css';

const canViewSection = (role, page, roles = []) => {
  const normalizedRole = normalizeRole(role);
  return normalizedRole === 'rootadmin' || roles.includes(normalizedRole) || canAccessPage(role, page);
};

const consoleSections = [
  {
    page: 'notification-console',
    title: 'Notification Console',
    description: 'Create, edit, publish, scroll, archive, and manage public notifications.',
    icon: <NotificationsActiveIcon />,
    roles: ['admin', 'developer', 'updates'],
  },
  {
    page: 'carousel-console',
    title: 'Carousel Console',
    description: 'Upload, edit, add, and remove public carousel images.',
    icon: <SlideshowIcon />,
    roles: ['admin', 'developer', 'webadmin'],
  },
  {
    page: 'news-console',
    title: 'Press Notes',
    description: 'Create and maintain press notes and news-style public updates.',
    icon: <DescriptionIcon />,
    roles: ['admin', 'developer', 'webadmin'],
  },
  {
    page: 'gallery-console',
    title: 'Gallery Console',
    description: 'Upload, review, and manage public gallery images.',
    icon: <CollectionsIcon />,
    roles: ['admin', 'developer', 'webadmin'],
  },
  {
    page: 'event-gallery-console',
    title: 'Event Gallery',
    description: 'Bulk upload photo albums for a particular event.',
    icon: <CollectionsIcon />,
    roles: ['admin', 'developer', 'webadmin'],
  },
  {
    page: 'colleges-console',
    title: 'Colleges Console',
    description: 'Manage affiliated colleges and keep constituent/autonomous college sections grouped.',
    icon: <ApartmentIcon />,
    roles: ['admin', 'developer', 'affiliatedcolleges', 'affliatedcolleges'],
  },
  {
    page: 'youtube-console',
    title: 'YouTube Console',
    description: 'Add video IDs and publish them to the public YouTube section.',
    icon: <VideoLibraryIcon />,
    roles: ['admin', 'developer', 'webadmin', 'updates'],
  },
  {
    page: 'site-navigation',
    title: 'Site Navigation',
    description: 'Manage public website navbar links and highlighted menu items.',
    icon: <LinkIcon />,
    roles: ['admin', 'developer', 'updates'],
  },
  {
    page: 'admin-home',
    title: 'Admin Control',
    description: 'Manage administrator accounts, roles, and approved organizational emails.',
    icon: <ManageAccountsIcon />,
    roles: ['admin'],
  },
  {
    page: 'directors',
    title: 'Directors',
    description: 'Maintain directorate profiles and director records.',
    icon: <PeopleAltIcon />,
    roles: ['admin'],
  },
  {
    page: 'hods',
    title: 'Directorate Uploads',
    description: 'Manage directorate/HOD upload sections.',
    icon: <DescriptionIcon />,
    roles: ['admin', 'developer', 'directors'],
  },
];

const AllCrudControls = () => {
  const user = useAuth();
  const visibleSections = useMemo(
    () => consoleSections.filter((section) => canViewSection(user?.role, section.page, section.roles)),
    [user?.role],
  );

  return (
    <Box className="console-management-page">
      <Box className="console-management-hero">
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" spacing={2}>
          <Box>
            <Typography className="console-management-eyebrow">Role based workspace</Typography>
            <Typography variant="h4" className="console-management-title">Console Overview</Typography>
            <Typography className="console-management-subtitle">
              Each card opens one complete console. The older split pages are still preserved as route aliases.
            </Typography>
          </Box>
          <Chip label={`${visibleSections.length} consoles`} className="console-management-chip" />
        </Stack>
      </Box>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {visibleSections.map((section) => (
          <Card key={section.page} sx={{ borderRadius: 4, border: '1px solid #dbe4f0', boxShadow: '0 12px 32px rgba(15,23,42,.07)' }}>
            <CardContent>
              <Box className="console-management-icon" sx={{ mb: 1 }}>{section.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#111827' }}>{section.title}</Typography>
              <Typography variant="body2" sx={{ color: '#475569', minHeight: 58, mt: 1 }}>{section.description}</Typography>
              <Button component={RouterLink} to={`/dashboard/${section.page}`} variant="contained" sx={{ mt: 2, borderRadius: 999 }}>
                Open Console
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AllCrudControls;
