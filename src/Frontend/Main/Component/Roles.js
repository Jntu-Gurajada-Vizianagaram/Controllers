
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
            to:"/admindashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"ADMIN",
            img: AdminImage
        },
        {
            to:"/webadmindashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"WEB ADMIN",
            img: WebAdminimg
        },
        {
            to:"/hoddashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"DIRECTORS",
            img: HODimg
        },
        {
            to:"/Affliatedcollegesdashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:" COLLEGES",
            img: AffliatedCollegesimg
        },
        {
            to:"/Updatesdashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"UPDATES",
            img: Updatesimg
        },

    ],
    Developer:[
        {
            to:"/admindashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"ADMIN",
            img: AdminImage
        },
        {
            to:"/webadmindashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"WEB ADMIN",
            img: WebAdminimg
        },
        {
            to:"/hoddashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"DIRECTORS",
            img: HODimg
        },
        {
            to:"/Affliatedcollegesdashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:" COLLEGES",
            img: AffliatedCollegesimg
        },
        {
            to:"/Updatesdashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"UPDATES",
            img: Updatesimg
        },

    ],
    WebAdmin:[
        {
            to:"/webadmindashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"WEB ADMIN",
            img: WebAdminimg
        },
        {
            to:"/Updatesdashboard",
            icon: <AdminPanelSettingsIcon/>,
            role:"UPDATES",
            img: Updatesimg
        },
    ],
   
    AffliatedColleges:[
        {
            to:"/affliatedcollegesdashboard",
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
};


export default RoleAccess;