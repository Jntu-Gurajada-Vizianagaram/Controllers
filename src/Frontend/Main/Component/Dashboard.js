import * as React from "react";
import All_Menu from "./Menu";
import mods from "./Logins/Login";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, Route, Link as RouterLink } from "react-router-dom";
import { ExitToApp, Logout } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import jntugvlogo from "../media/jntugv.png";
import { Button } from "@mui/material";

const drawerWidth = 240;

const menu = mods;

// console.log(menu);
const default_routes = [
  {
    route_text: "Profile Logout",
    route_link: "/profiles",
    route_icon: <ExitToApp />,
    route_fun: async () => {
      window.location.href = "/profiles";
    },
  },
  {
    route_text: "Logout",
    route_link: "/login",
    route_icon: <Logout />,
    route_fun: async () => {
      localStorage.clear();
    },
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== "open",})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== "open",})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {

  if(!menu.uds){
    window.location.href = '/login'
  }




  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  document.title = `JNTUGV | ${mods.uds.admin} | Dashboard`
  // console.log(All_Menu);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
              fontFamily: "Timesnewroman",
            }}
          >
            <a href="https://admin.jntugv.edu.in">
              <img src={jntugvlogo} width="70" height="70" alt="JNTU Logo" />
            </a>
            <a
              href="https://admin.jntugv.edu.in"
              style={{
                float: "right",
                marginTop: "0px",
                textDecoration: "none",
              }}
            >
              <h1 style={{ color: "white" }}>
                Jawaharlal Nehru Technological University - Gurajada,
                Vizianagaram
              </h1>
            </a>
          </Typography>
          <Stack direction="row" spacing={2}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                component={RouterLink}
                to='profile'
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Avatar src="/broken-image.jpg" />
                </ListItemIcon>
                <ListItemText
                  primary={mods.uds.admin}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader><h1 style={{textAlign:"center"}} >Main Menu</h1>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {All_Menu[mods.uds.role].map((route, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={route.route_fun}
                component={RouterLink}
                to={route.to}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText
                  primary={route.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {default_routes.map((route, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={route.route_fun}
                component={RouterLink}
                to={route.route_link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {route.route_icon}
                </ListItemIcon>
                <ListItemText
                  primary={route.route_text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      <Outlet />
      </Box>
    </Box>
  );
}
