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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Link as RouterLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AllMenu from "./Menu";
import APIs from "../apis_data/APIs";
import jntugvlogo from "../media/jntugv.png";
import { useAuth } from "../../Authentications/AuthContext";
import { canAccessPage } from "../../Authentications/accessControl";
import "./Dashboard.css";

const drawerWidth = 292;

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

export default function Dashboard() {
  const user = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const menuItems = (AllMenu[roleMenuKey(user?.role)] || [])
    .filter((route) => canAccessPage(user?.role, route.to));

  const activeItem = menuItems.find((item) =>
    location.pathname === `/dashboard/${item.to}`,
  );

  React.useEffect(() => {
    document.title = `JNTUGV Admin | ${activeItem?.text || user?.name || "Dashboard"}`;
  }, [activeItem?.text, user?.name]);

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
      className="admin-sidebar"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            component="img"
            src={jntugvlogo}
            alt="JNTU-GV"
            sx={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "#fff",
              p: 0.4,
            }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" className="admin-sidebar-brand-title">
              JNTU-GV
            </Typography>
            <Typography variant="caption" className="admin-sidebar-brand-subtitle">
              Admin Control Centre
            </Typography>
          </Box>
          {!isDesktop && (
            <IconButton
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="admin-sidebar-close"
              sx={{ ml: "auto" }}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
        </Stack>
      </Box>

      <Box sx={{ px: 2.5, pb: 2 }}>
        <Box
          className="admin-user-card"
          sx={{
            p: 2,
            borderRadius: 3,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: "#f6b73c", color: "#081f3c", fontWeight: 800 }}>
              {getInitials(user?.name)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap className="admin-user-name">
                {user?.name || "Administrator"}
              </Typography>
              <Typography noWrap variant="caption" className="admin-user-email">
                {user?.email || "Signed in"}
              </Typography>
            </Box>
          </Stack>
          <Chip
            size="small"
            label={user?.role || "Admin"}
            className="admin-role-chip"
            sx={{
              mt: 1.5,
              fontWeight: 700,
            }}
            variant="outlined"
          />
        </Box>
      </Box>

      <Divider className="admin-sidebar-divider" />

      <Box sx={{ px: 1.5, py: 2, flex: 1, overflowY: "auto" }}>
        <Typography
          variant="overline"
          className="admin-menu-overline"
          sx={{ px: 1.5 }}
        >
          Workspace
        </Typography>
        <List sx={{ mt: 1 }}>
          {menuItems.map((route) => {
            const selected = location.pathname === `/dashboard/${route.to}`;
            return (
              <ListItem key={route.to} disablePadding sx={{ mb: 0.7 }}>
                <ListItemButton
                  component={RouterLink}
                  to={route.to}
                  onClick={() => setMobileOpen(false)}
                  selected={selected}
                  className={selected ? "admin-menu-item admin-menu-item-active" : "admin-menu-item"}
                  sx={{
                    minHeight: 48,
                    borderRadius: 2.5,
                  }}
                >
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText
                    primary={<span className="admin-menu-text">{route.text}</span>}
                    primaryTypographyProps={{
                      component: "span",
                      fontWeight: selected ? 800 : 600,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box className="admin-sidebar-footer" sx={{ p: 1.5 }}>
        <ListItemButton
          component={RouterLink}
          to="profile"
          onClick={() => setMobileOpen(false)}
          className="admin-menu-item"
          sx={{
            borderRadius: 2.5,
            mb: 1,
          }}
        >
          <ListItemIcon sx={{ minWidth: 42 }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={<span className="admin-menu-text">My Profile</span>} />
        </ListItemButton>
        <Button
          fullWidth
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          className="admin-logout-button"
          sx={{
            justifyContent: "flex-start",
            borderRadius: 2.5,
            py: 1.15,
            boxShadow: "none",
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f7fb" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          color: "#0f172a",
          bgcolor: "rgba(244,247,251,.86)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #dbe4f0",
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          {!isDesktop && (
            <IconButton
              edge="start"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 1.5 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <DashboardCustomizeIcon color="primary" />
              <Typography variant="h6" noWrap sx={{ color: "#0f172a", fontWeight: 800 }}>
                {activeItem?.text || "Dashboard"}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: "#475569" }} noWrap>
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
                color: "#0f172a",
                fontWeight: 700,
                "& .MuiChip-label": { fontWeight: 800 },
              }}
            />
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}>
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
            "& .MuiDrawer-paper": { width: drawerWidth, border: 0 },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        className="admin-dashboard-main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          pt: { xs: 11, sm: 12 },
          px: { xs: 1.5, md: 2.5, xl: 3 },
          pb: 4,
        }}
      >
        <Box
          className="admin-dashboard-content"
          sx={{
            maxWidth: "none",
            mx: "auto",
            p: { xs: 1.5, md: 2.5 },
            borderRadius: 4,
            bgcolor: "#fff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 22px 70px rgba(15, 23, 42, .08)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
