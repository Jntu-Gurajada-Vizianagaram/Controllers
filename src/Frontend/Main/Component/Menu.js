import DoorbellIcon from '@mui/icons-material/Doorbell';
import QueueIcon from '@mui/icons-material/Queue';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const All_Menu = {
    Admin:[
        {
            to:'admin-home',
            text:"HOME",
            icon:<DoorbellIcon/>,
        },
        {
            to:'all-consoles',
            text:"All Consoles",
            icon:<QueueIcon/>,
        },
        {
            to:'all-records',
            text:"All Records",
            icon:<FileCopyIcon/>,
        },
        {
            to:'all-stored-files',
            text:"All Database Files",
            icon:<FileCopyIcon/>,
        },
        {
            to:'help',
            text:"Help",
            icon:<DoorbellIcon/>,
        },
    ],
    Developer:[
        {
            to:'admin-home',
            text:"HOME",
            icon:<DoorbellIcon/>,
        },
        {
            to:'all-consoles',
            text:"All Consoles",
            icon:<QueueIcon/>,
        },
        {
            to:'all-records',
            text:"All Records",
            icon:<FileCopyIcon/>,
        },
        {
            to:'all-stored-files',
            text:"All Database Files",
            icon:<FileCopyIcon/>,
        },
        {
            to:'gallery',
            text:"WebAdmin Carousel ",
            icon:<DoorbellIcon/>,
        },
        {
            to:'dmcupload',
            text:"Add New Photo",
            icon:<QueueIcon/>,
        },
        {
            to:'carousel',
            text:"Carousel",
            icon:<QueueIcon/>,
        },
        {
            to:'help',
            text:"Help",
            icon:<DoorbellIcon/>,
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
            icon:<DoorbellIcon/>,
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
            icon:<DoorbellIcon/>,
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
            icon:<DoorbellIcon/>,
        },
    ],
}

export default All_Menu