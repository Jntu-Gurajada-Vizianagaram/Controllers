import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const defaultMembers = [
  {
    id: 1,
    name: 'Prof. V. V. Subba Rao',
    roleInEc: 'Chairperson',
    designation: 'Vice-Chancellor',
    affiliation: 'JNTU-GV Administration',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Prof. D. Rajya Lakshmi',
    roleInEc: 'Secretary',
    designation: 'Registrar',
    affiliation: 'University Administration',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Prof. G. Jaya Suma',
    roleInEc: 'Member',
    designation: 'Director, Academic Audit & Planning',
    affiliation: 'Directorates, JNTU-GV',
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Prof. K. Chandra Bhusan Rao',
    roleInEc: 'Member',
    designation: 'Principal, Constituent College',
    affiliation: 'College of Engineering Vizianagaram (A)',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Dr. G. Ramesh',
    roleInEc: 'Member',
    designation: 'Dean, Infrastructure & Facilities',
    affiliation: 'University Infrastructure Wing',
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Prof. G. Swami Naidu',
    roleInEc: 'Member',
    designation: 'Director, Research & Development',
    affiliation: 'Research & Development Cell',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    name: 'Dr. R. Uma Maheswari',
    roleInEc: 'Member',
    designation: 'Controller of Examinations',
    affiliation: 'Examination Branch',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    name: 'Prof. P. S. Subrahmanyam',
    roleInEc: 'Ex-Officio Member',
    designation: 'Dean, Student Affairs',
    affiliation: 'Student Services & University Administration',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
  },
];

const storageKey = 'jntugv-executive-council-members';

const emptyForm = {
  name: '',
  roleInEc: '',
  designation: '',
  affiliation: '',
  image: '',
};

const readMembers = () => {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return defaultMembers;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : defaultMembers;
  } catch (error) {
    return defaultMembers;
  }
};

export default function ExecutiveCouncilConsole() {
  const [members, setMembers] = useState(() => readMembers());
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(members));
  }, [members]);

  const sortedMembers = useMemo(
    () => [...members].sort((a, b) => String(a.name).localeCompare(String(b.name))),
    [members],
  );

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanMember = {
      name: form.name.trim(),
      roleInEc: form.roleInEc.trim() || 'Member',
      designation: form.designation.trim(),
      affiliation: form.affiliation.trim(),
      image: form.image.trim() || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    };

    if (!cleanMember.name || !cleanMember.designation || !cleanMember.affiliation) {
      return;
    }

    setMembers((current) => {
      if (editingId) {
        return current.map((member) =>
          member.id === editingId ? { ...member, ...cleanMember } : member,
        );
      }

      return [
        ...current,
        {
          id: Date.now(),
          ...cleanMember,
        },
      ];
    });

    resetForm();
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      roleInEc: member.roleInEc,
      designation: member.designation,
      affiliation: member.affiliation,
      image: member.image,
    });
  };

  const handleDelete = (memberId) => {
    setMembers((current) => current.filter((member) => member.id !== memberId));
    if (editingId === memberId) {
      resetForm();
    }
  };

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#475569', fontWeight: 800 }}>Administrative CMS</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#111827' }}>Executive Council Manager</Typography>
          </Box>
          <Button variant="contained" onClick={resetForm} sx={{ borderRadius: 2, textTransform: 'none' }}>
            {editingId ? 'Reset edit' : 'Clear form'}
          </Button>
        </Stack>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 800, color: '#111827' }}>
          {editingId ? 'Edit council member' : 'Add council member'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleFieldChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Role in EC" name="roleInEc" value={form.roleInEc} onChange={handleFieldChange} placeholder="Chairperson / Member" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Designation" name="designation" value={form.designation} onChange={handleFieldChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="College / Society / Administration" name="affiliation" value={form.affiliation} onChange={handleFieldChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Image URL" name="image" value={form.image} onChange={handleFieldChange} placeholder="https://example.com/member.jpg" />
            </Grid>
          </Grid>

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
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 800, color: '#111827' }}>Council roster</Typography>
        <Grid container spacing={2}>
          {sortedMembers.map((member) => (
            <Grid item xs={12} md={6} xl={4} key={member.id}>
              <Card sx={{ height: '100%', borderRadius: 3, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <CardMedia component="img" height="220" image={member.image || defaultMembers[0].image} alt={member.name} sx={{ objectFit: 'cover' }} />
                <CardContent sx={{ display: 'grid', gap: 1.25 }}>
                  <Typography variant="overline" sx={{ fontWeight: 800, color: '#6b7280' }}>{member.roleInEc || 'Member'}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827' }}>{member.name}</Typography>
                  <Box>
                    <Typography variant="caption" sx={{ display: 'block', color: '#64748b', fontWeight: 700 }}>Designation</Typography>
                    <Typography variant="body2" sx={{ color: '#111827' }}>{member.designation}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ display: 'block', color: '#64748b', fontWeight: 700 }}>College / Society / Administration</Typography>
                    <Typography variant="body2" sx={{ color: '#111827' }}>{member.affiliation}</Typography>
                  </Box>
                  <Divider />
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="contained" onClick={() => handleEdit(member)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                      Edit
                    </Button>
                    <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(member.id)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
