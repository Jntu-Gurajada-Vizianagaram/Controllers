import React from "react";
import "../../css/admin_css/Admin.css";
import { MdLogout } from "react-icons/md";
import AdminsCRUDControl from "./AdminsCRUDControl";



const Admin = () => {

  
  
  return (
    <div className="admin-main">
      <div>
        <a href="/">
          <button>
            Logout
            <MdLogout />
            {
              // {session}
            }
          </button>
          <br />
        </a>
        <div className="all-requests">
          <span>All Requests</span>
          <div className="updates-requests">Update Requests</div>
          <div className="dmc-requests">DMC Requests</div>
          <div className="news-requests">News and Event Request</div>
          <div className="dept-requests">Department Circular Requests</div>
        </div>
      </div>
      <div className="all-consoles">
        
      </div>
      <AdminsCRUDControl/>
    </div>
  );
};

export default Admin;