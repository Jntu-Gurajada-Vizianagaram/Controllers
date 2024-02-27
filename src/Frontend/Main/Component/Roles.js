
//icons//
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

//images//
import AdminImage from "../media/AdminImage.png";
import AffliatedCollegesimg from "../media/AffliatedColleges.png";
import HODimg from "../media/HOD.png";
import Updatesimg from "../media/Updates.png";
import WebAdminimg from "../media/WebAdmin.png";


// roles and their access//
const RoleAccess = {
    Admin:[
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"ADMIN",
            img: AdminImage
        },
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"WEB ADMIN",
            img: WebAdminimg
        },
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"DIRECTORS",
            img: HODimg
        },
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:" COLLEGES",
            img: AffliatedCollegesimg
        },
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"UPDATES",
            img: Updatesimg
        },

    ],
    Developer:[
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"ADMIN",
            img: AdminImage
        },
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"WEB ADMIN",
            img: WebAdminimg
        },
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"DIRECTORS",
            img: HODimg
        },
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:" COLLEGES",
            img: AffliatedCollegesimg
        },
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"UPDATES",
            img: Updatesimg
        },

    ],
    WebAdmin:[
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"WEB ADMIN",
            img: WebAdminimg
        },
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"UPDATES",
            img: Updatesimg
        },
    ],
   
    AffliatedColleges:[
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"Affliated Colleges",
            img: AffliatedCollegesimg
        },
        {
            to:"/collegeslogin",
            icon: <AdminPanelSettingsIcon/>,
            role:"Click To Login as College Admin",
            img: AdminImage
        },
    ],
    Updates:[
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"Updates Admin",
            img: Updatesimg
        },
        // {
        //     to:"/collegeslogin",
        //     icon: <AdminPanelSettingsIcon/>,
        //     role:"Click To Login as College Admin",
        //     img: AdminImage
        // },
    ],
    Directors:[
        {
            to:"/dashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"Directors",
            img: HODimg
        },
        // {
        //     to:"/collegeslogin",
        //     icon: <AdminPanelSettingsIcon/>,
        //     role:"Click To Login as College Admin",
        //     img: AdminImage
        // },
    ],
};


export default RoleAccess;