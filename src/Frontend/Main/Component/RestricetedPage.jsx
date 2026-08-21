import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import APIs from '../apis_data/APIs';

const RestrictedPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(APIs.admin_apis.logout);
    } finally {
      localStorage.clear();
      navigate('/login', { replace: true });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'grid',
        placeItems: 'center',
        p: { xs: 2, md: 4 },
        bgcolor: '#f4f7fb',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 560,
          p: { xs: 3, md: 4 },
          textAlign: 'center',
          borderRadius: 4,
          border: '1px solid #e2e8f0',
          boxShadow: '0 22px 70px rgba(15, 23, 42, .08)',
        }}
      >
        <Box
          sx={{
            width: 76,
            height: 76,
            mx: 'auto',
            mb: 2,
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            color: '#0c4a8f',
            bgcolor: '#e8f2ff',
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 38 }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
          Access restricted
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Your current role does not have permission to open this page. Use your dashboard menu to access the sections assigned to you.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
          <Button
            variant="contained"
            startIcon={<SpaceDashboardIcon />}
            onClick={() => navigate('/dashboard', { replace: true })}
            sx={{ borderRadius: 2.5, textTransform: 'none', fontWeight: 800 }}
          >
            Go to dashboard
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderRadius: 2.5, textTransform: 'none', fontWeight: 800 }}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default RestrictedPage;
