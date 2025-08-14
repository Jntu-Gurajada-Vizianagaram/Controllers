import GoogleIcon from '@mui/icons-material/Google';
import { Alert, Typography, Paper, InputAdornment, IconButton, CircularProgress, Box, Fade } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import APIs from '../../Main/apis_data/APIs';
import React, { useState } from "react";
import { MdLogin } from 'react-icons/md';
import { RiAdminFill, RiLockPasswordFill } from 'react-icons/ri';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import library from "../media/jntu library.jpg";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const styles = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)',
    fontFamily: 'Roboto, sans-serif'
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 18,
    overflow: 'hidden',
    maxWidth: 950,
    width: '100%',
    minHeight: 500,
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    background: 'rgba(255,255,255,0.98)'
  },
  formSection: {
    flex: 1,
    padding: '48px 36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.97)'
  },
  imageSection: {
    flex: 1.2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(120deg, #1976d2 0%, #90caf9 100%)'
  },
  image: {
    maxHeight: 480,
    width: '100%',
    objectFit: 'cover',
    borderRadius: 0,
    filter: 'brightness(0.95) drop-shadow(0 2px 16px rgba(25,118,210,0.12))'
  },
  title: {
    fontWeight: 700,
    color: '#1976d2',
    marginBottom: 8,
    letterSpacing: 1
  },
  alert: {
    marginBottom: 18,
    width: '100%'
  },
  textField: {
    marginBottom: 18,
    background: '#f7fafd',
    borderRadius: 6
  },
  button: {
    marginTop: 12,
    marginBottom: 8,
    fontWeight: 700,
    letterSpacing: 1,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 6,
    boxShadow: '0 2px 8px rgba(25,118,210,0.08)'
  },
  googleButton: {
    fontWeight: 700,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1976d2',
    color: '#1976d2',
    marginTop: 8,
    marginBottom: 8,
    background: '#fff',
    transition: 'background 0.2s, color 0.2s',
    '&:hover': {
      background: '#e3f2fd',
      color: '#1565c0'
    }
  },
  forgot: {
    textAlign: 'right',
    marginTop: 2,
    marginBottom: 2,
    fontSize: 15,
    color: '#1976d2',
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  or: {
    margin: '18px 0',
    color: '#888',
    fontWeight: 500,
    textAlign: 'center'
  }
};

const Login = () => {
  const navigate = useNavigate();
  const login_details = JSON.parse(localStorage.getItem("accesser"));
  const [erralert, setAlert] = useState({
    message: "",
    type: "warning",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login_handle = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setAlert({
        message: "Please fill all fields",
        type: "warning"
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(APIs.admin_apis.login, { credentials: { username, password } });
      if (response.data.islogin) {
        setAlert({
          type: "success",
          message: "Login successful"
        });
        localStorage.setItem("accesser", JSON.stringify(response.data));
        setTimeout(() => {
          navigate('/profiles');
        }, 800);
      } else {
        setAlert({
          type: "error",
          message: response.data.message
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Server can't be reached right now. Sorry for the inconvenience."
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accesser");
    navigate('/logout');
  };

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  const handleShowPassword = () => setShowPassword((show) => !show);

  // Responsive: hide image on xs/sm screens
  const isMobile = window.innerWidth < 900;

  if (login_details) {
    return (
      <Box sx={styles.root}>
        <Paper elevation={6} sx={{
          p: 5,
          borderRadius: 4,
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
          background: 'rgba(255,255,255,0.98)'
        }}>
          <Typography variant="h5" gutterBottom sx={styles.title}>
            You are already logged in as
          </Typography>
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
            {login_details.admin}
          </Typography>
          <Typography variant="body1" gutterBottom>
            To access your dashboards:
          </Typography>
          <Button variant="contained" color="primary" size="large" component={RouterLink} to='/profiles' sx={{ mt: 2, mb: 2, width: '80%' }}>
            Go to Profiles
          </Button>
          <Typography variant="body2" color="textSecondary" sx={{ my: 2 }}>
            or
          </Typography>
          <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ width: '80%' }}>
            Logout
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={styles.root}>
      <Paper elevation={8} sx={{
        ...styles.paper,
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        <Box sx={styles.formSection}>
          <Typography variant="h4" fontWeight="bold" color="primary" align="center" gutterBottom sx={styles.title}>
            Admin Login
          </Typography>
          <Fade in={!!erralert.message}>
            <Box>
              {erralert.message && (
                <Alert
                  severity={erralert.type}
                  onClose={() => setAlert({ message: "", type: "warning" })}
                  sx={styles.alert}
                >
                  {erralert.message}
                </Alert>
              )}
            </Box>
          </Fade>
          <TextField
            label="Admin Username"
            variant="outlined"
            fullWidth
            sx={styles.textField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RiAdminFill style={{ color: '#1976d2' }} />
                </InputAdornment>
              ),
              autoComplete: "username"
            }}
            autoFocus
          />
          <TextField
            label="Admin Password"
            variant="outlined"
            fullWidth
            sx={styles.textField}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RiLockPasswordFill style={{ color: '#1976d2' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={handleShowPassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              autoComplete: "current-password"
            }}
            onKeyDown={e => { if (e.key === 'Enter') login_handle(); }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={styles.button}
            endIcon={loading ? <CircularProgress size={22} color="inherit" /> : <MdLogin />}
            onClick={login_handle}
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </Button>
          <Typography align="right" sx={{ mt: 1 }}>
            <RouterLink to="/passwordreset" style={styles.forgot}>
              Forgot Password?
            </RouterLink>
          </Typography>
          <Typography variant="body2" align="center" sx={styles.or}>
            — OR —
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            size="large"
            className="button-admin-login"
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
            sx={styles.googleButton}
            disabled={loading}
          >
            Login with Google
          </Button>
        </Box>
        {!isMobile && (
          <Box sx={styles.imageSection}>
            <img
              src={library}
              alt="Library"
              style={styles.image}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Login;