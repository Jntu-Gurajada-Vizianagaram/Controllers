import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useAuth } from '../../Authentications/AuthContext';
import { canDeleteRecords } from '../../Authentications/accessControl';
import mods from '../../Main/Component/Logins/Login';
import '../css/EventAlbumsManagement.css';

import ips from "../../api.json";
const api_ip = (import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : ips.server_ip;

const toDateInputValue = (value = new Date()) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const emptyAlbum = {
  event_name: '',
  uploaded_date: toDateInputValue(),
  description: '',
  main_page: 'yes',
  admin_approval: 'accepted',
};

const sortLatestAlbums = (items = []) =>
  [...items].sort((first, second) => {
    const firstDate = new Date(first.uploaded_date).getTime() || 0;
    const secondDate = new Date(second.uploaded_date).getTime() || 0;
    if (secondDate !== firstDate) return secondDate - firstDate;
    return Number(second.id || 0) - Number(first.id || 0);
  });

export default function EventAlbumsManagement() {
  const user = useAuth();
  const canDelete = canDeleteRecords(user?.role);
  const [albumData, setAlbumData] = useState(emptyAlbum);
  const [coverImage, setCoverImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [editCoverImage, setEditCoverImage] = useState(null);
  const [editGalleryFiles, setEditGalleryFiles] = useState([]);

  const stats = useMemo(() => {
    const photoCount = albums.reduce(
      (total, album) => total + (album.event_photos?.length || 0),
      0,
    );
    const mainPageCount = albums.filter((album) => album.main_page === 'yes').length;
    return { albums: albums.length, photoCount, mainPageCount };
  }, [albums]);

  const fetchAlbums = useCallback(async () => {
    try {
      const response = await axios.get(`${api_ip}/api/webadmin/get-event-photos`);
      setAlbums(sortLatestAlbums(response.data?.events || []));
    } catch (error) {
      console.error('Error fetching event albums:', error);
      setAlbums([]);
    }
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setAlbumData((current) => ({ ...current, [name]: value }));
  };

  const clearForm = () => {
    setAlbumData(emptyAlbum);
    setCoverImage(null);
    setGalleryFiles([]);
  };

  const uploadAlbumImages = async (albumId, mainImage, eventGalleryFiles) => {
    if (!mainImage && !eventGalleryFiles.length) return;
    const imagesData = new FormData();
    if (mainImage) imagesData.append('main_image', mainImage);
    eventGalleryFiles.forEach((file) => imagesData.append('gallery_images', file));
    await axios.post(`${api_ip}/api/webadmin/event-photos/${albumId}/images`, imagesData);
  };

  const uploadAlbum = async () => {
    const formData = new FormData();
    Object.entries({
      ...albumData,
      added_by: mods.uds.admin || user?.email || 'webadmin',
    }).forEach(([key, value]) => formData.append(key, value));

    setLoading(true);
    try {
      const response = await axios.post(`${api_ip}/api/webadmin/add-event-photos`, formData);
      await uploadAlbumImages(response.data?.id, coverImage, galleryFiles);
      clearForm();
      fetchAlbums();
    } catch (error) {
      alert(error?.response?.data?.error || 'Failed to upload event album');
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (album) => {
    setEditCoverImage(null);
    setEditGalleryFiles([]);
    setEditingAlbum({
      ...album,
      uploaded_date: toDateInputValue(album.uploaded_date),
      main_page: album.main_page || 'no',
      admin_approval: album.admin_approval || 'accepted',
    });
  };

  const updateAlbum = async () => {
    if (!editingAlbum) return;
    setLoading(true);
    try {
      await axios.put(
        `${api_ip}/api/webadmin/update-event-photos/${editingAlbum.id}`,
        {
          uploaded_date: editingAlbum.uploaded_date,
          event_name: editingAlbum.event_name,
          description: editingAlbum.description,
          main_page: editingAlbum.main_page,
          admin_approval: editingAlbum.admin_approval,
        },
      );
      await uploadAlbumImages(editingAlbum.id, editCoverImage, editGalleryFiles);
      setEditingAlbum(null);
      setEditCoverImage(null);
      setEditGalleryFiles([]);
      fetchAlbums();
    } catch (error) {
      alert(error?.response?.data?.error || 'Failed to update event album');
    } finally {
      setLoading(false);
    }
  };

  const deleteAlbum = async (album) => {
    if (!window.confirm(`Delete "${album.event_name}" and all uploaded photos?`)) return;
    setLoading(true);
    try {
      await axios.delete(`${api_ip}/api/webadmin/delete-event-photos/${album.id}`);
      fetchAlbums();
    } catch (error) {
      alert(error?.response?.data?.error || 'Failed to delete event album');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="event-albums-page">
      <section className="event-albums-stat-grid">
        {[
          ['Albums', stats.albums, 'Total event records'],
          ['Photos', stats.photoCount, 'Images across albums'],
          ['Main Page', stats.mainPageCount, 'Visible on website'],
        ].map(([label, value, detail]) => (
          <Paper className="event-albums-stat-card" variant="outlined" key={label}>
            <Typography variant="caption">{label}</Typography>
            <Typography variant="h5">{value}</Typography>
            <Typography variant="body2">{detail}</Typography>
          </Paper>
        ))}
      </section>

      <Paper className="event-albums-form-card" variant="outlined">
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1.5} className="event-albums-section-head">
          <Box>
            <Typography variant="h6">Create Event Album</Typography>
            <Typography variant="body2">Upload a named event album with date, visibility, description, and photos.</Typography>
          </Box>
          {(coverImage || galleryFiles.length > 0) && (
            <Chip
              color="primary"
              variant="outlined"
              label={`${coverImage ? '1 cover' : 'No cover'} / ${galleryFiles.length} gallery photos`}
            />
          )}
        </Stack>

        <Grid container spacing={2} className="event-albums-form-grid">
          <Grid item xs={12} lg={4}>
            <TextField fullWidth label="Event Name" name="event_name" value={albumData.event_name} onChange={updateField} />
          </Grid>
          <Grid item xs={12} sm={6} lg={2.5}>
            <TextField fullWidth type="date" label="Uploaded Date" name="uploaded_date" value={albumData.uploaded_date} onChange={updateField} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6} lg={2}>
            <FormControl fullWidth>
              <InputLabel>Main Page</InputLabel>
              <Select label="Main Page" name="main_page" value={albumData.main_page} onChange={updateField}>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={1.75}>
            <Button component="label" fullWidth variant="outlined" startIcon={<FaCloudUploadAlt />} className="event-albums-file-button">
              {coverImage ? 'Change Cover' : 'Cover Image'}
              <input hidden type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(event) => setCoverImage(event.target.files?.[0] || null)} />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} lg={1.75}>
            <Button component="label" fullWidth variant="outlined" startIcon={<FaCloudUploadAlt />} className="event-albums-file-button">
              {galleryFiles.length ? 'Change Gallery' : 'Gallery Images'}
              <input hidden type="file" accept=".jpg,.jpeg,.png,.webp" multiple onChange={(event) => setGalleryFiles(Array.from(event.target.files || []))} />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline minRows={3} label="Description" name="description" value={albumData.description} onChange={updateField} />
          </Grid>
          <Grid item xs={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button
                variant="contained"
                onClick={uploadAlbum}
                disabled={loading || !albumData.event_name || !albumData.uploaded_date}
              >
                Save Event Album
              </Button>
              <Button variant="outlined" onClick={clearForm} disabled={loading}>
                Clear
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper className="event-albums-list-card" variant="outlined">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1.5} className="event-albums-section-head">
          <Box>
            <Typography variant="h6">Event Albums</Typography>
            <Typography variant="body2">Review album preview, title, date, photo count, visibility, and actions.</Typography>
          </Box>
          <Chip label={`${albums.length} albums`} />
        </Stack>

        <TableContainer className="event-albums-table-wrap">
          <Table size="small" className="event-albums-table">
            <TableHead>
              <TableRow>
                <TableCell>Preview</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Photos</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Main Page</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {albums.map((album) => (
                <TableRow key={album.id} hover>
                  <TableCell>
                    {album.thumbnail || album.main_image || album.event_photos?.[0] ? (
                      <Box
                        component="img"
                        src={album.thumbnail || album.main_image || album.event_photos[0]}
                        alt={album.event_name}
                        className="event-albums-thumb"
                      />
                    ) : (
                      <span className="event-albums-no-image">No image</span>
                    )}
                  </TableCell>
                  <TableCell className="event-albums-title-cell">
                    <Typography className="event-albums-title">{album.event_name}</Typography>
                    <Typography className="event-albums-description">{album.description || 'No description added'}</Typography>
                  </TableCell>
                  <TableCell className="event-albums-date-cell">{toDateInputValue(album.uploaded_date)}</TableCell>
                  <TableCell align="center">
                    <Chip size="small" label={album.event_photos?.length || 0} />
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={album.admin_approval === 'accepted' ? 'Published' : album.admin_approval || 'Published'} />
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={album.main_page === 'yes' ? 'Visible' : 'Hidden'} color={album.main_page === 'yes' ? 'success' : 'default'} />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end" className="event-albums-actions">
                      <Button size="small" variant="outlined" onClick={() => openEdit(album)}>Edit</Button>
                      {canDelete && <Button size="small" color="error" variant="outlined" onClick={() => deleteAlbum(album)}>Delete</Button>}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {!albums.length && (
                <TableRow>
                  <TableCell colSpan={7} align="center" className="event-albums-empty">No event albums found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={Boolean(editingAlbum)} onClose={() => setEditingAlbum(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Event Album</DialogTitle>
        {editingAlbum && (
          <DialogContent>
            <TextField fullWidth margin="normal" label="Event Name" value={editingAlbum.event_name} onChange={(event) => setEditingAlbum((current) => ({ ...current, event_name: event.target.value }))} />
            <TextField fullWidth margin="normal" type="date" label="Uploaded Date" value={editingAlbum.uploaded_date} onChange={(event) => setEditingAlbum((current) => ({ ...current, uploaded_date: event.target.value }))} InputLabelProps={{ shrink: true }} />
            <TextField fullWidth margin="normal" multiline minRows={3} label="Description" value={editingAlbum.description || ''} onChange={(event) => setEditingAlbum((current) => ({ ...current, description: event.target.value }))} />
            <FormControl fullWidth margin="normal">
              <InputLabel>Main Page</InputLabel>
              <Select label="Main Page" value={editingAlbum.main_page || 'no'} onChange={(event) => setEditingAlbum((current) => ({ ...current, main_page: event.target.value }))}>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select label="Status" value={editingAlbum.admin_approval || 'accepted'} onChange={(event) => setEditingAlbum((current) => ({ ...current, admin_approval: event.target.value }))}>
                <MenuItem value="accepted">Published</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="denied">Denied</MenuItem>
              </Select>
            </FormControl>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} className="event-albums-edit-upload-row">
              <Button component="label" fullWidth variant="outlined" startIcon={<FaCloudUploadAlt />} className="event-albums-file-button">
                {editCoverImage ? 'Cover Selected' : 'Replace Cover Image'}
                <input hidden type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(event) => setEditCoverImage(event.target.files?.[0] || null)} />
              </Button>
              <Button component="label" fullWidth variant="outlined" startIcon={<FaCloudUploadAlt />} className="event-albums-file-button">
                {editGalleryFiles.length ? `${editGalleryFiles.length} Gallery Selected` : 'Add Gallery Images'}
                <input hidden type="file" accept=".jpg,.jpeg,.png,.webp" multiple onChange={(event) => setEditGalleryFiles(Array.from(event.target.files || []))} />
              </Button>
            </Stack>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setEditingAlbum(null)}>Cancel</Button>
          <Button variant="contained" disabled={loading} onClick={updateAlbum}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
