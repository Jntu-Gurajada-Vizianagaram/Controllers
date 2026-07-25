import ApartmentIcon from '@mui/icons-material/Apartment';
import CollectionsIcon from '@mui/icons-material/Collections';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import DevicesIcon from '@mui/icons-material/Devices';
import DoorbellIcon from '@mui/icons-material/Doorbell';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const coreAdminMenu = [
  { to: 'admin-home', text: 'Dashboard Home', icon: <HomeIcon /> },
  { to: 'all-consoles', text: 'Console Overview', icon: <DevicesIcon /> },
  { to: 'notification-console', text: 'Notification Console', icon: <DoorbellIcon /> },
  { to: 'carousel-console', text: 'Carousel Console', icon: <SlideshowIcon /> },
  { to: 'gallery-console', text: 'Gallery Console', icon: <CollectionsIcon /> },
  { to: 'event-gallery-console', text: 'Event Gallery', icon: <CollectionsIcon /> },
  { to: 'news-console', text: 'Press Notes', icon: <DescriptionIcon /> },
  { to: 'colleges-console', text: 'Colleges Console', icon: <ApartmentIcon /> },
  { to: 'youtube-console', text: 'YouTube Console', icon: <VideoLibraryIcon /> },
  { to: 'site-navigation', text: 'Site Navigation', icon: <LinkIcon /> },
  { to: 'directors', text: 'Directors', icon: <DescriptionIcon /> },
  { to: 'hods', text: 'Directorate Uploads', icon: <DescriptionIcon /> },
  { to: 'help', text: 'Support', icon: <HelpIcon /> },
];

const developerMenu = [
  { to: 'all-consoles', text: 'Console Overview', icon: <DashboardIcon /> },
  { to: 'notification-console', text: 'Notification Console', icon: <DoorbellIcon /> },
  { to: 'carousel-console', text: 'Carousel Console', icon: <SlideshowIcon /> },
  { to: 'gallery-console', text: 'Gallery Console', icon: <CollectionsIcon /> },
  { to: 'event-gallery-console', text: 'Event Gallery', icon: <CollectionsIcon /> },
  { to: 'news-console', text: 'Press Notes', icon: <DescriptionIcon /> },
  { to: 'colleges-console', text: 'Colleges Console', icon: <ApartmentIcon /> },
  { to: 'youtube-console', text: 'YouTube Console', icon: <VideoLibraryIcon /> },
  { to: 'site-navigation', text: 'Site Navigation', icon: <LinkIcon /> },
  { to: 'hods', text: 'Directorate Uploads', icon: <DescriptionIcon /> },
  { to: 'help', text: 'Support', icon: <HelpIcon /> },
];

const All_Menu = {
  Admin: coreAdminMenu,
  RootAdmin: coreAdminMenu,
  Developer: developerMenu,
  WebAdmin: [
    { to: 'all-consoles', text: 'Console Overview', icon: <DashboardIcon /> },
    { to: 'carousel-console', text: 'Carousel Console', icon: <SlideshowIcon /> },
    { to: 'gallery-console', text: 'Gallery Console', icon: <CollectionsIcon /> },
    { to: 'event-gallery-console', text: 'Event Gallery', icon: <CollectionsIcon /> },
    { to: 'news-console', text: 'Press Notes', icon: <DescriptionIcon /> },
    { to: 'youtube-console', text: 'YouTube Console', icon: <VideoLibraryIcon /> },
    { to: 'help', text: 'Support', icon: <HelpIcon /> },
  ],
  Updates: [
    { to: 'notification-console', text: 'Notification Console', icon: <DoorbellIcon /> },
    { to: 'youtube-console', text: 'YouTube Console', icon: <VideoLibraryIcon /> },
    { to: 'site-navigation', text: 'Site Navigation', icon: <LinkIcon /> },
    { to: 'help', text: 'Support', icon: <HelpIcon /> },
  ],
  AffiliatedColleges: [
    { to: 'colleges-console', text: 'Colleges Console', icon: <ApartmentIcon /> },
    { to: 'help', text: 'Support', icon: <HelpIcon /> },
  ],
  Directors: [
    { to: 'hods', text: 'Directorates', icon: <DescriptionIcon /> },
    { to: 'help', text: 'Support', icon: <HelpIcon /> },
  ],
};

All_Menu.AffliatedColleges = All_Menu.AffiliatedColleges;

export default All_Menu;
