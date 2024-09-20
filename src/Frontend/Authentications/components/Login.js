import GoogleIcon from '@mui/icons-material/Google';
import { Alert, Button, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { MdLogin } from 'react-icons/md';
import { RiAdminFill, RiLockPasswordFill } from 'react-icons/ri';
import { Link as RouterLink } from "react-router-dom";
import APIs from '../../Main/apis_data/APIs';
import "../css/Login.css"; // Ensure your CSS handles the classes properly
import library from "../media/jntu library.jpg";

const Login = () => {
  const loginDetails = JSON.parse(localStorage.getItem("accesser"));
  const [alert, setAlert] = useState({ message: "", type: "warning" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setAlert({ message: "Please fill in all fields", type: "warning" });
      return;
    }

    try {
      const response = await axios.post(APIs.admin_apis.login, { credentials: { username, password } });

      if (response.data.islogin) {
        setAlert({ message: "Successfully logged in", type: "success" });
        localStorage.setItem("accesser", JSON.stringify(response.data));
        window.location.href = `/profiles`;
      } else {
        setAlert({ message: response.data.message, type: "error" });
      }
    } catch (error) {
      console.error(error);
      setAlert({ message: "Unable to reach server. Please try again later.", type: "warning" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accesser");
    window.location.href = '/logout'; // Assuming the server handles this route
  };

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <div className="admin-login-main">
      {loginDetails ? (
        <div className="logged-in-info">
          <Typography variant="h5" gutterBottom>
            You are already logged in as <strong>{loginDetails.admin}</strong>
          </Typography>
          <Button variant="contained" component={RouterLink} to='/profiles'>
            Go to Profiles
          </Button>
          <Typography variant="h6" gutterBottom>
            or
          </Typography>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="login-container">
          {alert.message && (
            <Alert severity={alert.type} onClose={() => setAlert({ message: "", type: "warning" })}>
              {alert.message}
            </Alert>
          )}

          <div className="login-form">
            <Typography variant="h4" align="center" gutterBottom>Admin Login</Typography>
            <div className="form-group">
              <RiAdminFill className="input-icon" />
              <TextField
                label="Admin Username"
                fullWidth
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <RiLockPasswordFill className="input-icon" />
              <TextField
                label="Admin Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<MdLogin />}
              onClick={handleLogin}
              style={{ marginTop: '20px' }}
            >
              LOGIN
            </Button>

            <Link component={RouterLink} to="/passwordreset" className="forgot-password">
              Forgot Password?
            </Link>

            <Typography variant="body2" align="center" style={{ margin: '16px 0' }}>
              OR
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              style={{ marginTop: '10px' }}
            >
              Login with Google
            </Button>
          </div>

          <div className="library-image-container">
            <img src={library} alt="Library" className="library-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
