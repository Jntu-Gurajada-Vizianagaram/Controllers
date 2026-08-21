import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaIdBadge, FaSave, FaUserTie } from 'react-icons/fa';
import { useAuth } from '../../Authentications/AuthContext';
import APIs from '../apis_data/APIs';

const emptyProfile = {
  name: '',
  username: '',
  profile_type: 'Administrator',
  designation: '',
  department: '',
  unit: '',
  phone: '',
  about: '',
  role: '',
  public_url: '',
  visibility: 'private',
  status: 'active',
};

const Profile = () => {
  const user = useAuth();
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(APIs.admin_apis.profile_me);
        if (isMounted) setProfile({ ...emptyProfile, ...response.data });
      } catch (error) {
        if (isMounted) {
          setProfile({
            ...emptyProfile,
            name: user?.name || '',
            username: user?.email || '',
            role: user?.role || '',
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [user?.email, user?.name, user?.role]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const response = await axios.put(APIs.admin_apis.profile_me, profile);
      setProfile({ ...emptyProfile, ...response.data });
    } catch (error) {
      alert(error?.response?.data?.error || 'Unable to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: 2, border: '1px solid #e2e8f0' }}>
        <Box sx={{ p: { xs: 2.5, md: 3 }, color: '#fff', background: 'linear-gradient(135deg, #082044 0%, #0c4a8f 100%)' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Box sx={{ width: 64, height: 64, display: 'grid', placeItems: 'center', borderRadius: 2, bgcolor: 'rgba(255,255,255,.14)' }}>
              <FaUserTie size={30} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="overline" sx={{ color: 'rgba(255,255,255,.72)', fontWeight: 900 }}>
                University profile
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1.15 }}>
                {profile.name || user?.name || 'Profile'}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                <Chip size="small" label={profile.role || user?.role || 'User'} sx={{ bgcolor: '#fff', color: '#082044', fontWeight: 900 }} />
                <Chip size="small" label={profile.profile_type || 'Administrator'} sx={{ bgcolor: 'rgba(255,255,255,.16)', color: '#fff', fontWeight: 800 }} />
              </Stack>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 2.5, md: 3 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <InfoTile icon={<FaIdBadge />} label="Display name" value={profile.name || 'Not set'} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoTile icon={<FaEnvelope />} label="Organizational email" value={profile.username || 'Not set'} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoTile icon={<FaUserTie />} label="Profile type" value={profile.profile_type || 'Not set'} />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
              Profile details
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Used for administrator, director, and university professional identity across the console API.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Full name" name="name" value={profile.name || ''} onChange={updateField} disabled={loading} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Email" value={profile.username || ''} disabled />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Profile type" name="profile_type" value={profile.profile_type || ''} onChange={updateField} disabled={loading} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Designation" name="designation" value={profile.designation || ''} onChange={updateField} disabled={loading} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Department" name="department" value={profile.department || ''} onChange={updateField} disabled={loading} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Unit / Office" name="unit" value={profile.unit || ''} onChange={updateField} disabled={loading} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Phone" name="phone" value={profile.phone || ''} onChange={updateField} disabled={loading} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Public profile URL" name="public_url" value={profile.public_url || ''} onChange={updateField} disabled={loading} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline minRows={4} label="About" name="about" value={profile.about || ''} onChange={updateField} disabled={loading} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" startIcon={<FaSave />} onClick={saveProfile} disabled={saving || loading}>
                  {saving ? 'Saving...' : 'Save Profile'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const InfoTile = ({ icon, label, value }) => (
  <Box sx={{ height: '100%', p: 2, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
    <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 0.75, color: '#0c4a8f' }}>
      {icon}
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 800 }}>
        {label}
      </Typography>
    </Stack>
    <Typography sx={{ fontWeight: 900, wordBreak: 'break-word' }}>{value}</Typography>
  </Box>
);

export default Profile;
