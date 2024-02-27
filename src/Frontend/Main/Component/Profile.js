import React from 'react';
import { Avatar, Typography, Grid } from '@mui/material';
import hodimg from '../media/HOD.png'
import mods from './Logins/Login';

const Profile = () => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Avatar alt="User Avatar" src={hodimg} sx={{ width: 100, height: 100 }} />
      </Grid>
      <Grid item>
        <Typography variant="h4">{mods.uds.admin}'s Profile</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">Username: {mods.uds.admin}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">Role: {mods.uds.role}</Typography>
      </Grid>
    </Grid>
  );
};

export default Profile;
