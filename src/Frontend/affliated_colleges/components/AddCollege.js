import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Checkbox,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { FaPlus } from 'react-icons/fa';
import api from '../../Main/apis_data/APIs';
import '../css/AffliatedColleges.css';

const initialCollege = {
  college_code: '',
  logo: '',
  college_name: '',
  district: '',
  affiliation_type: 'Temporary',
  college_type: 'Engineering',
  college_status: 'Affiliated',
  promote_to_university: false,
  academic_year: '2026-27',
  autonomous_year: '',
  principal_name: '',
  principal_email: '',
  principal_phone: '',
  college_link: '',
};

export default function ADD() {
  const [college, setCollege] = React.useState(initialCollege);
  const [saving, setSaving] = React.useState(false);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setCollege((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await axios.post(api.affliated_colleges_apis.add_college, college);
      setCollege(initialCollege);
      alert('College added successfully');
    } catch (error) {
      alert(error?.response?.data?.error || 'Error inserting college data');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper className="college-console-form" variant="outlined">
      <Typography variant="h6">Add College</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <TextField fullWidth required label="Code" name="college_code" value={college.college_code} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth required label="College Name" name="college_name" value={college.college_name} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth required label="District" name="district" value={college.district} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="College Logo URL" name="logo" value={college.logo} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="College Type" name="college_type" value={college.college_type} onChange={updateField}>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Pharmacy">Pharmacy</MenuItem>
              <MenuItem value="Management">Management</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="Status" name="college_status" value={college.college_status} onChange={updateField}>
              <MenuItem value="Affiliated">Affiliated</MenuItem>
              <MenuItem value="Autonomous">Autonomous</MenuItem>
              <MenuItem value="University">University</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="Affiliation Type" name="affiliation_type" value={college.affiliation_type} onChange={updateField}>
              <MenuItem value="Permanent">Permanent</MenuItem>
              <MenuItem value="Temporary">Temporary</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Academic Year" name="academic_year" value={college.academic_year} onChange={updateField} placeholder="2026-27" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Autonomous Year" name="autonomous_year" value={college.autonomous_year} onChange={updateField} placeholder="2025" />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControlLabel
              className="college-console-checkbox"
              control={<Checkbox name="promote_to_university" checked={college.promote_to_university} onChange={updateField} />}
              label="Promote to University"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Website" name="college_link" value={college.college_link} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Principal Name" name="principal_name" value={college.principal_name} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Principal Office Email" name="principal_email" value={college.principal_email} onChange={updateField} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Principal Office Phone" name="principal_phone" value={college.principal_phone} onChange={updateField} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" startIcon={<FaPlus />} disabled={saving || !college.college_code || !college.college_name || !college.district}>
              {saving ? 'Saving...' : 'Add College'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
