import React, { useEffect, useState } from "react";
import "../css/Login.css";
import { MdLogin } from "react-icons/md";
import { RiAdminFill, RiLockPasswordFill } from "react-icons/ri";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import library from "../media/jntu library.jpg";
import axios from "axios";
const ips =require('../../api.json')



const Login = () => {
  
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [session, setSession] = useState("login"); 
const [alert,setAlert] = useState({
  message: "",
  type:"warning",
})
const api_ip = ips.server_ip

const login_handle = async () => {
  try {
    const response = await axios.post(`http://${api_ip}:8888/api/admins/login`,
    { credentials:{username, password} });
    if(username == "" || password == ""){
        setAlert({
          message:"Fill the fields",
          type:"warning"
        })
        return;
    }
    if (response.data.login) {
      setAlert({
          type:"success",
          message:"Ok Logged In"
        });
        window.location.href = `/profiles`;
        console.log(response.data);
      } else {
        console.log(response.data.message);
        setAlert({
          type:"error",
          message:response.data.message
        });
      }
    } catch (error) {
      setAlert({
        type:"warning",
        message:"Server Can't be reached right now \nSorry for the inconvenience"});
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
        <div>
          { alert.message ? (

        <Stack 
          sx={{ width: '70%' }} 
          spacing={2}
          style={{
            display:"flex",
            flexDirection:"column",
            backgroundColor:"blue",
            width:"50%",
            alignItems:"center"
            }}>
              <Alert severity={alert.type} onClose={() => {setAlert(false)}}>
                {alert.message}
              </Alert>
      
        </Stack>
          ):(<div></div>)}
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
        </div>
      )}
    </div>
  );
};

export default Login;
