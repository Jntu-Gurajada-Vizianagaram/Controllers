import DoorbellIcon from '@mui/icons-material/Doorbell';
import QueueIcon from '@mui/icons-material/Queue';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HomeIcon from '@mui/icons-material/Home';
import DevicesIcon from '@mui/icons-material/Devices';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import HelpIcon from '@mui/icons-material/Help';

const All_Menu = {
    Admin:[
        {
            to:'admin-home',
            text:"HOME",
            icon:<HomeIcon />,
        },
        {
            to:'all-consoles',
            text:"All Consoles",
            icon:<DevicesIcon/>,
        },
        {
            to:'all-records',
            text:"All Records",
            icon:<DescriptionIcon/>,
        },
        {
            to:'all-stored-files',
            text:"All Database Files",
            icon:<StorageIcon/>,
        },
        {
            to:'gallery',
            text:"WebAdmin Carousel ",
            icon:<SlideshowIcon/>,
        },
        {
            to:'eventphotosupload   ',
            text:"Add Event Photos",
            icon:<PhotoLibraryIcon/>,
        },
        {
            to:'dmcupload',
            text:"Add New Photo",
            icon:<AddPhotoAlternateIcon/>,
        },
        {
            to:'carousel',
            text:"Carousel",
            icon:<ViewCarouselIcon/>,
        },
        {
            to:'help',
            text:"Help",
            icon:<HelpIcon/>,
        },
    ],
    Developer:[
        {
            to:'admin-home',
            text:"HOME",
            icon:<HomeIcon />,
        },
        {
            to:'all-consoles',
            text:"All Consoles",
            icon:<DevicesIcon/>,
        },
        {
            to:'all-records',
            text:"All Records",
            icon:<DescriptionIcon/>,
        },
        {
            to:'all-stored-files',
            text:"All Database Files",
            icon:<StorageIcon/>,
        },
        {
            to:'gallery',
            text:"WebAdmin Carousel ",
            icon:<SlideshowIcon/>,
        },
        {
            to:'eventphotosupload   ',
            text:"Add Event Photos",
            icon:<PhotoLibraryIcon/>,
        },
        {
            to:'dmcupload',
            text:"Add New Photo",
            icon:<AddPhotoAlternateIcon/>,
        },
        {
            to:'carousel',
            text:"Carousel",
            icon:<ViewCarouselIcon/>,
        },
        {
            to:'help',
            text:"Help",
            icon:<HelpIcon/>,
        },
    ],

    AffliatedColleges:[
        {
            to:'affiliated-college',
            text:"Affiliated Colleges",
            icon:<DoorbellIcon/>,
        },
        {
            to:'add-new-affliated-college',
            text:"Add New College",
            icon:<QueueIcon/>,
        },
       
        {
            to:'help',
            text:"Help",
            icon:<HelpIcon/>,
        },
    ],
    WebAdmin:[
        {
            to:'gallery',
            text:"Affiliated Colleges",
            icon:<DoorbellIcon/>,
        },
        {
            to:'dmcupload',
            text:"Add New College",
            icon:<QueueIcon/>,
        },
        {
            to:'carousel',
            text:"Add New College",
            icon:<QueueIcon/>,
        },
       
        {
            to:'help',
            text:"Help",
            icon:<HelpIcon/>,
        },
    ],
    Updates:[
        {
            to:'updates',
            text:"Affiliated Colleges",
            icon:<DoorbellIcon/>,
        },
        // {
        //     to:'dmcupload',
        //     text:"Add New College",
        //     icon:<QueueIcon/>,
        // },
       
        {
            to:'help',
            text:"Help",
            icon:<HelpIcon/>,
        },
    ],
}

export default All_Menu