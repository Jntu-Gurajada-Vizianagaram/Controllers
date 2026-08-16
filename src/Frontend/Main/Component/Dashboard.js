import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
  FaBars,
  FaChevronLeft,
  FaSignOutAlt,
  FaThLarge,
  FaUser,
} from "react-icons/fa";
import { Link as RouterLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AllMenu from "./Menu";
import APIs from "../apis_data/APIs";
import jntugvlogo from "../media/jntugv.png";
import { useAuth } from "../../Authentications/AuthContext";
import { canAccessPage } from "../../Authentications/accessControl";
import "./Dashboard.css";

const drawerWidth = 292;
const collapsedDrawerWidth = 72;

const roleMenuKey = (role) => {
  const normalizedRole = String(role || "").trim().toLowerCase();
  const match = Object.keys(AllMenu).find(
    (key) => key.toLowerCase() === normalizedRole,
  );
  return match || role || "Admin";
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "JU";

const groupMenuItems = (items = []) =>
  items.reduce((groups, route) => {
    const group = route.group || "Workspace";
    if (!groups.some((entry) => entry.group === group)) {
      groups.push({ group, items: [] });
    }
    groups.find((entry) => entry.group === group).items.push(route);
    return groups;
  }, []);

export default function Dashboard() {
  const user = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = React.useState(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    return savedState === null ? true : savedState === "true";
  });
  const [uiScale, setUiScale] = React.useState(
    () => localStorage.getItem("adminUiScale") || "compact",
  );
  const activeDrawerWidth =
    isDesktop && drawerCollapsed ? collapsedDrawerWidth : drawerWidth;

  const menuItems = (AllMenu[roleMenuKey(user?.role)] || [])
    .filter((route) => canAccessPage(user?.role, route.to));
  const groupedMenuItems = groupMenuItems(menuItems);

  const activeItem = menuItems.find((item) =>
    location.pathname === `/dashboard/${item.to}`,
  );

  React.useEffect(() => {
    document.title = `JNTUGV Admin | ${activeItem?.text || user?.name || "Dashboard"}`;
  }, [activeItem?.text, user?.name]);

  const changeUiScale = (scale) => {
    setUiScale(scale);
    localStorage.setItem("adminUiScale", scale);
  };

  const toggleDesktopDrawer = () => {
    setDrawerCollapsed((current) => {
      const next = !current;
      localStorage.setItem("adminSidebarCollapsed", String(next));
      return next;
    });
  };

  const handleLogout = async () => {
    try {
      await axios.post(APIs.admin_apis.logout);
    } finally {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  const drawerContent = (
    <Box
      className={drawerCollapsed && isDesktop ? "admin-sidebar-shell admin-sidebar-collapsed" : "admin-sidebar-shell"}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: "#0f172a",
        background: "#ffffff",
        borderRight: "1px solid #dbe4f0",
      }}
    >
      <Box sx={{ p: drawerCollapsed && isDesktop ? 1 : 2 }}>
        <Stack
          direction={drawerCollapsed && isDesktop ? "column" : "row"}
          alignItems="center"
          spacing={drawerCollapsed && isDesktop ? 0.75 : 1.25}
          justifyContent={drawerCollapsed && isDesktop ? "center" : "flex-start"}
          className="admin-sidebar-brand-row"
        >
          <Box
            component="img"
            src={jntugvlogo}
            alt="JNTU-GV"
            sx={{
              width: drawerCollapsed && isDesktop ? 42 : 48,
              height: drawerCollapsed && isDesktop ? 42 : 48,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid #dbe4f0",
              p: 0.4,
              
            }}
          />
          {!(drawerCollapsed && isDesktop) && (
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              JNTU-GV
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Admin Control Centre
            </Typography>
          </Box>
          )}
          {isDesktop && (
            <IconButton
              aria-label={drawerCollapsed ? "Expand menu" : "Minimize menu"}
              onClick={toggleDesktopDrawer}
              className="admin-sidebar-collapse-button"
              sx={{ ml: drawerCollapsed ? 0 : "auto", color: "#0f172a" }}
            >
              {drawerCollapsed ? <FaBars /> : <FaChevronLeft />}
            </IconButton>
          )}
          {!isDesktop && (
            <IconButton
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              sx={{ ml: "auto", color: "#0f172a" }}
            >
              <FaChevronLeft />
            </IconButton>
          )}
        </Stack>
      </Box>

      {!(drawerCollapsed && isDesktop) && (
      <Box sx={{ px: 2.25, pb: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: "#0f5ea8", color: "#ffffff", fontWeight: 800 }}>
              {getInitials(user?.name)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ fontWeight: 700 }}>
                {user?.name || "Administrator"}
              </Typography>
              <Typography noWrap variant="caption" sx={{ color: "#64748b" }}>
                {user?.email || "Signed in"}
              </Typography>
            </Box>
          </Stack>
          <Chip
            size="small"
            label={user?.role || "Admin"}
            sx={{
              mt: 1.5,
              color: "#075985",
              borderColor: "#bfdbfe",
              background: "#eff6ff",
              fontWeight: 700,
            }}
            variant="outlined"
          />
        </Box>
      </Box>
      )}

      <Divider sx={{ borderColor: "#e2e8f0" }} />

      <Box
        sx={{
          px: drawerCollapsed && isDesktop ? 0.75 : 1.25,
          py: drawerCollapsed && isDesktop ? 1 : 1.25,
          flex: 1,
          overflowY: "auto",
        }}
      >
        <List className="admin-sidebar-menu-list">
          {groupedMenuItems.map((section) => (
            <Box className="admin-sidebar-menu-section" key={section.group}>
              {!(drawerCollapsed && isDesktop) && (
              <Typography variant="overline" className="admin-menu-overline">
                {section.group}
              </Typography>
              )}
              {section.items.map((route) => {
                const selected = location.pathname === `/dashboard/${route.to}`;
                const menuButton = (
                  <ListItem key={route.to} disablePadding sx={{ mb: 0.55 }}>
                    <ListItemButton
                      className={
                        selected
                          ? "admin-sidebar-menu-button admin-sidebar-menu-button-v2 admin-sidebar-menu-button-active"
                          : "admin-sidebar-menu-button admin-sidebar-menu-button-v2"
                      }
                      component={RouterLink}
                      to={route.to}
                      onClick={() => setMobileOpen(false)}
                      selected={selected}
                    >
                      <ListItemIcon className="admin-sidebar-menu-icon">{route.icon}</ListItemIcon>
                      {!(drawerCollapsed && isDesktop) && (
                      <ListItemText
                        primary={route.text}
                        className="admin-sidebar-menu-text"
                        primaryTypographyProps={{
                          component: "span",
                          noWrap: true,
                          fontSize: "0.82rem",
                        }}
                      />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
                return drawerCollapsed && isDesktop ? (
                  <Tooltip key={route.to} title={route.text} placement="right">
                    {menuButton}
                  </Tooltip>
                ) : menuButton;
              })}
            </Box>
          ))}
        </List>
      </Box>

      <Box sx={{ p: drawerCollapsed && isDesktop ? 0.75 : 1.25, borderTop: "1px solid #e2e8f0" }}>
        <Tooltip title="My Profile" placement="right" disableHoverListener={!(drawerCollapsed && isDesktop)}>
        <ListItemButton
          className="admin-sidebar-profile-link"
          component={RouterLink}
          to="profile"
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon className="admin-sidebar-profile-icon">
            <FaUser />
          </ListItemIcon>
          {!(drawerCollapsed && isDesktop) && (
          <ListItemText primary="My Profile" />
          )}
        </ListItemButton>
        </Tooltip>
        {drawerCollapsed && isDesktop ? (
          <Tooltip title="Logout" placement="right">
            <IconButton className="admin-sidebar-logout-icon" onClick={handleLogout} aria-label="Logout">
              <FaSignOutAlt />
            </IconButton>
          </Tooltip>
        ) : (
        <Button
          fullWidth
          variant="contained"
          startIcon={<FaSignOutAlt />}
          onClick={handleLogout}
          sx={{
            justifyContent: "flex-start",
            borderRadius: 1.5,
            py: 1.15,
            background: "#b42318",
            boxShadow: "none",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { background: "#8f1d14", boxShadow: "none" },
          }}
        >
          Logout
        </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#eef3f8" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${activeDrawerWidth}px)` },
          ml: { lg: `${activeDrawerWidth}px` },
          color: "#0f172a",
          bgcolor: "rgba(255,255,255,.9)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #dbe4f0",
        }}
      >
        <Toolbar sx={{ minHeight: 58, px: { xs: 1.25, md: 2 } }}>
          {!isDesktop && (
            <IconButton
              edge="start"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 1.5 }}
            >
              <FaBars />
            </IconButton>
          )}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <FaThLarge className="admin-toolbar-icon" />
              <Typography variant="h6" noWrap sx={{ fontWeight: 800, fontSize: "1rem" }}>
                {activeItem?.text || "Dashboard"}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: "0.82rem" }}>
              Jawaharlal Nehru Technological University - Gurajada Vizianagaram
            </Typography>
          </Box>
          <Tooltip title={user?.email || ""}>
            <Chip
              avatar={<Avatar>{getInitials(user?.name)}</Avatar>}
              label={user?.name || "Administrator"}
              sx={{
                display: { xs: "none", sm: "flex" },
                borderRadius: 999,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                fontWeight: 700,
                fontSize: "0.78rem",
              }}
            />
          </Tooltip>
          {isDesktop && (
            <Stack direction="row" spacing={0.5} className="admin-view-scale">
              {["compact", "comfortable", "large"].map((scale) => (
                <Button
                  key={scale}
                  size="small"
                  variant={uiScale === scale ? "contained" : "outlined"}
                  onClick={() => changeUiScale(scale)}
                >
                  {scale === "compact" ? "S" : scale === "comfortable" ? "M" : "L"}
                </Button>
              ))}
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { lg: activeDrawerWidth }, flexShrink: { lg: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, border: 0 },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              width: activeDrawerWidth,
              border: 0,
              overflowX: "hidden",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.shorter,
              }),
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${activeDrawerWidth}px)` },
          minHeight: "100vh",
          pt: { xs: 8.5, sm: 9 },
          px: { xs: 1.25, md: 2 },
          pb: 2,
        }}
        className="admin-dashboard-main"
      >
        <Box
          className={`admin-dashboard-content admin-dashboard-scale-${uiScale}`}
          sx={{
            width: "100%",
            maxWidth: "none",
            mx: 0,
            p: { xs: 1.25, md: 2 },
            borderRadius: 2,
            bgcolor: "#fff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 16px 44px rgba(15, 23, 42, .06)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
