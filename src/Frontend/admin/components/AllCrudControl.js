import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CollectionsIcon from '@mui/icons-material/Collections';
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SchoolIcon from '@mui/icons-material/School';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useMemo, useState } from 'react';
import { useAuth } from '../../Authentications/AuthContext';
import { normalizeRole } from '../../Authentications/accessControl';
import AffiliatedColleges from '../../affliated_colleges/components/AffliatedColleges';
import CarouselDisplay from '../../dmc/components/CarouselDisplay';
import DMCUpload from '../../dmc/components/DmcIMGUpload';
import EventPhotosUpload from '../../dmc/components/EventPhotosUpload';
import GalleryImagesUpload from '../../dmc/components/GalleryImagesUpload';
import HODS from '../../hods/components/HODS';
import AdminsCRUDControl from './AdminCRUDControl';
import DirectorsCRUDControl from './DirectorsCRUDControl';
import UpdateCRUD from './UpdateCRUDControl';
import '../css/ConsoleManagement.css';

const canViewSection = (role, roles) => {
  const normalizedRole = normalizeRole(role);
  return normalizedRole === 'rootadmin' || roles.includes(normalizedRole);
};

const consoleSections = [
  {
    id: 'notifications',
    title: 'Notifications Console',
    description: 'Create, edit, and manage public notifications and update records.',
    icon: <NotificationsActiveIcon />,
    roles: ['admin', 'developer', 'updates'],
    content: <UpdateCRUD />,
  },
  {
    id: 'admins',
    title: 'Admin CRUD',
    description: 'Manage administrator accounts, roles, and approved organizational emails.',
    icon: <ManageAccountsIcon />,
    roles: ['admin'],
    content: <AdminsCRUDControl />,
  },
  {
    id: 'directors',
    title: 'Directors CRUD',
    description: 'Maintain directorate profiles and director records.',
    icon: <PeopleAltIcon />,
    roles: ['admin'],
    content: <DirectorsCRUDControl />,
  },
  {
    id: 'carousel-overview',
    title: 'Carousel Management',
    description: 'Review carousel images and control carousel visibility.',
    icon: <SlideshowIcon />,
    roles: ['admin', 'developer', 'webadmin'],
    content: <CarouselDisplay />,
  },
  {
    id: 'carousel-uploads',
    title: 'Carousel Photo Uploads',
    description: 'Add or update carousel photo entries.',
    icon: <AddPhotoAlternateIcon />,
    roles: ['admin', 'developer', 'webadmin'],
    content: <DMCUpload />,
  },
  {
    id: 'event-photos',
    title: 'Event Photos',
    description: 'Upload and maintain event photo collections.',
    icon: <PhotoLibraryIcon />,
    roles: ['admin', 'developer', 'webadmin'],
    content: <EventPhotosUpload />,
  },
  {
    id: 'gallery-articles',
    title: 'News & Event Articles',
    description: 'Upload gallery images and event article content.',
    icon: <CollectionsIcon />,
    roles: ['admin', 'developer', 'webadmin'],
    content: <GalleryImagesUpload />,
  },
  {
    id: 'affiliated-colleges',
    title: 'Affiliated Colleges',
    description: 'Manage affiliated college records.',
    icon: <SchoolIcon />,
    roles: ['admin', 'developer', 'affiliatedcolleges', 'affliatedcolleges'],
    content: <AffiliatedColleges />,
  },
  {
    id: 'directorate-uploads',
    title: 'Directorate Uploads',
    description: 'Manage directorate/HOD upload sections.',
    icon: <DescriptionIcon />,
    roles: ['admin', 'developer', 'directors'],
    content: <HODS />,
  },
];

const AllCrudControls = () => {
  const user = useAuth();
  const visibleSections = useMemo(
    () => consoleSections.filter((section) => canViewSection(user?.role, section.roles)),
    [user?.role],
  );
  const [expandedPanel, setExpandedPanel] = useState(visibleSections[0]?.id || null);

  React.useEffect(() => {
    if (!visibleSections.some((section) => section.id === expandedPanel)) {
      setExpandedPanel(visibleSections[0]?.id || null);
    }
  }, [expandedPanel, visibleSections]);

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
              Role based workspace
            </Typography>
            <Typography variant="h4" className="console-management-title">
              All Consoles
            </Typography>
            <Typography className="console-management-subtitle">
              Only consoles approved for your role are shown here. Admin CRUD remains restricted to Admin and RootAdmin.
            </Typography>
          </Box>
          <Chip
            label={`${visibleSections.length} consoles`}
            className="console-management-chip"
          />
        </Stack>
      </Box>

      <Box className="console-management-accordions">
        {visibleSections.map((section) => (
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
