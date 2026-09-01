import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { FaEdit, FaImage, FaLink, FaSave, FaTimes, FaTrash, FaUserTie } from 'react-icons/fa';
import { useAuth } from '../Authentications/AuthContext';
import { canDeleteRecords } from '../Authentications/accessControl';
import APIs from '../Main/apis_data/APIs';

const emptyPerson = {
  name: '',
  email: '',
  phone: '',
  department: '',
  academic_title: '',
  qualifications: '',
  image: '',
  about: '',
  sort_order: 0,
  status: 'active',
};

const emptyAssignment = {
  person_id: '',
  position_type: 'administration',
  position_key: 'registrar',
  position_label: 'Registrar',
  directorate_name: '',
  title_override: '',
  subtitle_override: '',
  email_override: '',
  website_url: '',
  is_incharge: false,
  visibility: 'public',
  status: 'active',
  sort_order: 0,
};

const administrationPositions = [
  { key: 'vice-chancellor', label: 'Vice Chancellor' },
  { key: 'registrar', label: 'Registrar' },
  { key: 'osd', label: 'Officer on Special Duty (OSD)' },
  { key: 'chancellor', label: 'Chancellor' },
];

const directoratePositions = [
  { key: 'academic-audit-planning', label: 'Director of Academic Audit and Planning' },
  { key: 'admissions', label: 'Director of Admissions' },
  { key: 'evaluation', label: 'Director of Evaluation' },
  { key: 'research', label: 'Director of Research & Development' },
  { key: 'placements', label: 'Director of Industrial Relations & Placements' },
  { key: 'iqac', label: 'Director of Internal Quality Assurance Cell' },
  { key: 'alumni-relations', label: 'Director of Alumni Relations' },
];

const positionsByType = {
  administration: administrationPositions,
  directorate: directoratePositions,
};

const normalize = (value = '') => String(value || '').trim().toLowerCase();

