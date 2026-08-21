import {
  FaBell,
  FaBuilding,
  FaChartLine,
  FaColumns,
  FaFileAlt,
  FaHome,
  FaImages,
  FaLink,
  FaPhotoVideo,
  FaQuestionCircle,
  FaSitemap,
  FaUserFriends,
  FaVideo,
} from 'react-icons/fa';

const item = (to, text, icon, group = 'Workspace') => ({ to, text, icon, group });

const coreAdminMenu = [
  item('admin-home', 'Dashboard Home', <FaHome />, 'Overview'),
  item('all-consoles', 'Console Overview', <FaColumns />, 'Overview'),
  item('developer-dashboard', 'API Dashboard', <FaChartLine />, 'Developer'),
  item('site-navigation', 'Site Navigation', <FaLink />, 'Website CMS'),
  item('notification-console', 'Notifications', <FaBell />, 'Content'),
  item('news-console', 'Press Notes', <FaFileAlt />, 'Content'),
  item('youtube-console', 'YouTube', <FaVideo />, 'Content'),
  item('carousel-console', 'Carousel Images', <FaPhotoVideo />, 'Media Management'),
  item('gallery-console', 'Gallery Images', <FaImages />, 'Media Management'),
  item('event-gallery-console', 'Event Albums', <FaImages />, 'Media Management'),
  item('colleges-console', 'Colleges', <FaBuilding />, 'Organization'),
  item('executive-council-console', 'Executive Council', <FaUserFriends />, 'Organization'),
  item('directors', 'Directors', <FaSitemap />, 'Organization'),
  item('help', 'Support', <FaQuestionCircle />, 'Support'),
];

const developerMenu = [
  item('all-consoles', 'Console Overview', <FaColumns />, 'Overview'),
  item('developer-dashboard', 'API Dashboard', <FaChartLine />, 'Developer'),
  item('site-navigation', 'Site Navigation', <FaLink />, 'Website CMS'),
  item('notification-console', 'Notifications', <FaBell />, 'Content'),
  item('news-console', 'Press Notes', <FaFileAlt />, 'Content'),
  item('youtube-console', 'YouTube', <FaVideo />, 'Content'),
  item('carousel-console', 'Carousel Images', <FaPhotoVideo />, 'Media Management'),
  item('gallery-console', 'Gallery Images', <FaImages />, 'Media Management'),
  item('event-gallery-console', 'Event Albums', <FaImages />, 'Media Management'),
  item('colleges-console', 'Colleges', <FaBuilding />, 'Organization'),
  item('executive-council-console', 'Executive Council', <FaUserFriends />, 'Organization'),
  item('help', 'Support', <FaQuestionCircle />, 'Support'),
];

const All_Menu = {
  Admin: coreAdminMenu,
  RootAdmin: coreAdminMenu,
  Developer: developerMenu,
  WebAdmin: [
    item('all-consoles', 'Console Overview', <FaColumns />, 'Overview'),
    item('news-console', 'Press Notes', <FaFileAlt />, 'Content'),
    item('youtube-console', 'YouTube', <FaVideo />, 'Content'),
    item('carousel-console', 'Carousel Images', <FaPhotoVideo />, 'Media Management'),
    item('gallery-console', 'Gallery Images', <FaImages />, 'Media Management'),
    item('event-gallery-console', 'Event Albums', <FaImages />, 'Media Management'),
    item('help', 'Support', <FaQuestionCircle />, 'Support'),
  ],
  Updates: [
    item('site-navigation', 'Site Navigation', <FaLink />, 'Website CMS'),
    item('notification-console', 'Notifications', <FaBell />, 'Content'),
    item('youtube-console', 'YouTube', <FaVideo />, 'Content'),
    item('help', 'Support', <FaQuestionCircle />, 'Support'),
  ],
  AffiliatedColleges: [
    item('colleges-console', 'Colleges', <FaBuilding />, 'Organization'),
    item('help', 'Support', <FaQuestionCircle />, 'Support'),
  ],
  Directors: [
    item('directors', 'Directors', <FaSitemap />, 'Organization'),
    item('profile', 'My Profile', <FaFileAlt />, 'Organization'),
    item('help', 'Support', <FaQuestionCircle />, 'Support'),
  ],
};

All_Menu.AffliatedColleges = All_Menu.AffiliatedColleges;

export default All_Menu;
