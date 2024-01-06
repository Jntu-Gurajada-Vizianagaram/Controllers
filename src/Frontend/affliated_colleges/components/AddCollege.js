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

export default function ADD() {
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
      const response = await axios.post('http://localhost:3001/insert', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div className="main_div">
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            // display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main',marginLeft:'490px'}}>
            <CorporateFareIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add College
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,display:'flex' }}>
            <TextField
              margin="normal"
              fullWidth
              id="logo"
              name="logo"
              label="College Logo"
              autoComplete="logo"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="name"
              type="text"
              id="name"
              label="College Name"
              autoComplete="name"
            />
            <TextField
              margin="normal"
              fullWidth
              name="address"
              type="textarea"
              id="address"
              label="College Address"
              autoComplete="address"
            />
            <TextField
              margin="normal"
              fullWidth
              name="link"
              type="text"
              id="link"
              label="College Website Link"
              autoComplete="link"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ADD
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}