import api from '../../api.json'
const api_ip = process.env.REACT_APP_API_URL || api.server_ip

const allapis= {
    admin_apis:{
        login:`${api_ip}/api/admins/login`,
        logout:`${api_ip}/api/admins/logout`,
        session:`${api_ip}/api/admins/getrole`,
        google_login:`${api_ip}/api/admins/auth/google`,
        allowlist:`${api_ip}/api/admins/allowlist`,
        all_admins:`${api_ip}/api/admins/getadmins`,
        add_hod:`${api_ip}/api/admins/add-hod`,
        remove_hod:`${api_ip}/api/admins/remove-hod`,
        update_hod:`${api_ip}/api/admins/update_hod`,
        genrate_pwd:`${api_ip}/api/admins/generate-password`,
        all_stored_files:`${api_ip}/api/admins/allstoredfiles`,
        all_exam_pdfs:`${api_ip}/api/admins/allexampdfs`,
        directors:`${api_ip}/api/directors/all-directors`,
        add_director:`${api_ip}/api/directors/add-director`,
        remove_director:`${api_ip}/api/directors/delete-director`,
        update_director:`${api_ip}/api/directors/update-director`,
        
    },
    mailing_api:{
        send_mail :`${api_ip}/api/mailing/sendmail`,
        recieve_mail :`${api_ip}/api/mailing/recieve`,
        send_grievance :`${api_ip}/api/mailing/send-grievance`,
        recieve_grievance :`${api_ip}/api/mailing/recieve-grievance`,
    },
    updates_requests : {
        notification_reqs:`${api_ip}/api/updates/update-requests`,
        notification_accept:`${api_ip}/api/updates/update-accept-request`,
        notification_deny:`${api_ip}/api/updates/update-deny-request`,
    },
    updates_apis:{
        add_event:`${api_ip}/api/updates/add-event`,
        remove_event:`${api_ip}/api/updates/remove-event`,
        every_event:`${api_ip}/api/updates/every-events`,
        all_admin_event:`${api_ip}/api/updates/all-admin-events`,
        all_updater_event:`${api_ip}/api/updates/all-updater-events`,
        update_single_event:`${api_ip}/api/updates/all-admin-events`,
        update_event:`${api_ip}/api/updates/update-event`
    },
    webadmin_apis:{
        all_images:`${api_ip}/api/webadmin/allimages`,
        add_image:`${api_ip}/api/webadmin/addimage`,
        remove_image:`${api_ip}/api/webadmin/removeimage`,
        carousel_preview:`${api_ip}/api/webadmin/carousel-images-preview`,
        carousel_images:`${api_ip}/api/webadmin/carousel-images`,
        remove_from_carousel:`${api_ip}/api/webadmin/remove-from-carousel`,
        add_to_carousel:`${api_ip}/api/webadmin/add-to-carousel`,
        add_event_photos:`${api_ip}/api/webadmin/add-event-photos`,
        get_event_photos:`${api_ip}/api/webadmin/get-event-photos`,
        webadmin_main_carousel:`${api_ip}/api/webadmin/main-carousel-images`,
        main_event_photos:`${api_ip}/api/webadmin/get-main-event-photos`
    },
    webadmin_requests:{
        webadmin_event_requests:`${api_ip}/api/webadmin/webadmin-event-requests`,
        webadmin_event_accept:`${api_ip}/api/webadmin/webadmin-event-accept-request`,
        webadmin_event_deny:`${api_ip}/api/webadmin/webadmin-event-deny-request`,
        webadmin_requests:`${api_ip}/api/webadmin/webadmin-requests`,
        webadmin_request_accept:`${api_ip}/api/webadmin/webadmin-accept-request`,
        webadmin_request_deny:`${api_ip}/api/webadmin/webadmin-deny-request`,

    },
    affliated_colleges_apis:{
        add_college :`${api_ip}/api/affliated-colleges/add-new-college`,
        update_college :`${api_ip}/api/affliated-colleges/update-college`,
        remove_college :`${api_ip}/api/affliated-colleges/remove-college`,
        all_colleges :`${api_ip}/api/affliated-colleges/all-colleges`,
    }
}


export default allapis
