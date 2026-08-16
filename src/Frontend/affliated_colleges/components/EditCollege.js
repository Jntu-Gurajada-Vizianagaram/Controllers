import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import api from '../../Main/apis_data/APIs';
import '../css/AffliatedColleges.css';

export default function EDIT({ college, onCancel, onSaved }) {
  const [form, setForm] = React.useState({
    college_code: college?.college_code || '',
    logo: college?.logo || '',
    college_name: college?.college_name || '',
    district: college?.district || college?.college_address || '',
    affiliation_type: college?.affiliation_type || 'Temporary',
    college_type: college?.college_type || 'Engineering',
    college_status: college?.college_status || college?.status || 'Affiliated',
    promote_to_university: Boolean(college?.promote_to_university || college?.promoteToUniversity),
    academic_year: college?.academic_year || college?.academicYear || '2026-27',
    autonomous_year: college?.autonomous_year || college?.autonomousYear || college?.AutonomousYear || '',
    principal_name: college?.principal_name || college?.principalName || college?.PrincipalName || '',
    principal_email: college?.principal_email || college?.principalEmail || college?.Email || '',
    principal_phone: college?.principal_phone || college?.principalPhone || college?.Phone || '',
    college_link: college?.college_link || '',
  });
  const [saving, setSaving] = React.useState(false);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${api.affliated_colleges_apis.update_college}/${college.id}`, form);
      onSaved?.();
    } catch (error) {
      alert(error?.response?.data?.error || 'Error updating college data');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper className="college-console-form" variant="outlined">
      <Box className="college-console-form-head">
        <Typography variant="h6">Edit College</Typography>
        <Button variant="outlined" startIcon={<FaTimes />} onClick={onCancel}>Close</Button>
      </Box>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <TextField fullWidth required label="Code" name="college_code" value={form.college_code} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth required label="College Name" name="college_name" value={form.college_name} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth required label="District" name="district" value={form.district} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="College Logo URL" name="logo" value={form.logo} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="College Type" name="college_type" value={form.college_type} onChange={updateField}>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Pharmacy">Pharmacy</MenuItem>
              <MenuItem value="Management">Management</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="Status" name="college_status" value={form.college_status} onChange={updateField}>
              <MenuItem value="Affiliated">Affiliated</MenuItem>
              <MenuItem value="Autonomous">Autonomous</MenuItem>
              <MenuItem value="University">University</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="Affiliation Type" name="affiliation_type" value={form.affiliation_type} onChange={updateField}>
              <MenuItem value="Permanent">Permanent</MenuItem>
              <MenuItem value="Temporary">Temporary</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Academic Year" name="academic_year" value={form.academic_year} onChange={updateField} placeholder="2026-27" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Autonomous Year" name="autonomous_year" value={form.autonomous_year} onChange={updateField} placeholder="2025" />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControlLabel
              className="college-console-checkbox"
              control={<Checkbox name="promote_to_university" checked={form.promote_to_university} onChange={updateField} />}
              label="Promote to University"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Website" name="college_link" value={form.college_link} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Principal Name" name="principal_name" value={form.principal_name} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Principal Office Email" name="principal_email" value={form.principal_email} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Principal Office Phone" name="principal_phone" value={form.principal_phone} onChange={updateField} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" startIcon={<FaSave />} disabled={saving || !form.college_code || !form.college_name || !form.district}>
              {saving ? 'Saving...' : 'Save College'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
