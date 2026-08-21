import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import {
  FaBell,
  FaBuilding,
  FaFileAlt,
  FaImages,
  FaLink,
  FaPhotoVideo,
  FaSitemap,
  FaUserFriends,
  FaUserShield,
  FaVideo,
} from 'react-icons/fa';
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
    icon: <FaBell />,
    group: 'Content',
    roles: ['admin', 'developer', 'updates'],
  },
  {
    page: 'carousel-console',
    title: 'Carousel Images',
    description: 'Upload, edit, add, and remove public carousel images.',
    icon: <FaPhotoVideo />,
    group: 'Media Management',
    roles: ['admin', 'developer', 'webadmin'],
  },
  {
    page: 'news-console',
    title: 'Press Notes',
    description: 'Create and maintain press notes and news-style public updates.',
    icon: <FaFileAlt />,
    group: 'Content',
    roles: ['admin', 'developer', 'webadmin'],
  },
  {
    page: 'gallery-console',
    title: 'Gallery Images',
    description: 'Upload, review, and manage public gallery images.',
    icon: <FaImages />,
    group: 'Media Management',
    roles: ['admin', 'developer', 'webadmin'],
  },
  {
    page: 'event-gallery-console',
    title: 'Event Albums',
    description: 'Create, preview, edit, publish, and delete public event photo albums.',
    icon: <FaImages />,
    group: 'Media Management',
    roles: ['admin', 'developer', 'webadmin'],
  },
  {
    page: 'colleges-console',
    title: 'Colleges Console',
    description: 'Manage affiliated colleges and keep constituent/autonomous college sections grouped.',
    icon: <FaBuilding />,
    group: 'Organization',
    roles: ['admin', 'developer', 'affiliatedcolleges', 'affliatedcolleges'],
  },
  {
    page: 'executive-council-console',
    title: 'Executive Council Console',
    description: 'Manage EC members, roles, designations, and university affiliation records.',
    icon: <FaUserFriends />,
    group: 'Organization',
    roles: ['admin', 'developer', 'updates'],
  },
  {
    page: 'youtube-console',
    title: 'YouTube Console',
    description: 'Add video IDs and publish them to the public YouTube section.',
    icon: <FaVideo />,
    group: 'Content',
    roles: ['admin', 'developer', 'webadmin', 'updates'],
  },
  {
    page: 'site-navigation',
    title: 'Site Navigation',
    description: 'Manage all public navigation links, dropdowns, reference keys, and CMS targets.',
    icon: <FaLink />,
    group: 'Website CMS',
    roles: ['admin', 'developer', 'updates'],
  },
  {
    page: 'admin-home',
    title: 'Admin Control',
    description: 'Manage administrator accounts, roles, and approved organizational emails.',
    icon: <FaUserShield />,
    group: 'System',
    roles: ['admin'],
  },
  {
    page: 'directors',
    title: 'Directors',
    description: 'Maintain directorate profiles and director records.',
    icon: <FaSitemap />,
    group: 'Organization',
    roles: ['admin'],
  },
];

const groupOrder = ['Website CMS', 'Content', 'Media Management', 'Organization', 'System'];

const groupSections = (sections = []) =>
  groupOrder
    .map((group) => ({
      group,
      sections: sections.filter((section) => section.group === group),
    }))
    .filter((entry) => entry.sections.length);

const AllCrudControls = () => {
  const user = useAuth();
  const visibleSections = useMemo(
    () => consoleSections.filter((section) => canViewSection(user?.role, section.page, section.roles)),
    [user?.role],
  );
  const groupedSections = useMemo(() => groupSections(visibleSections), [visibleSections]);

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

      <Box className="console-management-groups">
        {groupedSections.map((group) => (
          <Box className="console-management-group" key={group.group}>
            <Typography className="console-management-group-title">{group.group}</Typography>
            <Box className="console-management-card-grid">
              {group.sections.map((section) => (
                <Card key={section.page} className="console-management-card">
                  <CardContent>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <Box className="console-management-icon">{section.icon}</Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#111827' }}>{section.title}</Typography>
                        <Typography variant="body2" sx={{ color: '#475569', mt: 0.5 }}>{section.description}</Typography>
                      </Box>
                    </Stack>
                    <Button component={RouterLink} to={`/dashboard/${section.page}`} variant="contained" sx={{ mt: 2, borderRadius: 1.5 }}>
                      Open Console
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AllCrudControls;
