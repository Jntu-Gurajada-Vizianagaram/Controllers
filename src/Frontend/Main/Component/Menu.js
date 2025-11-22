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

const All_Menu = {
    Admin: [
        {
            to: 'admin-home',
            text: "HOME",
            icon: <HomeIcon />,
        },
        {
            to: 'all-consoles',
            text: "All Consoles",
            icon: <DevicesIcon />,
        },
        {
            to: 'all-records',
            text: "All Records",
            icon: <StorageIcon />,
        },
        // {
        //     to: 'all-stored-files',
        //     text: "All Database Files",
        //     icon: <StorageIcon />,
        // },
        {
            to: 'gallery',
            text: "View Carousal",
            icon: <SlideshowIcon />,
        },
        {
            to: 'galleryimagesupload',
            text: "Add News and Event Articles ",
            icon: <ImageIcon/>,
        },
        {
            to: 'eventphotosupload',
            text: "Add Event Photos",
            icon: <PhotoLibraryIcon />,
        },
        {
            to: 'dmcupload',
            text: "Add New Carousal Photo",
            icon: <AddPhotoAlternateIcon />,
        },
        {
            to: 'carousel',
            text: "Carsusal Management",
            icon: <ViewCarouselIcon />,
        },
        {
            to: 'help',
            text: "Help",
            icon: <HelpIcon />,
        },
    ],
    Developer: [
        {
            to: 'admin-home',
            text: "HOME",
            icon: <HomeIcon />,
        },
        {
            to: 'all-consoles',
            text: "All Consoles",
            icon: <DevicesIcon />,
        },
        {
            to: 'all-records',
            text: "All Records",
            icon: <StorageIcon />,
        },
        // {
        //     to: 'all-stored-files',
        //     text: "All Database Files",
        //     icon: <StorageIcon />,
        // },
       {
            to: 'galleryimagesupload',
            text: "Add News and Event Articles ",
            icon: <ImageIcon/>,
        },
        {
            to: 'eventphotosupload',
            text: "Add Event Photos",
            icon: <PhotoLibraryIcon />,
        },
        {
            to: 'dmcupload',
            text: "Add New Carousal Photo",
            icon: <AddPhotoAlternateIcon />,
        },
        {
            to: 'carousel',
            text: "Carsusal Management",
            icon: <ViewCarouselIcon />,
        },
        {
            to: 'help',
            text: "Help",
            icon: <HelpIcon />,
        },
    ],
    AffiliatedColleges: [
        {
            to: 'affiliated-college',
            text: "Affiliated Colleges",
            icon: <DoorbellIcon />,
        },
        {
            to: 'add-new-affiliated-college',
            text: "Add New College",
            icon: <QueueIcon />,
        },
        {
            to: 'help',
            text: "Help",
            icon: <HelpIcon />,
        },
    ],
    WebAdmin: [
        {
            to: 'gallery',
            text: "View Gallery",
            icon: <DoorbellIcon />,
        },
       {
            to: 'galleryimagesupload',
            text: "Add News and Event Articles ",
            icon: <ImageIcon/>,
        },
        {
            to: 'eventphotosupload',
            text: "Add Event Photos",
            icon: <PhotoLibraryIcon />,
        },
        {
            to: 'dmcupload',
            text: "Add New Carousal Photo",
            icon: <AddPhotoAlternateIcon />,
        },
        {
            to: 'carousel',
            text: "Carsusal Management",
            icon: <ViewCarouselIcon />,
        },
        {
            to: 'help',
            text: "Help",
            icon: <HelpIcon />,
        }
    ],
    Updates: [
        {
            to: 'updates',
            text: "Affiliated Colleges",
            icon: <DoorbellIcon />,
        },
        {
            to: 'help',
            text: "Help",
            icon: <HelpIcon />,
        },
    ],
}

export default All_Menu;
