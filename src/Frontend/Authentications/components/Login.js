import GoogleIcon from '@mui/icons-material/Google';
import { Alert, Link, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import axios from "axios";
import APIs from '../../Main/apis_data/APIs';
import "../css/Login.css";

import React, { useState } from "react";
import { MdLogin } from 'react-icons/md';
import { RiAdminFill, RiLockPasswordFill } from 'react-icons/ri';
import { Link as RouterLink } from "react-router-dom";
import library from "../media/jntu library.jpg";

const Login = () => {
  const login_details = JSON.parse(localStorage.getItem("accesser"));
  const [erralert, setAlert] = useState({
    message: "",
    type: "warning",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login_handle = async () => {
    try {
      const response = await axios.post(`${APIs.admin_apis.login}`,
      { credentials:{username, password} });
      if(username == "" || password == ""){
          setAlert({
            message:"Fill the fields",
            type:"warning"
          })
          return;
      }
      if (response.data.islogin) {
        setAlert({
            type:"success",
            message:"Ok Logged In"
          });
          localStorage.setItem("accesser",JSON.stringify(response.data))
          window.location.href = `/profiles`;
          // console.log(response.data);
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
      {login_details ? (
        <div>
          <Typography variant="h5" gutterBottom margin={7}>
            You are Already logged in as <h1>{login_details.admin}</h1>
          </Typography>
          <Typography variant="h5" gutterBottom margin={7}>
            To Access your Dashboards <br /><br />
            <Button variant="contained" component={RouterLink} to='/profiles' >Go to Profiles</Button>
            <br /><br />or
          </Typography>
       
          <Typography variant="h5" gutterBottom margin={7}>
            <Button variant="contained" component={RouterLink} to='/'
              onClick={(e) => {
                localStorage.removeItem("accesser");
                window.location.href = '/logout'; // Logout route handled by server
              }}
            >
              Logout
            </Button>
          </Typography>
        </div>
      ) : (
        <div>
          {erralert.message && (
            <div
              style={{
                width: '70%',
                display: "flex",
                flexDirection: "column",
                backgroundColor: "blue",
                alignItems: "center"
              }}
            >
              <Alert severity={erralert.type} onClose={() => setAlert({ message: "", type: "warning" })}>
                {erralert.message}
              </Alert>
            </div>
          )}
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
              <Link to="/passwordreset" className="forgot-password">
                Forgot Password?
              </Link>
            <Typography variant="body2" align="center" style={{ margin: '16px 0' }}>
              OR
            </Typography>
            <Button
              
              className ="button-admin-login"
              onClick={() => { window.location.href = '/auth/google'; }}
              startIcon={<GoogleIcon />}
              style={{ margin: '16px 0' }}
            >
              Login with Google <mdLogin />
            </Button>
          </div>
          
          <div className="library-image">
            <img src={library} alt="Library" height={400} width={900} className="library-image" />
          </div>
        </div>
        </div>

      )}
    </div>
  );
};

export default Login;
