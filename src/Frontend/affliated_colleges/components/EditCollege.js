import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../css/AffliatedColleges.css";
import axios from 'axios';

const defaultTheme = createTheme();

export default function EDIT(props) {
  const { id, logo, college_name, college_address, college_link } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      logo: data.get('logo'),
      college_name: data.get('name'),
      college_address: data.get('address'),
      college_link: data.get('link')
    };
    
    try {
      const response = await axios.post(`http://localhost:8888/insert`, formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error Updating data:', error);
    }
    
  };

  return (
    <div className="main_div">
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            // display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main',marginLeft:'440px'}}>
            <CorporateFareIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit College
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,display:'flex' }}>
          <TextField
              margin="normal"
              fullWidth
              id="logo"
              name="id"
              label="College id"
              autoComplete="id"
              defaultValue={id}
            />
            <TextField
              margin="normal"
              fullWidth
              id="logo"
              name="logo"
              label="College Logo"
              autoComplete="logo"
              defaultValue={logo}
            />
            <TextField
              margin="normal"
              fullWidth
              name="name"
              type="text"
              id="name"
              label="College Name"
              autoComplete="name"
              defaultValue={college_name}
            />
            <TextField
              margin="normal"
              fullWidth
              name="address"
              type="text"  // Change type to "text"
              id="address"
              label="College Address"
              autoComplete="address"
              defaultValue={college_address}
            />
            <TextField
              margin="normal"
              fullWidth
              name="link"
              type="text"
              id="link"
              label="College Website Link"
              autoComplete="link"
              defaultValue={college_link}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              EDIT
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}