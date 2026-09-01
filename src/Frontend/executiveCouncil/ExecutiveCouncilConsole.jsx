import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import APIs from '../Main/apis_data/APIs';
import { useAuth } from '../Authentications/AuthContext';
import { canDeleteRecords } from '../Authentications/accessControl';
import { ConsolePage } from '../consoles/ConsolePage';

const fallbackImage = 'https://dummyimage.com/900x600/f1f5f9/1e293b&text=JNTU-GV';

const emptyForm = {
  name: '',
  roleInEc: 'Member',
  designation: '',
  affiliation: '',
  image: '',
  sortOrder: 0,
  isActive: true,
};

const normalizeMember = (member = {}) => ({
  id: member.id,
  name: member.name || '',
  roleInEc: member.roleInEc || member.role_in_ec || 'Member',
  designation: member.designation || '',
  affiliation: member.affiliation || '',
  image: member.image || member.image_url || '',
  sortOrder: Number(member.sortOrder ?? member.sort_order ?? 0),
  isActive: member.isActive ?? member.is_active ?? true,
});

export default function ExecutiveCouncilConsole() {
  const user = useAuth();
  const canDelete = canDeleteRecords(user?.role);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sortedMembers = useMemo(
    () =>
      [...members].sort((a, b) => {
        const orderDifference = Number(a.sortOrder || 0) - Number(b.sortOrder || 0);
        return orderDifference || String(a.name).localeCompare(String(b.name));
      }),
    [members],
  );

  const loadMembers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(APIs.site_apis.admin_executive_council);
      setMembers(Array.isArray(response.data) ? response.data.map(normalizeMember) : []);
    } catch (loadError) {
      setError(loadError.response?.data?.error || 'Unable to load Executive Council members');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleFieldChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
  };

  const handleImageFileChange = (event) => {
    setImageFile(event.target.files?.[0] || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    const payload = {
      name: form.name.trim(),
      roleInEc: form.roleInEc.trim() || 'Member',
      designation: form.designation.trim(),
      affiliation: form.affiliation.trim(),
      image: form.image.trim(),
      sortOrder: Number(form.sortOrder || 0),
      isActive: Boolean(form.isActive),
    };

    if (!payload.name || !payload.designation || !payload.affiliation) {
      setError('Name, designation, and affiliation are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('roleInEc', payload.roleInEc);
    formData.append('designation', payload.designation);
    formData.append('affiliation', payload.affiliation);
    formData.append('image', payload.image);
    formData.append('sortOrder', String(payload.sortOrder));
    formData.append('isActive', String(payload.isActive));
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    try {
      if (editingId) {
        await axios.put(`${APIs.site_apis.admin_executive_council}/${editingId}`, formData);
        setMessage('Executive Council member updated');
      } else {
        await axios.post(APIs.site_apis.admin_executive_council, formData);
        setMessage('Executive Council member added');
      }
      resetForm();
      loadMembers();
    } catch (submitError) {
      setError(submitError.response?.data?.error || 'Unable to save Executive Council member');
    }
  };

  const handleEdit = (member) => {
    const normalized = normalizeMember(member);
    setEditingId(normalized.id);
    setForm({
      name: normalized.name,
      roleInEc: normalized.roleInEc,
      designation: normalized.designation,
      affiliation: normalized.affiliation,
      image: normalized.image,
      sortOrder: normalized.sortOrder,
      isActive: Boolean(normalized.isActive),
    });
    setImageFile(null);
  };

  const handleDelete = async (member) => {
    if (!window.confirm(`Delete "${member.name}" from Executive Council?`)) return;

    setMessage('');
    setError('');
    try {
      await axios.delete(`${APIs.site_apis.admin_executive_council}/${member.id}`);
      setMessage('Executive Council member deleted');
      if (editingId === member.id) resetForm();
      loadMembers();
    } catch (deleteError) {
      setError(deleteError.response?.data?.error || 'Unable to delete Executive Council member');
    }
  };

  return (
    <ConsolePage
      title="Executive Council Manager"
      description="Create, edit, sort, publish, and hide Executive Council members shown on the public website."
    >
      {message ? <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert> : null}
      {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 3, mb: 3 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={2}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: '#475569', fontWeight: 800 }}>
              Administrative CMS
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#111827' }}>
              {editingId ? 'Edit council member' : 'Add council member'}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={resetForm} sx={{ borderRadius: 2, textTransform: 'none' }}>
            {editingId ? 'Reset edit' : 'Clear form'}
          </Button>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2, mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleFieldChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Role in EC"
                name="roleInEc"
                value={form.roleInEc}
                onChange={handleFieldChange}
                placeholder="Chairperson / Secretary / Member"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Designation" name="designation" value={form.designation} onChange={handleFieldChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="College / Society / Administration" name="affiliation" value={form.affiliation} onChange={handleFieldChange} required />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={form.image}
                onChange={handleFieldChange}
                placeholder="Paste image link, or upload a file below"
                helperText="If both are provided, uploaded image will be used."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Sort Order" name="sortOrder" type="number" value={form.sortOrder} onChange={handleFieldChange} />
            </Grid>
            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', sm: 'center' }}>
                <Button component="label" variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>
                  Upload image
                  <input type="file" accept="image/*" hidden onChange={handleImageFileChange} />
                </Button>
                <Typography variant="body2" sx={{ color: '#475569', fontWeight: 700 }}>
                  {imageFile ? imageFile.name : 'No image file selected'}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <FormControlLabel
            control={<Checkbox name="isActive" checked={Boolean(form.isActive)} onChange={handleFieldChange} />}
            label="Publish on public website"
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button type="submit" variant="contained" sx={{ borderRadius: 2, textTransform: 'none' }}>
              {editingId ? 'Update member' : 'Save member'}
            </Button>
            <Button type="button" variant="outlined" onClick={resetForm} sx={{ borderRadius: 2, textTransform: 'none' }}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1.5} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827' }}>
            Council roster
          </Typography>
          <Button variant="text" onClick={loadMembers} sx={{ textTransform: 'none' }}>
            Refresh
          </Button>
        </Stack>

        {isLoading ? <Alert severity="info">Loading Executive Council members...</Alert> : null}
        {!isLoading && !sortedMembers.length ? (
          <Alert severity="warning">No Executive Council members found. Add the first member above.</Alert>
        ) : null}

        <Grid container spacing={2}>
          {sortedMembers.map((member) => (
            <Grid item xs={12} md={6} xl={4} key={member.id}>
              <Card sx={{ height: '100%', borderRadius: 3, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={member.image || fallbackImage}
                  alt={member.name}
                  sx={{ objectFit: 'cover', bgcolor: '#f8fafc' }}
                />
                <CardContent sx={{ display: 'grid', gap: 1.25 }}>
                  <Typography variant="overline" sx={{ fontWeight: 800, color: '#6b7280' }}>
                    {member.roleInEc || 'Member'} · {member.isActive ? 'Published' : 'Hidden'}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827' }}>
                    {member.name}
                  </Typography>
                  <Box>
                    <Typography variant="caption" sx={{ display: 'block', color: '#64748b', fontWeight: 700 }}>
                      Designation
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#111827' }}>{member.designation}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ display: 'block', color: '#64748b', fontWeight: 700 }}>
                      College / Society / Administration
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#111827' }}>{member.affiliation}</Typography>
                  </Box>
                  <Divider />
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Button size="small" variant="contained" onClick={() => handleEdit(member)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                      Edit
                    </Button>
                    {canDelete ? (
                      <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(member)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                        Delete
                      </Button>
                    ) : null}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </ConsolePage>
  );
}
