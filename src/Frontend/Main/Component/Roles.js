
//icons//
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

//images//
import AdminImage from "../media/AdminImage.png";
import AffliatedCollegesimg from "../media/AffliatedColleges.png";
import HODimg from "../media/HOD.png";
import Updatesimg from "../media/Updates.png";
import WebAdminimg from "../media/WebAdmin.png";
import mods from './Logins/Login';

// roles and their access//
var adminrole = null
if (mods.uds){
    adminrole=mods.uds.role
}
const RoleAccess = {
    Admin:[
        {
            to:`/dashboard/${adminrole}/admindashboard`,
            page:`admindashboard`,
            icon: <AdminPanelSettingsIcon/>,
            role:"ADMIN",
            img: AdminImage
        },
        {
            to:`/dashboard/${adminrole}/webadmindashboard`,
            page:`webadmindashboard`,
            icon: <AdminPanelSettingsIcon/>,
            role:`WEB ADMIN`,
            img: WebAdminimg
        },
        {
            to:`/dashboard/${adminrole}/directorsdashboard`,
            page:`directorsdashboard`,
            icon: <AdminPanelSettingsIcon/>,
            role:`DIRECTORS`,
            img: HODimg
        },
        {
            to:`/dashboard/${adminrole}/collegesdashboard`,
            page:`collegesdashboard`,
            icon: <AdminPanelSettingsIcon/>,
            role:` COLLEGES`,
            img: AffliatedCollegesimg
        },
        {
            to:`/dashboard/${adminrole}/updatesdashboard`,
            page:`updatesdashboard`,
            icon: <AdminPanelSettingsIcon/>,
            role:`UPDATES`,
            img: Updatesimg
        },

    ],
    Developer: [
        {
            to: `/dashboard/${adminrole}/admindashboard`,
            page: `admindashboard`,
            icon: <AdminPanelSettingsIcon />,
            role: "ADMIN",
            img: AdminImage
        },
        {
            to: `/dashboard/${adminrole}/webadmindashboard`,
            page: `webadmindashboard`,
            icon: <AdminPanelSettingsIcon />,
            role: `WEB ADMIN`,
            img: WebAdminimg
        },
        {
            to: `/dashboard/${adminrole}/directorsdashboard`,
            page: `directorsdashboard`,
            icon: <AdminPanelSettingsIcon />,
            role: `DIRECTORS`,
            img: HODimg
        },
        {
            to: `/dashboard/${adminrole}/collegesdashboard`,
            page: `collegesdashboard`,
            icon: <AdminPanelSettingsIcon />,
            role: ` COLLEGES`,
            img: AffliatedCollegesimg
        },
        {
            to: `/dashboard/${adminrole}/updatesdashboard`,
            page: `updatesdashboard`,
            icon: <AdminPanelSettingsIcon />,
            role: `UPDATES`,
            img: Updatesimg
        },
    ],
    WebAdmin: [
        {
            to: `/dashboard/${adminrole}/webadmindashboard`,
            page: `webadmindashboard`,
            icon: <AdminPanelSettingsIcon />,
            role: `WEB ADMIN`,
            img: WebAdminimg
        },
        {
            to: `/dashboard/${adminrole}/updatesdashboard`,
            page: `updatesdashboard`,
            icon: <AdminPanelSettingsIcon />,
            role: `UPDATES`,
            img: Updatesimg
        },
    ],
   
    AffliatedColleges: [
        {
            to: `/dashboard/${adminrole}/affliatedcollegesdashboard`,
            page: `affliatedcollegesdashboard`,
            icon: <AdminPanelSettingsIcon />,
            role: `Affliated Colleges`,
            img: AffliatedCollegesimg
        },
        {
            to: `/collegeslogin`,
            icon: <AdminPanelSettingsIcon />,
            role: `Click To Login as College Admin`,
            img: AdminImage
        },
    ],
    Updates: [
        {
            to: `/dashboard/${adminrole}/updatesdashboard`,
            page: `updatesdashboard`,
            icon: <AdminPanelSettingsIcon />,
            role: `Updates Admin`,
            img: Updatesimg
        },
    ],
    Directors: [
        {
            to: `/dashboard/${adminrole}/directorsdashboard`,
            page: `directorsdashboard`,
            icon: <AdminPanelSettingsIcon />,
            role: `Directors`,
            img: HODimg
        },
    ],
};


export default RoleAccess;