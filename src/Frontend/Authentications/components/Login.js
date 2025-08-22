import axios from "axios";
import React, { useState } from "react";
import { MdLogin } from 'react-icons/md';
import { RiAdminFill, RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import APIs from '../../Main/apis_data/APIs';
import "../css/Login.css";
import library from "../media/jntu library.jpg";

const GoogleIconSVG = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 48 48"
    style={{ verticalAlign: 'middle', marginRight: 8, display: 'inline-block' }}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g>
      {/* Blue */}
      <path
        d="M43.611 20.083h-18.19v7.834h10.417c-1.042 3.125-4.167 6.25-10.417 6.25-6.25 0-11.375-5.208-11.375-11.667s5.125-11.667 11.375-11.667c3.542 0 5.917 1.417 7.292 2.625l6.042-5.875C35.25 5.25 30.25 3 24 3 12.958 3 4 12.042 4 24s8.958 21 20 21c11.25 0 19.5-7.917 19.5-19.083 0-1.292-.125-2.25-.389-3.834z"
        fill="#4285F4"
      />
      {/* Green */}
      <path
        d="M6.917 14.542l6.417 4.708C14.75 16.5 18.958 13 24 13c3.542 0 5.917 1.417 7.292 2.625l6.042-5.875C35.25 5.25 30.25 3 24 3c-7.5 0-13.875 4.25-17.083 10.542z"
        fill="#34A853"
      />
      {/* Yellow */}
      <path
        d="M24 45c5.958 0 10.958-1.958 14.583-5.375l-6.75-5.542C29.75 36.5 27.25 37.5 24 37.5c-6.042 0-11.167-4.083-13-9.75l-6.708 5.167C7.958 41.25 15.25 45 24 45z"
        fill="#FBBC05"
      />
      {/* Red */}
      <path
        d="M43.611 20.083h-18.19v7.834h10.417c-.5 2.125-2.083 4.25-4.25 5.5l.001-.001 6.75 5.542C41.25 36.25 44 31.75 44 24c0-1.292-.125-2.25-.389-3.834z"
        fill="#EA4335"
      />
    </g>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const login_details = JSON.parse(localStorage.getItem("accesser"));

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [erralert, setAlert] = useState({
    message: "",
    type: "warning",
  });

  const [loading, setLoading] = useState(false);
  const [focusField, setFocusField] = useState("");
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Helper to generate user-friendly error messages
  const getUserFriendlyError = (serverMsg, username, password) => {
    if (!serverMsg) {
      return {
        type: "error",
        message: "Login failed. Please check your username and password and try again."
      };
    }
    const msg = serverMsg.toLowerCase();

    // Username not found
    if (msg.includes("not found") || msg.includes("no user") || msg.includes("username does not exist")) {
      return {
        type: "error",
        message: "The username you entered does not exist. Please check your username."
      };
    }
    // Incorrect password
    if (msg.includes("incorrect password") || msg.includes("wrong password")) {
      return {
        type: "error",
        message: "The password you entered is incorrect. Please try again."
      };
    }
    // Both wrong (generic)
    if (
      (msg.includes("invalid credentials") || msg.includes("invalid username or password") || msg.includes("authentication failed"))
      && username && password
    ) {
      return {
        type: "error",
        message: "The username and password combination is incorrect. Please try again."
      };
    }
    // Account disabled
    if (msg.includes("disabled") || msg.includes("inactive")) {
      return {
        type: "error",
        message: "Your account has been disabled. Please contact support."
      };
    }
    // Server error
    if (msg.includes("server error") || msg.includes("internal error")) {
      return {
        type: "error",
        message: "A server error occurred. Please try again later."
      };
    }
    // Fallback to server message
    return {
      type: "error",
      message: serverMsg
    };
  };

  const login_handle = async () => {
    const { username, password } = formData;


    if (!username.trim() || !password.trim()) {
      setAlert({
        message: "Please fill all fields",
        type: "warning"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(APIs.admin_apis.login, { credentials: { username, password } });

      if (response.data && response.data.islogin) {
        setAlert({
          type: "success",
          message: "Login successful"
        });
        localStorage.setItem("accesser", JSON.stringify(response.data));
        setTimeout(() => navigate('/profiles'), 500);
      } else {
        // User-friendly error handling
        let errorObj;
        if (response.data && response.data.message) {
          errorObj = getUserFriendlyError(response.data.message, username, password);
        } else {
          errorObj = {
            type: "error",
            message: "Login failed. Please check your username and password and try again."
          };
        }
        setAlert(errorObj);
      }
    } catch (error) {
      // Network/server failure
      let serverDown = false;
      if (error.response && error.response.data && error.response.data.message) {
        // If server responded with a message, use user-friendly error
        setAlert(getUserFriendlyError(error.response.data.message, formData.username, formData.password));
      } else if (error.request && !error.response) {
        // No response from server
        serverDown = true;
      } else if (error.message && error.message.toLowerCase().includes("network")) {
        serverDown = true;
      }
      if (serverDown) {
        setAlert({
          type: "error",
          message: "Unable to connect to the server. Please check your internet connection or try again later."
        });
      }
      // else already handled above
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

  const styles = {
    alert: {
      display: "inline-block",
      padding: "8px 16px",
      borderRadius: 6,
      fontSize: 15,
      fontWeight: 500,
      margin: "0 0 16px 0",
      background: "#f5f5f5",
      color: "#333",
      border: "1px solid #ccc"
    },
    alertSuccess: { color: "#256029", background: "#e8f5e9", borderColor: "#4caf50" },
    alertError: { color: "#b71c1c", background: "#ffebee", borderColor: "#f44336" },
    alertWarning: { color: "#7c4700", background: "#fff8e1", borderColor: "#ff9800" },
    closeBtn: {
      background: "none",
      border: "none",
      color: "#888",
      fontSize: 18,
      cursor: "pointer",
      marginLeft: 8
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      marginBottom: 24,
      color: "#1a237e",
      letterSpacing: 1
    },
    formGroup: {
      marginBottom: 18,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start"
    },
    label: {
      fontWeight: 600,
      color: "#333",
      marginBottom: 6,
      fontSize: 15,
      display: "flex",
      alignItems: "center",
      gap: 6
    },
    input: {
      width: "260px",
      padding: "10px 12px",
      border: "1.5px solid #bdbdbd",
      borderRadius: 6,
      fontSize: 15,
      outline: "none",
      transition: "border 0.2s",
      marginBottom: 2
    },
    inputFocus: {
      border: "1.5px solid #1976d2"
    },
    btn: {
      width: "100%",
      padding: "12px 0",
      background: "#1976d2",
      color: "#fff",
      fontWeight: 700,
      fontSize: 16,
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      marginTop: 10,
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
      transition: "background 0.2s"
    },
    btnDisabled: {
      background: "#90caf9",
      cursor: "not-allowed"
    },
    forgot: {
      color: "#1976d2",
      textDecoration: "none",
      fontSize: 14,
      fontWeight: 500,
      margin: "8px 0 0 0",
      display: "inline-block",
      transition: "color 0.2s"
    },
    forgotHover: {
      color: "#0d47a1"
    },
    orText: {
      textAlign: "center",
      margin: "18px 0 10px 0",
      color: "#888",
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: 1
    },
    googleBtn: {
      width: "100%",
      padding: "12px 0",
      background: "#fff",
      color: "#444",
      fontWeight: 700,
      fontSize: 16,
      border: "1.5px solid #bdbdbd",
      borderRadius: 6,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      boxShadow: "0 2px 8px rgba(66, 133, 244, 0.08)",
      transition: "background 0.2s, border 0.2s"
    },
    googleBtnDisabled: {
      background: "#f5f5f5",
      color: "#aaa",
      border: "1.5px solid #e0e0e0",
      cursor: "not-allowed"
    },
    alreadyLogged: {
      margin: "40px auto",
      padding: "32px 40px",
      background: "#f5f7fa",
      borderRadius: 12,
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      textAlign: "center",
      maxWidth: 480
    },
    alreadyH1: {
      fontSize: "1.5rem",
      color: "#1976d2",
      margin: "10px 0 0 0"
    },
    alreadyBtn: {
      padding: "10px 28px",
      background: "#1976d2",
      color: "#fff",
      fontWeight: 600,
      fontSize: 16,
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      margin: "10px 0",
      transition: "background 0.2s"
    },
    alreadyBtnSecondary: {
      background: "#f44336"
    }
  };

  if (login_details) {
    return (
      <div className="admin-login-main">
        <div style={styles.alreadyLogged}>
          <div style={{ fontSize: "1.2rem", color: "#333", marginBottom: 12 }}>
            You are already logged in as
            <h1 style={styles.alreadyH1}>{login_details.admin}</h1>
          </div>
          <div style={{ fontSize: "1.1rem", color: "#444", marginBottom: 18 }}>
            To access your dashboards <br /><br />
            <button
              style={styles.alreadyBtn}
              onClick={() => navigate('/profiles')}
            >
              Go to Profiles
            </button>
            <br /><br />or
          </div>
          <div>
            <button
              style={{ ...styles.alreadyBtn, ...styles.alreadyBtnSecondary }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-main">
      <div className="admin-login-form" style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        <div className="login-form" style={{ padding: 32, borderRadius: 12, background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", minWidth: 340, position: "relative" }}>
          {erralert.message && (
            <span style={{ color: erralert.type === "success" ? "#256029" : erralert.type === "error" ? "#b71c1c" : "#7c4700", fontSize: 15, marginBottom: 10, display: "block" }}>
              {erralert.message}
            </span>
          )}

          <h2 style={styles.h2}>Admin Login</h2>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="admin-username" style={styles.label}>
              <RiAdminFill style={{ fontSize: 18, color: "#1976d2" }} /> Admin Username:
            </label>
            <input
              type="text"
              id="admin-username"
              placeholder="Enter your username"
              value={formData.username.toLowerCase()}
              onChange={e => {
                const value = e.target.value.toLowerCase();
                setFormData(prev => ({ ...prev, username: value }));
              }}
              autoComplete="username"
              style={{
                ...styles.input,
                ...(focusField === "username" ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusField("username")}
              onBlur={() => setFocusField("")}
            />
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="admin-password" style={styles.label}>
              <RiLockPasswordFill style={{ fontSize: 18, color: "#1976d2" }} /> Admin Password:
            </label>
            <input
              type="password"
              id="admin-password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange("password")}
              autoComplete="current-password"
              style={{
                ...styles.input,
                ...(focusField === "password" ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusField("password")}
              onBlur={() => setFocusField("")}
            />
          </div>

          <button
            className="btn-admin-login"
            onClick={login_handle}
            disabled={loading}
            style={{
              ...styles.btn,
              ...(loading ? styles.btnDisabled : {})
            }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="spinner" style={{
                  width: 20, height: 20, border: "3px solid #fff",
                  borderTop: "3px solid #1976d2", borderRadius: "50%",
                  display: "inline-block", animation: "spin 1s linear infinite"
                }} />
                Loading...
              </span>
            ) : (
              <>
                LOGIN <MdLogin style={{ fontSize: 20, marginLeft: 6 }} />
              </>
            )}
          </button>

          <a
            href="/passwordreset"
            className="forgot-password"
            style={styles.forgot}
            onMouseOver={e => e.currentTarget.style.color = styles.forgotHover.color}
            onMouseOut={e => e.currentTarget.style.color = styles.forgot.color}
          >
            Forgot Password?
          </a>

          <div style={styles.orText}>OR</div>

          <button
            className="button-admin-login"
            onClick={handleGoogleLogin}
            style={{
              ...styles.googleBtn,
              ...(loading ? styles.googleBtnDisabled : {})
            }}
            disabled={loading}
          >
            <GoogleIconSVG />
            Login with Google
          </button>
        </div>

        <div className="library-image" style={{ marginLeft: 32 }}>
          <img
            src={library}
            alt="Library"
            height={400}
            width={900}
            className="library-image"
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
              objectFit: "cover"
            }}
          />
        </div>
      </div>
      {/* Spinner animation keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
};

export default Login;
