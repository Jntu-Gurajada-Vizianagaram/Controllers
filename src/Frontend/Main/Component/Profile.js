import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAuth } from '../../Authentications/AuthContext';

const Profile = () => {
  const user = useAuth();
  const username = user?.name || 'Unknown User';
  const role = user?.role || 'Unknown Role';

  const details = [
    {
      icon: <BadgeIcon color="primary" />,
      label: 'Display name',
      value: username,
    },
    {
      icon: <EmailIcon color="primary" />,
      label: 'Organizational email',
      value: user?.email || 'Not available',
    },
    {
      icon: <VerifiedUserIcon color="primary" />,
      label: 'Access role',
      value: role,
    },
  ];

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          overflow: 'hidden',
          borderRadius: 4,
          border: '1px solid #e2e8f0',
        }}
      >
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            color: '#fff',
            background:
              'linear-gradient(135deg, #082044 0%, #0c4a8f 58%, #1d74c7 100%)',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Avatar
              sx={{
                width: 88,
                height: 88,
                bgcolor: '#fff',
                color: '#0c4a8f',
                border: '4px solid rgba(255,255,255,.35)',
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 64 }} />
            </Avatar>
            <Box>
              <Typography variant="overline" sx={{ color: 'rgba(255,255,255,.72)', fontWeight: 800 }}>
                Signed-in administrator
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
                {username}
              </Typography>
              <Chip
                label={role}
                sx={{
                  mt: 1.3,
                  color: '#082044',
                  bgcolor: '#fff',
                  fontWeight: 800,
                }}
              />
            </Box>
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
            Account information
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            This profile is used for admin console permissions and audit visibility.
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2.5}>
            {details.map((item) => (
              <Grid item xs={12} md={4} key={item.label}>
                <Box
                  sx={{
                    height: '100%',
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
                    {item.icon}
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                      {item.label}
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontWeight: 800, wordBreak: 'break-word' }}>
                    {item.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
