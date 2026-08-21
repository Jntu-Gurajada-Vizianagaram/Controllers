import api from '../../api.json'
const api_ip = import.meta.VITE_API_URL || api.server_ip;

const allapis= {
    admin_apis:{
        login:`${api_ip}/api/admins/login`,
        logout:`${api_ip}/api/admins/logout`,
        session:`${api_ip}/api/admins/getrole`,
        google_login:`${api_ip}/api/admins/auth/google`,
        allowlist:`${api_ip}/api/admins/allowlist`,
        password_reset_request:`${api_ip}/api/admins/password-reset/request`,
        password_reset_confirm:`${api_ip}/api/admins/password-reset/confirm`,
        all_admins:`${api_ip}/api/admins/users`,
        add_admin_user:`${api_ip}/api/admins/users`,
        remove_admin_user:`${api_ip}/api/admins/users`,
        update_admin_user:`${api_ip}/api/admins/users`,
        genrate_pwd:`${api_ip}/api/admins/generate-password`,
        directors:`${api_ip}/api/directors/all-directors`,
        add_director:`${api_ip}/api/directors/add-director`,
        remove_director:`${api_ip}/api/directors/delete-director`,
        update_director:`${api_ip}/api/directors/update-director`,
        profile_me:`${api_ip}/api/profiles/me`,
        profiles:`${api_ip}/api/profiles`,
        
    },
    mailing_api:{
        send_mail :`${api_ip}/api/mailing/sendmail`,
        recieve_mail :`${api_ip}/api/mailing/recieve`,
        send_grievance :`${api_ip}/api/mailing/send-grievance`,
        recieve_grievance :`${api_ip}/api/mailing/recieve-grievance`,
    },
    updates_apis:{
        add_event:`${api_ip}/api/updates/add-event`,
        remove_event:`${api_ip}/api/updates/remove-event`,
        every_event:`${api_ip}/api/updates/every-events`,
        departments:`${api_ip}/api/updates/departments`,
        all_admin_event:`${api_ip}/api/updates/all-admin-events`,
        all_updater_event:`${api_ip}/api/updates/all-updater-events`,
        update_single_event:`${api_ip}/api/updates/all-admin-events`,
        update_event:`${api_ip}/api/updates/update-event`
    },
    site_apis:{
        public_navbar:`${api_ip}/api/site/navbar`,
        admin_navbar:`${api_ip}/api/site/admin/navbar`,
        public_youtube_videos:`${api_ip}/api/site/youtube-videos`,
        admin_youtube_videos:`${api_ip}/api/site/admin/youtube-videos`,
    },
    press_notes_apis:{
        public_press_notes:`${api_ip}/api/press-notes`,
        admin_press_notes:`${api_ip}/api/press-notes/admin`,
    },
    webadmin_apis:{
        all_images:`${api_ip}/api/webadmin/allimages`,
        add_image:`${api_ip}/api/webadmin/addimage`,
        remove_image:`${api_ip}/api/webadmin/removeimage`,
        carousel_images:`${api_ip}/api/webadmin/carousel-images`,
        remove_from_carousel:`${api_ip}/api/webadmin/remove-from-carousel`,
        add_to_carousel:`${api_ip}/api/webadmin/add-to-carousel`,
        add_event_photos:`${api_ip}/api/webadmin/add-event-photos`,
        get_event_photos:`${api_ip}/api/webadmin/get-event-photos`
    },
    affliated_colleges_apis:{
        add_college :`${api_ip}/api/affliated-colleges/add-new-college`,
        update_college :`${api_ip}/api/affliated-colleges/update-college`,
        remove_college :`${api_ip}/api/affliated-colleges/remove-college`,
        all_colleges :`${api_ip}/api/affliated-colleges/all-colleges`,
    },
    developer_apis:{
        api_docs:`${api_ip}/api/docs`,
        api_metrics:`${api_ip}/developer/metrics`,
    }
}


export default allapis
