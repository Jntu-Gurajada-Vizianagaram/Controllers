import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Divider, Grid, Paper, Tooltip, Typography } from '@mui/material';
import React from 'react';
import hodimg from '../media/HOD.png';
import mods from './Logins/Login';

const Profile = () => {
  // Fallbacks in case localStorage is empty or malformed
  const username = mods?.uds?.admin || "Unknown User";
  const role = mods?.uds?.role || "Unknown Role";

  const handleEditProfile = () => {
    // Placeholder for edit profile functionality
    alert("Edit profile feature coming soon!");
  };

  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
        py: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          minWidth: 340,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        }}
      >
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              alt="User Avatar"
              src={hodimg}
              sx={{
                width: 110,
                height: 110,
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                mb: 1,
                border: '3px solid #1976d2',
                backgroundColor: '#fff',
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 80, color: '#1976d2' }} />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
              {username}'s Profile
            </Typography>
          </Grid>
          <Divider sx={{ width: '80%', my: 2 }} />
          <Grid item container spacing={1} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
                Username:
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {username}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
                Role:
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {role}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: '80%', my: 2 }} />
          <Grid item>
            <Tooltip title="Edit Profile" arrow>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEditProfile}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
                }}
              >
                Edit Profile
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
