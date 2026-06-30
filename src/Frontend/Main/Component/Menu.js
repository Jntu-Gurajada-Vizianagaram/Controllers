import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DescriptionIcon from '@mui/icons-material/Description';
import DevicesIcon from '@mui/icons-material/Devices';
import DoorbellIcon from '@mui/icons-material/Doorbell';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import ImageIcon from '@mui/icons-material/Image';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import QueueIcon from '@mui/icons-material/Queue';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import StorageIcon from '@mui/icons-material/Storage';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

const adminMenu = [
    {
        to: 'admin-home',
        text: 'Dashboard Home',
        icon: <HomeIcon />,
    },
    {
        to: 'all-consoles',
        text: 'Console Management',
        icon: <DevicesIcon />,
    },
    {
        to: 'all-records',
        text: 'Records',
        icon: <StorageIcon />,
    },
    {
        to: 'all-stored-files',
        text: 'Stored Files',
        icon: <StorageIcon />,
    },
    {
        to: 'directors',
        text: 'Directors',
        icon: <DescriptionIcon />,
    },
    {
        to: 'affiliated-college',
        text: 'Affiliated Colleges',
        icon: <DoorbellIcon />,
    },
    {
        to: 'add-new-affliated-college',
        text: 'Add College',
        icon: <QueueIcon />,
    },
    {
        to: 'gallery',
        text: 'Gallery Overview',
        icon: <SlideshowIcon />,
    },
    {
        to: 'galleryimagesupload',
        text: 'News & Event Articles',
        icon: <ImageIcon/>,
    },
    {
        to: 'eventphotosupload',
        text: 'Event Photos',
        icon: <PhotoLibraryIcon />,
    },
    {
        to: 'dmcupload',
        text: 'Carousel Photos',
        icon: <AddPhotoAlternateIcon />,
    },
    {
        to: 'carousel',
        text: 'Carousel Management',
        icon: <ViewCarouselIcon />,
    },
    {
        to: 'updates',
        text: 'Notifications & Updates',
        icon: <DoorbellIcon />,
    },
    {
        to: 'hods',
        text: 'Directorate Uploads',
        icon: <DescriptionIcon />,
    },
    {
        to: 'help',
        text: 'Support',
        icon: <HelpIcon />,
    },
];

const developerMenu = [
    {
        to: 'gallery',
        text: 'Gallery Overview',
        icon: <SlideshowIcon />,
    },
    {
        to: 'galleryimagesupload',
        text: 'News & Event Articles',
        icon: <ImageIcon/>,
    },
    {
        to: 'eventphotosupload',
        text: 'Event Photos',
        icon: <PhotoLibraryIcon />,
    },
    {
        to: 'dmcupload',
        text: 'Carousel Photos',
        icon: <AddPhotoAlternateIcon />,
    },
    {
        to: 'carousel',
        text: 'Carousel Management',
        icon: <ViewCarouselIcon />,
    },
    {
        to: 'updates',
        text: 'Notifications & Updates',
        icon: <DoorbellIcon />,
    },
    {
        to: 'hods',
        text: 'Directorate Uploads',
        icon: <DescriptionIcon />,
    },
    {
        to: 'affiliated-college',
        text: 'Affiliated Colleges',
        icon: <DoorbellIcon />,
    },
    {
        to: 'add-new-affliated-college',
        text: 'Add College',
        icon: <QueueIcon />,
    },
    {
        to: 'help',
        text: 'Support',
        icon: <HelpIcon />,
    },
];

const All_Menu = {
    Admin: adminMenu,
    Developer: developerMenu,
    AffiliatedColleges: [
        {
            to: 'affiliated-college',
            text: "Affiliated Colleges",
            icon: <DoorbellIcon />,
        },
        {
            to: 'add-new-affliated-college',
            text: "Add College",
            icon: <QueueIcon />,
        },
        {
            to: 'help',
            text: "Support",
            icon: <HelpIcon />,
        },
    ],
    WebAdmin: [
        {
            to: 'gallery',
            text: "Gallery Overview",
            icon: <DoorbellIcon />,
        },
       {
            to: 'galleryimagesupload',
            text: "News & Event Articles",
            icon: <ImageIcon/>,
        },
        {
            to: 'eventphotosupload',
            text: "Event Photos",
            icon: <PhotoLibraryIcon />,
        },
        {
            to: 'dmcupload',
            text: "Carousel Photos",
            icon: <AddPhotoAlternateIcon />,
        },
        {
            to: 'carousel',
            text: "Carousel Management",
            icon: <ViewCarouselIcon />,
        },
        {
            to: 'help',
            text: "Support",
            icon: <HelpIcon />,
        }
    ],
    Updates: [
        {
            to: 'updates',
            text: "Notifications & Updates",
            icon: <DoorbellIcon />,
        },
        {
            to: 'help',
            text: "Support",
            icon: <HelpIcon />,
        },
    ],
    Directors: [
        {
            to: 'hods',
            text: 'Directorates',
            icon: <DescriptionIcon />,
        },
        {
            to: 'help',
            text: 'Support',
            icon: <HelpIcon />,
        },
    ],
}

All_Menu.AffliatedColleges = All_Menu.AffiliatedColleges;
All_Menu.RootAdmin = All_Menu.Admin;

export default All_Menu;
