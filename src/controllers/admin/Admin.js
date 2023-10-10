import React, { useEffect,useState } from "react";
import "../../components/css/admin_css/Admin.css";
import { MdLogout } from "react-icons/md";
import axios from "axios";


const Admin = () => {
  const [alladmins, setAlladmins] = useState([]);
  const [error, setError] = useState("");

  const admins = async () => {
    try {
      const response = await axios.get("http://localhost:8081/check");
      if (response != "") {
        setAlladmins(response.data);
        // console.log(response.data)
      } else {
        setError("Datat Not Fetched");
      }
    } catch (error) {
      console.log(error + "Smthing wrong");
      setError(error);
    }
  };
  useEffect(() => {
    admins();
    // login_handle()
  }, []);
  return (
    <div className="admin-main">
      <div>
        <a href="/admin">
          <button>
            Logout
            <MdLogout />
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
      <div>
        -- ALL Admins
        <div>{
          alladmins.map((admin) => (
            <div>
              <p>
                {admin.name}
                ----
                {admin.role}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Admin;
