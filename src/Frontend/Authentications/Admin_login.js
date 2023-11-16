import React, { useEffect, useState } from "react";
import "../css/admin_css/Admin_login.css";
import { MdLogin } from "react-icons/md";
import { RiAdminFill, RiLockPasswordFill } from "react-icons/ri";
import library from "../media/jntu library.jpg";
import axios from "axios";
const ips =require('../api.json')
const Admin_login = () => {
  
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [session, setSession] = useState("login"); 
const api_ip = ips.server_ip

const login_handle = async () => {
  try {
    const response = await axios.post(`http://${api_ip}:8888/api/admins/login`,
      { credentials:{username, password} });
      if (response.data.login) {
        alert("Ok Logged In");
        window.location.href = `/admin`;
        console.log(response.data);
      } else {
        console.log("Invalid Credentials");
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      alert("Server Can't be reached right now \nSorry for the inconvenience");
      console.log(error);
    }
  };
  
 
    
    return (
      <div className="admin-login-main">
      {session != "login" ? (
        <div>
          {/* <Admin /> */}
          <h3>All Admins:</h3>
        </div>
      ) : (
        <div className="admin-login-form">
          <div className="login-form">
            <h2>Admin Login</h2>
            <div className="form-group">
              <label htmlFor="admin-username">
                <RiAdminFill />
                Admin Username:
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
                Admin Password:
              </label>
              <input
                type="password"
                id="admin-password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
           
            <button className="btn-admin-login" onClick={login_handle}>
              LOGIN <MdLogin />
            </button>
            <a href="/passwordreset" className="forgot-password">
              Forgot Password...?
            </a>
          </div>

          <div className="library-image">
            <img src={library} height={400} width={900} className="library-image"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_login;