export default function LeadershipProfilesConsole() {
  const user = useAuth();
  const allowDelete = canDeleteRecords(user?.role);
  const [people, setPeople] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [personForm, setPersonForm] = useState(emptyPerson);
  const [assignmentForm, setAssignmentForm] = useState(emptyAssignment);
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [editingAssignmentId, setEditingAssignmentId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const peopleById = useMemo(
    () => new Map(people.map((person) => [Number(person.id), person])),
    [people],
  );

  const activePositions = positionsByType[assignmentForm.position_type] || administrationPositions;

  const sortedPeople = useMemo(
    () => [...people].sort((a, b) => String(a.name).localeCompare(String(b.name))),
    [people],
  );

  const sortedAssignments = useMemo(
    () =>
      [...assignments].sort(
        (a, b) =>
          String(a.position_type).localeCompare(String(b.position_type)) ||
          Number(a.sort_order || 0) - Number(b.sort_order || 0) ||
          String(a.position_label).localeCompare(String(b.position_label)),
      ),
    [assignments],
  );

  const requestConfig = { withCredentials: true };

  const loadConsoleData = async () => {
    setLoading(true);
    try {
      const [peopleResponse, assignmentsResponse] = await Promise.all([
        axios.get(APIs.site_apis.admin_people, requestConfig),
        axios.get(APIs.site_apis.admin_position_assignments, requestConfig),
      ]);
      setPeople(Array.isArray(peopleResponse.data) ? peopleResponse.data : []);
      setAssignments(Array.isArray(assignmentsResponse.data) ? assignmentsResponse.data : []);
    } catch (error) {
      alert(error?.response?.data?.error || 'Unable to load people and position assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConsoleData();
  }, []);

  const updatePersonField = (event) => {
    const { name, value } = event.target;
    setPersonForm((current) => ({ ...current, [name]: value }));
  };

  const updateAssignmentField = (event) => {
    const { name, value } = event.target;
    setAssignmentForm((current) => {
      const next = { ...current, [name]: value };
      if (name === 'position_type') {
        const first = positionsByType[value]?.[0] || administrationPositions[0];
        next.position_key = first.key;
        next.position_label = first.label;
        next.directorate_name = value === 'directorate' ? first.label : '';
      }
      if (name === 'position_key') {
        const selected = (positionsByType[current.position_type] || []).find((item) => item.key === value);
        next.position_label = selected?.label || current.position_label;
        next.directorate_name = current.position_type === 'directorate' ? selected?.label || '' : current.directorate_name;
      }
      return next;
    });
  };

  const resetPerson = () => {
    setPersonForm(emptyPerson);
    setEditingPersonId(null);
    setImageFile(null);
  };

  const resetAssignment = () => {
    setAssignmentForm(emptyAssignment);
    setEditingAssignmentId(null);
  };

  const submitPerson = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = new FormData();
      Object.entries({
        ...personForm,
        image_url: personForm.image,
      }).forEach(([key, value]) => payload.append(key, value ?? ''));
      if (imageFile) payload.append('imageFile', imageFile);

      if (editingPersonId) {
        await axios.put(`${APIs.site_apis.admin_people}/${editingPersonId}`, payload, requestConfig);
      } else {
        await axios.post(APIs.site_apis.admin_people, payload, requestConfig);
      }

      resetPerson();
      await loadConsoleData();
    } catch (error) {
      alert(error?.response?.data?.error || 'Unable to save professor profile');
    } finally {
      setSaving(false);
    }
  };

  const submitAssignment = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...assignmentForm,
        person_id: Number(assignmentForm.person_id),
      };

      if (editingAssignmentId) {
        await axios.put(`${APIs.site_apis.admin_position_assignments}/${editingAssignmentId}`, payload, requestConfig);
      } else {
        await axios.post(APIs.site_apis.admin_position_assignments, payload, requestConfig);
      }

      resetAssignment();
      await loadConsoleData();
    } catch (error) {
      alert(error?.response?.data?.error || 'Unable to save position assignment');
    } finally {
      setSaving(false);
    }
  };

  const editPerson = (person) => {
    setEditingPersonId(person.id);
    setImageFile(null);
    setPersonForm({
      ...emptyPerson,
      ...person,
      image: person.image || person.image_url || '',
      academic_title: person.academic_title || person.academicTitle || '',
      sort_order: person.sort_order || 0,
      status: person.status || 'active',
    });
  };

  const editAssignment = (assignment) => {
    setEditingAssignmentId(assignment.id);
    setAssignmentForm({
      ...emptyAssignment,
      ...assignment,
      person_id: assignment.person_id || assignment.personId || '',
      position_type: assignment.position_type || assignment.positionType || 'administration',
      position_key: assignment.position_key || assignment.positionKey || '',
      position_label: assignment.position_label || assignment.positionLabel || '',
      directorate_name: assignment.directorate_name || assignment.directorateName || '',
      title_override: assignment.title_override || assignment.titleOverride || '',
      subtitle_override: assignment.subtitle_override || assignment.subtitleOverride || '',
      email_override: assignment.email_override || assignment.emailOverride || '',
      website_url: assignment.website_url || assignment.websiteUrl || '',
      is_incharge: Boolean(assignment.is_incharge || assignment.isIncharge),
      visibility: assignment.visibility || 'public',
      status: assignment.status || 'active',
      sort_order: assignment.sort_order || 0,
    });
  };

  const deletePerson = async (person) => {
    if (!allowDelete) return;
    if (!window.confirm(`Delete ${person.name}? Assignments using this person should be changed first.`)) return;
    try {
      await axios.delete(`${APIs.site_apis.admin_people}/${person.id}`, requestConfig);
      await loadConsoleData();
    } catch (error) {
      alert(error?.response?.data?.error || 'Unable to delete professor profile');
    }
  };

  const deleteAssignment = async (assignment) => {
    if (!allowDelete) return;
    if (!window.confirm(`Delete assignment ${assignment.position_label}?`)) return;
    try {
      await axios.delete(`${APIs.site_apis.admin_position_assignments}/${assignment.id}`, requestConfig);
      await loadConsoleData();
    } catch (error) {
      alert(error?.response?.data?.error || 'Unable to delete assignment');
    }
  };

  return (
    <Box sx={{ display: 'grid', gap: 2.5 }}>
      <Box sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, color: '#fff', background: 'linear-gradient(135deg, #082044 0%, #0c4a8f 100%)' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,.75)', fontWeight: 900 }}>
              Public website people CMS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              Professors & Position Mapping
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,.82)', maxWidth: 860 }}>
              Add the 7 professor profiles once, then assign them as Registrar, Vice Chancellor, OSD, Principal, Vice Principal, or Directorate heads.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label={`${people.length} people`} sx={{ bgcolor: '#fff', color: '#082044', fontWeight: 900 }} />
            <Chip label={`${assignments.length} assignments`} sx={{ bgcolor: '#dbeafe', color: '#082044', fontWeight: 900 }} />
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} xl={6}>
          <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
                {editingPersonId ? 'Edit professor/person profile' : 'Add professor/person profile'}
              </Typography>
              <Box component="form" onSubmit={submitPerson}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Full name" name="name" value={personForm.name} onChange={updatePersonField} required />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Email" name="email" value={personForm.email} onChange={updatePersonField} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Academic title" name="academic_title" value={personForm.academic_title} onChange={updatePersonField} placeholder="Professor, Department of ECE" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Department" name="department" value={personForm.department} onChange={updatePersonField} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Qualifications" name="qualifications" value={personForm.qualifications} onChange={updatePersonField} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Phone" name="phone" value={personForm.phone} onChange={updatePersonField} />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', md: 'center' }} sx={{ p: 1.5, borderRadius: 2, border: '1px solid #dbe4f0', bgcolor: '#f8fafc' }}>
                      <Button variant="contained" component="label" startIcon={<FaImage />}>
                        Upload Image
                        <input hidden type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => setImageFile(event.target.files?.[0] || null)} />
                      </Button>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography sx={{ fontWeight: 800, color: '#0f172a' }}>
                          {imageFile ? imageFile.name : 'No new image selected'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          Upload image or paste an existing image link below.
                        </Typography>
                      </Box>
                      {imageFile || personForm.image ? (
                        <Box component="img" src={imageFile ? URL.createObjectURL(imageFile) : personForm.image} alt="Preview" sx={{ width: 72, height: 72, borderRadius: 2, objectFit: 'cover', border: '1px solid #cbd5e1' }} />
                      ) : null}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Existing image URL" name="image" value={personForm.image} onChange={updatePersonField} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline minRows={7} label="Biodata & Profile details" name="about" value={personForm.about} onChange={updatePersonField} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField select fullWidth label="Status" name="status" value={personForm.status} onChange={updatePersonField}>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth type="number" label="Sort order" name="sort_order" value={personForm.sort_order} onChange={updatePersonField} />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                      <Button type="submit" variant="contained" startIcon={<FaSave />} disabled={saving}>
                        {saving ? 'Saving...' : editingPersonId ? 'Update Person' : 'Save Person'}
                      </Button>
                      <Button type="button" variant="outlined" startIcon={<FaTimes />} onClick={resetPerson}>
                        Clear
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} xl={6}>
          <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
                {editingAssignmentId ? 'Edit public position assignment' : 'Assign professor to public role'}
              </Typography>
              <Box component="form" onSubmit={submitAssignment}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField select fullWidth label="Select professor/person" name="person_id" value={assignmentForm.person_id} onChange={updateAssignmentField} required>
                      <MenuItem value="">Select person</MenuItem>
                      {sortedPeople.map((person) => (
                        <MenuItem key={person.id} value={person.id}>
                          {person.name} {person.department ? `— ${person.department}` : ''}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField select fullWidth label="Position group" name="position_type" value={assignmentForm.position_type} onChange={updateAssignmentField}>
                      <MenuItem value="administration">Administration</MenuItem>
                      <MenuItem value="directorate">Directorate</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField select fullWidth label="Role & Directorate" name="position_key" value={assignmentForm.position_key} onChange={updateAssignmentField}>
                      {activePositions.map((item) => (
                        <MenuItem key={item.key} value={item.key}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Public role label" name="position_label" value={assignmentForm.position_label} onChange={updateAssignmentField} required />
                  </Grid>
                  {assignmentForm.position_type === 'directorate' ? (
                    <Grid item xs={12}>
                      <TextField fullWidth label="Directorate display name" name="directorate_name" value={assignmentForm.directorate_name} onChange={updateAssignmentField} />
                    </Grid>
                  ) : null}
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Title override" name="title_override" value={assignmentForm.title_override} onChange={updateAssignmentField} placeholder="Registrar (i/c)" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Email override" name="email_override" value={assignmentForm.email_override} onChange={updateAssignmentField} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Subtitle override" name="subtitle_override" value={assignmentForm.subtitle_override} onChange={updateAssignmentField} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Website/Profile URL" name="website_url" value={assignmentForm.website_url} onChange={updateAssignmentField} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField select fullWidth label="In-charge" name="is_incharge" value={String(assignmentForm.is_incharge)} onChange={(event) => setAssignmentForm((current) => ({ ...current, is_incharge: event.target.value === 'true' }))}>
                      <MenuItem value="false">No</MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField select fullWidth label="Visibility" name="visibility" value={assignmentForm.visibility} onChange={updateAssignmentField}>
                      <MenuItem value="public">Public</MenuItem>
                      <MenuItem value="private">Private</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField select fullWidth label="Status" name="status" value={assignmentForm.status} onChange={updateAssignmentField}>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                      <Button type="submit" variant="contained" startIcon={<FaLink />} disabled={saving || !people.length}>
                        {saving ? 'Saving...' : editingAssignmentId ? 'Update Assignment' : 'Save Assignment'}
                      </Button>
                      <Button type="button" variant="outlined" startIcon={<FaTimes />} onClick={resetAssignment}>
                        Clear
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
            Professor/Profile Library
          </Typography>
          <Grid container spacing={1.5}>
            {sortedPeople.map((person) => (
              <Grid item xs={12} key={person.id}>
                <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                  <CardContent>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <Box sx={{ width: 58, height: 58, borderRadius: 2, bgcolor: '#e0f2fe', color: '#075985', display: 'grid', placeItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
                        {person.image || person.image_url ? (
                          <Box component="img" src={person.image || person.image_url} alt={person.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <FaUserTie />
                        )}
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 900 }}>{person.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{person.academic_title || person.department || 'Profile details'}</Typography>
                        <Typography variant="caption" sx={{ color: '#475569' }}>{person.email}</Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap">
                          <Button size="small" variant="contained" startIcon={<FaEdit />} onClick={() => editPerson(person)}>Edit</Button>
                          {allowDelete ? (
                            <Button size="small" color="error" variant="outlined" startIcon={<FaTrash />} onClick={() => deletePerson(person)}>Delete</Button>
                          ) : null}
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {!loading && !sortedPeople.length ? (
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, border: '1px dashed #cbd5e1', boxShadow: 'none' }}>
                  <CardContent><Typography sx={{ color: '#475569' }}>No professor profiles added yet.</Typography></CardContent>
                </Card>
              </Grid>
            ) : null}
          </Grid>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
            Public Role & Directorate Mapping
          </Typography>
          <Grid container spacing={1.5}>
            {sortedAssignments.map((assignment) => {
              const person = assignment.person || peopleById.get(Number(assignment.person_id));
              return (
                <Grid item xs={12} md={6} key={assignment.id}>
                  <Card sx={{ height: '100%', borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                    <CardContent>
                      <Stack direction="row" spacing={1.25} alignItems="flex-start">
                        <Box sx={{ width: 46, height: 46, borderRadius: 2, bgcolor: '#eff6ff', color: '#0c4a8f', display: 'grid', placeItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
                          {person?.image || person?.image_url ? (
                            <Box component="img" src={person.image || person.image_url} alt={person.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <FaUserTie />
                          )}
                        </Box>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography sx={{ fontWeight: 900 }}>{assignment.position_label}</Typography>
                          <Typography variant="body2" sx={{ color: '#334155' }}>{person?.name || 'Person missing'}</Typography>
                          <Stack direction="row" spacing={0.75} sx={{ mt: 1 }} flexWrap="wrap">
                            <Chip size="small" label={assignment.position_type} />
                            <Chip size="small" label={assignment.position_key} />
                            <Chip size="small" label={assignment.visibility} color={normalize(assignment.visibility) === 'public' ? 'success' : 'default'} />
                          </Stack>
                          <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} flexWrap="wrap">
                            <Button size="small" variant="contained" startIcon={<FaEdit />} onClick={() => editAssignment(assignment)}>Edit</Button>
                            {allowDelete ? (
                              <Button size="small" color="error" variant="outlined" startIcon={<FaTrash />} onClick={() => deleteAssignment(assignment)}>Delete</Button>
                            ) : null}
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
            {!loading && !sortedAssignments.length ? (
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, border: '1px dashed #cbd5e1', boxShadow: 'none' }}>
                  <CardContent><Typography sx={{ color: '#475569' }}>No public role assignments yet. Add professor profiles, then assign them to roles.</Typography></CardContent>
                </Card>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
