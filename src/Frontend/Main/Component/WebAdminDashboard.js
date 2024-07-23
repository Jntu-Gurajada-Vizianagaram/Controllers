import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Webadmindashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState('About Us');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleListItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='absolute'
// sx={{
//   width:'1125px',
//   marginTop:'190px',
//   marginRight:'180px'
// }} 
open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"
          style={{
            width:"80%",
            display:"flex",
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center",
            gap:"30px",
            fontFamily:"Timesnewroman",
           }}>
          <a href="https://jntugv.edu.in">
                    <img src="https://dhondi.ai/logos/jntugv.png" width="80" height="80" alt="JNTU Logo" />
                </a>
                <a href="https://jntugv.edu.in" style={{float:"right",marginTop:"0px",textDecoration:"none"}}>
                    <h3 style={{color:"white"}}>Jawaharlal Nehru Technological University - Gurajada, Vizianagaram</h3>
          </a>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position:'absolute',
            color:'#1976d2'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
  <ListItem disablePadding>
    <ListItemButton className='listview' component={RouterLink} to='gallery'>
    <ListItemText primary={<span style={{ fontSize: '23px' }}>Gallery</span>} />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton className='listview' component={RouterLink} to='dmcupload'>
      <ListItemText primary={<span style={{ fontSize: '23px' }}>Add Photo</span>} />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton className='listview' component={RouterLink} to='help'>
      <ListItemText primary={<span style={{ fontSize: '23px' }}>Help</span>} />
    </ListItemButton>
  </ListItem>
</List>
<List>
  <ListItem disablePadding>
    <ListItemButton className='listview' component={RouterLink} to='/persons'>
      <ListItemText primary={<span style={{ fontSize: '23px' }}>Profile</span>} />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton className='listview' component={RouterLink} to='/'>
      <ListItemText primary={<span style={{ fontSize: '23px' }}>Logout</span>} />
    </ListItemButton>
  </ListItem>
</List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}