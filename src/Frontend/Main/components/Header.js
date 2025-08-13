import React from "react";
import { BsStopwatchFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import logo from "../media/jntugv.jpg";

const styles = {
  headerMain: {
    width: "80vw",
    left: 0,
    padding: "0 0 10px 0",
    position: "sticky",
    top: 0,
    zIndex: 100,
    transition: "box-shadow 0.3s",
    boxSizing: "border-box",
  },
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0 auto",
    padding: "18px 2vw 12px 2vw",
    flexWrap: "wrap",
    gap: 16,
    boxSizing: "border-box",
  },
  logo: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  logoImg: {
    borderRadius: "50%",
    width: 80,
    height: 80,
    objectFit: "cover",
    background: "#fff",
    transition: "box-shadow 0.2s, border 0.2s, transform 0.2s",
    cursor: "pointer",
  },
  logoName: {
    flex: "1 1 350px",
    minWidth: 180,
    margin: "0 16px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 2,
    userSelect: "none",
  },
  teluguName: {
    fontFamily: "'Noto Sans Telugu', 'Montserrat', 'Arial', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#0a3d62",
    margin: 0,
    background: "none",
    border: "none",
    whiteSpace: "pre-wrap",
    letterSpacing: 1,
    textShadow: "0 1px 0 #dfe6e9",
  },
  hindiName: {
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#0a3d62",
    margin: 0,
    background: "none",
    border: "none",
    whiteSpace: "pre-wrap",
    letterSpacing: 1,
    textShadow: "0 1px 0 #dfe6e9",
  },
  englishName: {
    fontFamily: "'Montserrat', 'Arial', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#222f3e",
    margin: 0,
    background: "none",
    border: "none",
    whiteSpace: "pre-wrap",
    letterSpacing: 1,
    textShadow: "0 1px 0 #dfe6e9",
  },
  hr: {
    border: "none",
    borderTop: "1.5px solid #b2bec3",
    margin: "7px 0",
    width: "100%",
  },
  contactHeader: {
    flex: "0 0 270px",
    minWidth: 180,
    // background: "linear-gradient(120deg, #f1f2f6 60%, #eaf6fb 100%)",
    borderRadius: 14,
    // boxShadow: "0 2px 12px rgba(44,62,80,0.10)",
    padding: "14px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    fontSize: 15,
    color: "#222f3e",
    alignItems: "flex-start",
    marginLeft: 16,
    transition: "background 0.2s, box-shadow 0.2s",
    position: "relative",
    minHeight: 100,
    boxSizing: "border-box",
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "'Montserrat', 'Arial', sans-serif",
    fontWeight: 400,
    margin: 0,
    background: "none",
    border: "none",
    whiteSpace: "pre-wrap",
    lineHeight: 1.5,
    transition: "background 0.2s",
    borderRadius: 6,
    padding: "2px 0",
  },
  icon: {
    color: "#0a3d62",
    fontSize: 20,
    verticalAlign: "middle",
    marginRight: 2,
  },
  officeTime: {
    color: "#0984e3",
    fontWeight: 600,
    fontSize: 15,
  },
  mailLink: {
    color: "#0a3d62",
    textDecoration: "underline",
    marginLeft: 4,
    fontWeight: 600,
    transition: "color 0.2s",
    outline: "none",
    wordBreak: "break-all",
  },
  mailLinkHover: {
    color: "#0984e3",
    textDecoration: "underline",
  },
  // Responsive styles
  "@media (maxWidth: 900px)": {
    header: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: 8,
      padding: "12px 2vw 8px 2vw",
    },
    logoName: {
      margin: "8px 0",
    },
    contactHeader: {
      marginLeft: 0,
      marginTop: 10,
      width: "100%",
      minWidth: 0,
    },
  },
};

function useHover() {
  // Custom hook for hover effect on mail links
  const [hovered, setHovered] = React.useState(false);
  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => setHovered(false);
  return [hovered, onMouseEnter, onMouseLeave];
}

// Responsive wrapper for inline styles
function useResponsiveStyles() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 900);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return {
      ...styles,
      header: { ...styles.header, flexDirection: "column", alignItems: "stretch", gap: 8, padding: "12px 2vw 8px 2vw" },
      logoName: { ...styles.logoName, margin: "8px 0" },
      contactHeader: { ...styles.contactHeader, marginLeft: 0, marginTop: 10, width: "100%", minWidth: 0 },
    };
  }
  return styles;
}

const Header = () => {
  const [hover1, onMail1Enter, onMail1Leave] = useHover();
  const [hover2, onMail2Enter, onMail2Leave] = useHover();
  const responsiveStyles = useResponsiveStyles();

  return (
    <div style={responsiveStyles.headerMain}>
      <div style={responsiveStyles.header}>
        <div
          style={responsiveStyles.logo}
          tabIndex={0}
          title="JNTUGV Home"
          onClick={() => window.open("https://jntugv.edu.in", "_blank")}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              window.open("https://jntugv.edu.in", "_blank");
            }
          }}
        >
          <img
            src={logo}
            alt="JNTU LOGO"
            style={responsiveStyles.logoImg}
            width={80}
            height={80}
            draggable={false}
          />
        </div>
        <div style={responsiveStyles.logoName}>
          <div style={responsiveStyles.teluguName}>
            జవహర్‌లాల్ నెహ్రూ సాంకేతిక విశ్వవిద్యాలయం గురజాడ విజయనగరం
          </div>
          <hr style={responsiveStyles.hr} />
          <div style={responsiveStyles.englishName}>
            JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM
          </div>
          <hr style={responsiveStyles.hr} />
          <div style={responsiveStyles.hindiName}>
            जवाहरलाल नेहरू प्रौद्योगिकी विश्वविद्यालय गुरजाडा विजयनगरम
          </div>
        </div>
        <div style={responsiveStyles.contactHeader}>
          <div style={responsiveStyles.contactRow}>
            <GrMail style={responsiveStyles.icon} aria-label="Support Email" />
            <span style={{ color: "#636e72" }}>|</span>
            <span>Email:</span>
            <a
              href="mailto:support@jntugv.edu.in"
              style={{
                ...responsiveStyles.mailLink,
                ...(hover1 ? responsiveStyles.mailLinkHover : {}),
              }}
              onMouseEnter={onMail1Enter}
              onMouseLeave={onMail1Leave}
              tabIndex={0}
              aria-label="Email support@jntugv.edu.in"
            >
              support@jntugv.edu.in
            </a>
          </div>
          <hr style={{ ...responsiveStyles.hr, margin: "4px 0" }} />
          <div style={responsiveStyles.contactRow}>
            <GrMail style={responsiveStyles.icon} aria-label="Enquiry Email" />
            <span style={{ color: "#636e72" }}>|</span>
            <span>Email:</span>
            <a
              href="mailto:enquiry@jntugv.edu.in"
              style={{
                ...responsiveStyles.mailLink,
                ...(hover2 ? responsiveStyles.mailLinkHover : {}),
              }}
              onMouseEnter={onMail2Enter}
              onMouseLeave={onMail2Leave}
              tabIndex={0}
              aria-label="Email enquiry@jntugv.edu.in"
            >
              enquiry@jntugv.edu.in
            </a>
          </div>
          <div style={responsiveStyles.contactRow}>
            <BsStopwatchFill style={responsiveStyles.icon} aria-label="Office Timings" />
            <span style={{ color: "#636e72" }}>|</span>
            <span>Office Timings:</span>
            <span style={responsiveStyles.officeTime}>
              Mon-Sat : 10:00 AM to 5:00 PM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
