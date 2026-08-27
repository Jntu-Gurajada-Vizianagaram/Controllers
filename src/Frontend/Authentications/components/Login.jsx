import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIs from '../../Main/apis_data/APIs';
import "../css/Login.css";
import library from "../media/jntu library.jpg";
import logo from "../../Main/media/jntugv.png";

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

const Badge = ({ children }) => <span className="login-badge">{children}</span>;

const FooterColumn = ({ title, links }) => (
  <div className="login-footer-column">
    <h3>{title}</h3>
    {links.map((link) => (
      <a key={`${title}-${link.label}`} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>
        {link.label}
      </a>
    ))}
  </div>
);

const Field = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  autoComplete,
  focused,
  onChange,
  onFocus,
  onBlur,
}) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      className={focused ? "input-focus" : ""}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const login_details = JSON.parse(localStorage.getItem("accesser"));
  const isLocallyAuthenticated = Boolean(login_details?.islogin);
  const [checkingStoredSession, setCheckingStoredSession] = useState(isLocallyAuthenticated);

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
  useEffect(() => {
    const errorCode = new URLSearchParams(window.location.search).get('google_error');
    if (!errorCode) return;
    const messages = {
      authentication_failed: 'Google authentication was cancelled or failed.',
      organizational_email_required: 'Google login requires an approved JNTU-GV Workspace account.',
      not_allowlisted: 'This account is not approved for admin access.',
      account_identity_changed: 'This Google account must be re-approved by an administrator.',
      not_configured: 'Google login is not configured on the server.',
      server_error: 'Google login could not be completed. Please try again.',
    };
    setAlert({ type: 'error', message: messages[errorCode] || 'Google login failed.' });
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);
  useEffect(() => {
    if (!isLocallyAuthenticated) {
      setCheckingStoredSession(false);
      return;
    }

    let active = true;
    axios.get(APIs.admin_apis.session, { withCredentials: true })
      .then(() => {
        if (active) navigate('/dashboard', { replace: true });
      })
      .catch(() => {
        localStorage.removeItem('accesser');
        if (active) setCheckingStoredSession(false);
      });

    return () => { active = false; };
  }, [isLocallyAuthenticated, navigate]);
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

    // Keep login failures generic so we do not reveal valid usernames.
    if (
      (msg.includes("invalid credentials")
        || msg.includes("invalid username")
        || msg.includes("invalid username/email")
        || msg.includes("invalid organizational email")
        || msg.includes("not found")
        || msg.includes("no user")
        || msg.includes("incorrect password")
        || msg.includes("wrong password")
        || msg.includes("authentication failed"))
      && username && password
    ) {
      return {
        type: "error",
        message: "Invalid login credentials. Please try again."
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
      const response = await axios.post(
        APIs.admin_apis.login,
        { credentials: { username, password } },
        { withCredentials: true },
      );

      if (response.data && response.data.islogin) {
        setAlert({
          type: "success",
          message: "Login successful"
        });
        localStorage.setItem("accesser", JSON.stringify(response.data));
        setTimeout(() => navigate('/dashboard'), 500);
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

  const handleGoogleLogin = () => {
    window.location.assign(APIs.admin_apis.google_login);
  };

  const publicSiteBase = "https://jntugv.edu.in";

  const footerColumns = [
    {
      title: "Administration",
      links: [
        { label: "Registrar", href: `${publicSiteBase}/administration/registrar` },
        { label: "Officer on Special Duty (OSD)", href: `${publicSiteBase}/administration/osd` },
        { label: "University Coordinators", href: `${publicSiteBase}/university/coordinators` },
        { label: "Chairpersons", href: `${publicSiteBase}/academics/bos-chairman` },
      ],
    },
    {
      title: "Constituent Colleges",
      links: [
        { label: "JNTU-GV College of Engineering, Vizianagaram (CEV)", href: "https://jntugvcev.edu.in/", external: true },
        { label: "JNTU-GV College of Pharmaceutical Sciences, Vizianagaram (CPSV)", href: "https://jntugvcps.edu.in/", external: true },
        { label: "JNTU-GV Tribal College of Engineering, Kurupam (TECK)", href: "https://teck.jntugv.edu.in/", external: true },
      ],
    },
    {
      title: "Academic & Research",
      links: [
        { label: "Programs Offered", href: `${publicSiteBase}/academics/programs-offered` },
        { label: "Admissions", href: `${publicSiteBase}/academics/admissions` },
        { label: "Affiliated Colleges", href: `${publicSiteBase}/academics/affliated-colleges` },
        { label: "Research and Development Cell", href: "https://drd.jntugv.edu.in/", external: true },
        { label: "Training & Placement", href: "https://jntugvcev.edu.in/placements/training-placements-cell/", external: true },
        { label: "Dr.YSR Central Library", href: "https://jntugvcev.edu.in/facilities/library/", external: true },
      ],
    },
    {
      title: "Online Learning",
      links: [
        { label: "Swayam Central", href: "https://swayam.gov.in/", external: true },
        { label: "UGC MOOCs", href: "http://ugcmoocs.inflibnet.ac.in/", external: true },
        { label: "ACM Digital Library", href: "https://dl.acm.org/", external: true },
        { label: "IEEE Xplore Digital Library", href: "https://ieeexplore.ieee.org/Xplore/home.jsp", external: true },
        { label: "Springer", href: "https://link.springer.com/", external: true },
      ],
    },
    {
      title: "Campus Facilities",
      links: [
        { label: "University Hostels", href: "https://jntugvcev.edu.in/facilities/hostels/", external: true },
        { label: "Engineering Cell", href: "https://jntugvcev.edu.in/facilities/engineering-cell/", external: true },
        { label: "Guest House", href: `${publicSiteBase}/infrastructure/about-guest-house` },
        { label: "Staff Quarters", href: `${publicSiteBase}/infrastructure/about-staff-quarters` },
        { label: "Canteen", href: "https://jntugvcev.edu.in/facilities/canteen/", external: true },
        { label: "Bank", href: `${publicSiteBase}/infrastructure/about-banks` },
        { label: "Dispensary", href: "https://jntugvcev.edu.in/facilities/dispensary/", external: true },
      ],
    },
    {
      title: "Governance & RTI",
      links: [
        { label: "RTI", href: "https://rti.jntugv.edu.in/", external: true },
        { label: "UGC Mandatory Disclosures", href: `${publicSiteBase}/mandatory-disclosures` },
        { label: "Ombudsman", href: "https://drive.google.com/file/d/15riRLxVtiJOrtLiYWmh7kvIQlTLV7Ocl/view?usp=sharing", external: true },
        { label: "Student Grievance", href: `${publicSiteBase}/grievance-form` },
        { label: "Recruitment Grievance", href: `${publicSiteBase}/recruitment` },
      ],
    },
    {
      title: "University Cells",
      links: [
        { label: "Digital Monitoring Cell (DMC)", href: "https://dmc.jntugv.edu.in/", external: true },
        { label: "IQAC", href: "https://iqac.jntugv.edu.in/", external: true },
        { label: "Incubation Center", href: "https://jntugvcev.edu.in/", external: true },
      ],
    },
    {
      title: "Student Corner",
      links: [
        { label: "Anti-Ragging", href: `${publicSiteBase}/anti-ragging` },
        { label: "NSS", href: "https://nss.jntugv.edu.in/", external: true },
        { label: "Sports & Fitness", href: "https://jntugvcev.edu.in/facilities/sports-fitness/", external: true },
        { label: "Music Club", href: "https://jntugvcev.edu.in/facilities/campus-life/music-club/", external: true },
        { label: "Student Activity Club", href: "https://jntugvcev.edu.in/facilities/campus-life/student-activity-club/", external: true },
      ],
    },
  ];

  if (checkingStoredSession) return null;

  return (
    <div className="admin-login-page">
      <header className="login-page-header">
        <div className="login-page-brand">
          <img src={logo} alt="JNTU-GV" />
          <div>
            <span className="login-header-logo-text">JNTU-GV</span>
            <strong>JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM</strong>
            <small>Vizianagaram-535 003, Andhra Pradesh | Established by Andhra Pradesh Act No.22 of 2021</small>
          </div>
        </div>
        <div className="login-page-header-meta">
          <Badge>Secure</Badge>
          <Badge>CMS</Badge>
          <Badge>RBAC</Badge>
        </div>
      </header>

      <main className="login-page-main">
        <section className="login-visual-panel" aria-label="JNTU-GV administration workspace">
          <img src={library} alt="JNTU-GV library" className="library-image" />
          <div className="library-panel-copy">
            <p className="library-panel-kicker">JNTU-GV Digital Administration</p>
            <h1>Official control for university publishing.</h1>
            <div className="library-panel-stats">
              <span><strong>RBAC</strong></span>
              <span><strong>CMS</strong></span>
              <span><strong>API</strong></span>
            </div>
          </div>
        </section>

        <section className="login-auth-panel" aria-label="Admin login">
          <div className="login-form">
            <p className="login-eyebrow">JNTU-GV Admin Console</p>
            <h2>Sign in</h2>
            <p className="login-subtitle">One workspace for university publishing and administration.</p>

            <div className="login-capability-grid" aria-label="Console capabilities">
              <Badge>Website</Badge>
              <Badge>Content</Badge>
              <Badge>Media</Badge>
              <Badge>Operations</Badge>
            </div>

            {erralert.message && (
              <span className={`login-alert login-alert-${erralert.type}`}>
                {erralert.message}
              </span>
            )}

            <Field
              id="admin-username"
              label="Username or email"
              placeholder="Enter username or organizational email"
              value={formData.username.toLowerCase()}
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                setFormData((prev) => ({ ...prev, username: value }));
              }}
              autoComplete="username"
              focused={focusField === "username"}
              onFocus={() => setFocusField("username")}
              onBlur={() => setFocusField("")}
            />

            <Field
              id="admin-password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange("password")}
              autoComplete="current-password"
              focused={focusField === "password"}
              onFocus={() => setFocusField("password")}
              onBlur={() => setFocusField("")}
            />

            <button className="btn-admin-login" onClick={login_handle} disabled={loading}>
              {loading ? (
                <span className="login-loading">
                  <span className="spinner" />
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <a href="/passwordreset" className="forgot-password">
              Forgot Password?
            </a>

            <div className="login-divider">OR</div>

            <button className="button-admin-login" onClick={handleGoogleLogin} disabled={loading}>
              <GoogleIconSVG />
              Login with JNTU-GV Google Workspace
            </button>

            <div className="login-security-note">
              <strong>Authorized users only.</strong>
            </div>
          </div>
        </section>
      </main>

      <footer className="login-page-footer">
        <div className="login-footer-contact">
          <h2>Contact Us</h2>
          <p>Jawaharlal Nehru Technological University-Gurajada Vizianagaram, Dwarapudi, Vizianagaram, Andhra Pradesh - 535 003, India.</p>
        </div>
        <div className="login-footer-grid">
          {footerColumns.map((column) => (
            <FooterColumn key={column.title} title={column.title} links={column.links} />
          ))}
        </div>
        <div className="login-footer-bottom">
          <a href={`${publicSiteBase}/privacy`}>Privacy & Policy</a>
          <span>Copyright (c) 2024 <a href={publicSiteBase}>JNTU-GV Vizianagaram</a>. All Rights Reserved.</span>
          <span>Designed, Developed and Maintained by <a href="https://dmc.jntugv.edu.in/" target="_blank" rel="noopener noreferrer">Digital Monitoring Cell, JNTU-GV</a>.</span>
        </div>
      </footer>
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
