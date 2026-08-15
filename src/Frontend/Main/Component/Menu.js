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

const item = (to, text, icon, group = 'Workspace') => ({ to, text, icon, group });

const coreAdminMenu = [
  item('admin-home', 'Dashboard Home', <HomeIcon />, 'Overview'),
  item('all-consoles', 'Console Overview', <DevicesIcon />, 'Overview'),
  item('site-navigation', 'Site Navigation', <LinkIcon />, 'Website CMS'),
  item('notification-console', 'Notifications', <DoorbellIcon />, 'Content'),
  item('news-console', 'Press Notes', <DescriptionIcon />, 'Content'),
  item('youtube-console', 'YouTube', <VideoLibraryIcon />, 'Content'),
  item('carousel-console', 'Carousel', <SlideshowIcon />, 'Media'),
  item('gallery-console', 'Gallery', <CollectionsIcon />, 'Media'),
  item('event-gallery-console', 'Event Gallery', <CollectionsIcon />, 'Media'),
  item('colleges-console', 'Colleges', <ApartmentIcon />, 'Organization'),
  item('directors', 'Directors', <DescriptionIcon />, 'Organization'),
  item('hods', 'Directorate Uploads', <DescriptionIcon />, 'Organization'),
  item('help', 'Support', <HelpIcon />, 'Support'),
];

const developerMenu = [
  item('all-consoles', 'Console Overview', <DashboardIcon />, 'Overview'),
  item('site-navigation', 'Site Navigation', <LinkIcon />, 'Website CMS'),
  item('notification-console', 'Notifications', <DoorbellIcon />, 'Content'),
  item('news-console', 'Press Notes', <DescriptionIcon />, 'Content'),
  item('youtube-console', 'YouTube', <VideoLibraryIcon />, 'Content'),
  item('carousel-console', 'Carousel', <SlideshowIcon />, 'Media'),
  item('gallery-console', 'Gallery', <CollectionsIcon />, 'Media'),
  item('event-gallery-console', 'Event Gallery', <CollectionsIcon />, 'Media'),
  item('colleges-console', 'Colleges', <ApartmentIcon />, 'Organization'),
  item('hods', 'Directorate Uploads', <DescriptionIcon />, 'Organization'),
  item('help', 'Support', <HelpIcon />, 'Support'),
];

const All_Menu = {
  Admin: coreAdminMenu,
  RootAdmin: coreAdminMenu,
  Developer: developerMenu,
  WebAdmin: [
    item('all-consoles', 'Console Overview', <DashboardIcon />, 'Overview'),
    item('news-console', 'Press Notes', <DescriptionIcon />, 'Content'),
    item('youtube-console', 'YouTube', <VideoLibraryIcon />, 'Content'),
    item('carousel-console', 'Carousel', <SlideshowIcon />, 'Media'),
    item('gallery-console', 'Gallery', <CollectionsIcon />, 'Media'),
    item('event-gallery-console', 'Event Gallery', <CollectionsIcon />, 'Media'),
    item('help', 'Support', <HelpIcon />, 'Support'),
  ],
  Updates: [
    item('site-navigation', 'Site Navigation', <LinkIcon />, 'Website CMS'),
    item('notification-console', 'Notifications', <DoorbellIcon />, 'Content'),
    item('youtube-console', 'YouTube', <VideoLibraryIcon />, 'Content'),
    item('help', 'Support', <HelpIcon />, 'Support'),
  ],
  AffiliatedColleges: [
    item('colleges-console', 'Colleges', <ApartmentIcon />, 'Organization'),
    item('help', 'Support', <HelpIcon />, 'Support'),
  ],
  Directors: [
    item('hods', 'Directorates', <DescriptionIcon />, 'Organization'),
    item('help', 'Support', <HelpIcon />, 'Support'),
  ],
};

All_Menu.AffliatedColleges = All_Menu.AffiliatedColleges;

export default All_Menu;
