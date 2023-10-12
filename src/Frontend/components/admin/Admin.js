import React, { useEffect,useState } from "react";
import "../../css/admin_css/Admin.css";
import { MdLogout,MdLogin } from "react-icons/md";
import { RiAdminFill, RiLockPasswordFill } from "react-icons/ri";
import { GiCharacter } from "react-icons/gi";
import library from "../../media/jntu library.jpg";
import axios from "axios";





const Admin = () => {
  const [alladmins, setAlladmins] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  
  const admins = async () => {
    try {
      const response = await axios.get("http://localhost:8082/check");
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
  const adding_handle = async()=>{
    try {
      const id =0;
      const response = await axios.post('http://localhost:8081/add-hod',
      {data:{id,name,username,password,role}}
      )
      alert("Adding Hod Credentials")
      if(response.data.Success){
        alert("Hod Data Successfully added")
      }
      else{
        alert("Hod Data Not added \n Reason:"+response.data.MSG)
      }
    } catch (error) {
      
      alert("Exception"+error)
      console.log(error)
    }
  }
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
      <div className="all-consoles">
        <div className="admin-crud-consoles">
          <div className="hods-crud-console">
            <div>
              <form>
                <div className="admin-login-form">
                  <div className="login-form">
                    <h2>Admin Login</h2>
                    <div className="form-group">
                      <label htmlFor="admin-name">
                        <RiAdminFill />
                        Add HOD Name:
                      </label>
                      <input
                        type="text"
                        id="admin-username"
                        placeholder="Enter HOD Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="admin-username">
                        <RiAdminFill />
                        Add HOD Username:
                      </label>
                      <input
                        type="text"
                        id="admin-username"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="admin-password">
                        <RiLockPasswordFill />
                        Generate HOD Password:
                      </label>
                      <input
                        type="password"
                        id="admin-password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="admin-role">
                        <GiCharacter />
                        Role:
                      </label>
                      <input
                        type="text"
                        id="admin-role"
                        placeholder="Enter your role"
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                    <button className="btn-admin-login" onClick={adding_handle}>
                      ADD HOD <MdLogin />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
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