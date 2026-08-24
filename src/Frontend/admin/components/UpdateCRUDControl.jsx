import AddIconModule from '@mui/icons-material/Add';
import CloseIconModule from '@mui/icons-material/Close';
import CloudUploadIconModule from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Authentications/AuthContext';
import { canDeleteRecords } from '../../Authentications/accessControl';
import api from '../../Main/apis_data/APIs';
import resolveMuiIcon from '../../utils/resolveMuiIcon';
import '../css/Updates.css';

const AddIcon = resolveMuiIcon(AddIconModule);
const CloseIcon = resolveMuiIcon(CloseIconModule);
const CloudUploadIcon = resolveMuiIcon(CloudUploadIconModule);

// Hidden input for file uploads
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const fallbackDepartmentOptions = [
  { code: "JNTUGV", label: "JNTU-GV" },
  { code: "DAAP", label: "Academics" },
  { code: "DRD", label: "Research" },
  { code: "DA", label: "Admissions" },
  { code: "DAR", label: "Alumni Relations" },
  { code: "DIQAC", label: "Internal Quality" },
  { code: "CE", label: "Examinations" },
  { code: "PLACEMENTS", label: "Placements" },
];

const fallbackUpdateTypes = [
  { code: "notification", label: "Notifications" },
  { code: "circular", label: "Circulars" },
  { code: "notice", label: "Notices" },
];

const DEFAULT_EMBED_QR_CODE = "true";
const DEFAULT_QR_PLACEMENT = "first_page_corner";

const Updates = () => {
  const user = useAuth();
  const canDelete = canDeleteRecords(user?.role);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState(fallbackDepartmentOptions);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState({
    id: null,
    date: new Date().toISOString().slice(0, 10),
    title: "",
    file_path: "",
    external_link: "",
    external_text: "",
    department: "JNTUGV",
    type_of_update: "notification",
    is_static: "false",
    expiry_date: "",
    revised_date: "",
    submitted_by: 'admin',
  });

  const getUpdateTypesForDepartment = (departmentCode) => {
    const department = departmentOptions.find((item) => item.code === departmentCode);
    return Array.isArray(department?.updateTypes) && department.updateTypes.length
      ? department.updateTypes
      : fallbackUpdateTypes;
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "department") {
      const updateTypes = getUpdateTypesForDepartment(value);
      setEventData({
        ...eventData,
        department: value,
        type_of_update: updateTypes[0]?.code || "notification",
      });
      return;
    }

    if (name === "is_static") {
      setEventData({
        ...eventData,
        is_static: value,
        expiry_date: value === "true" ? eventData.expiry_date : "",
      });
      return;
    }

    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleStaticToggle = (e) => {
    const value = e.target.checked ? "true" : "false";
    setEventData({
      ...eventData,
      is_static: value,
      expiry_date: value === "true" ? eventData.expiry_date : "",
    });
  };

  const validateStaticExpiry = () => {
    if (String(eventData.is_static) === "true" && !eventData.expiry_date) {
      alert("Please select an expiry date for static notifications.");
      return false;
    }
    return true;
  };

  const addEvent = async () => {
    if (!validateStaticExpiry()) return;

    const formData = new FormData();
    formData.append("date", eventData.date);
    formData.append("title", eventData.title);
    formData.append("external_txt", eventData.external_text);
    formData.append("external_lnk", eventData.external_link);
    formData.append("department", eventData.department);
    formData.append("type_of_update", eventData.type_of_update);
    formData.append("is_static", eventData.is_static);
    formData.append("expiry_date", eventData.expiry_date);
    formData.append("revised_date", eventData.revised_date);
    formData.append("embed_qr_code", DEFAULT_EMBED_QR_CODE);
    formData.append("qr_placement", DEFAULT_QR_PLACEMENT);
    formData.append("submitted_by", eventData.submitted_by);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post(`${api.updates_apis.add_event}`, formData);
      alert('Event added successfully');
      getEvents();
      setShowModal(false);
    } catch (error) {
      alert("Event Failed to Add..");
    }
  };

  const getEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api.updates_apis.all_admin_event}?limit=10&offset=0`);
      setEvents(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (event) => {
    try {
      alert(`Deleting Event ${event.display_title || event.title}`);
      const id = event.id;
      await axios.delete(`${api.updates_apis.remove_event}/${id}`);
      getEvents();
    } catch (error) {
      alert("Event Not Deleted..");
    }
  };

  const openEditModal = (event) => {
    setEventData({
      ...event,
      date: event.date ? event.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
      is_static: String(event.is_static ?? "false"),
      expiry_date: event.expiry_date ? event.expiry_date.slice(0, 10) : "",
      revised_date: event.revised_date ? event.revised_date.slice(0, 10) : "",
    });
    setFile(null);  // Reset the file input
    setIsEditing(true);  // Set the editing mode
    setShowModal(true);  // Show the modal
  };

  const editEvent = async () => {
    if (!validateStaticExpiry()) return;

    const id = eventData.id;
    const formData = new FormData();
    formData.append("date", eventData.date);
    formData.append("title", eventData.title);
    formData.append("external_text", eventData.external_text);
    formData.append("external_link", eventData.external_link);
    formData.append("department", eventData.department);
    formData.append("type_of_update", eventData.type_of_update);
    formData.append("is_static", eventData.is_static);
    formData.append("expiry_date", eventData.expiry_date);
    formData.append("revised_date", eventData.revised_date);
    formData.append("embed_qr_code", DEFAULT_EMBED_QR_CODE);
    formData.append("qr_placement", DEFAULT_QR_PLACEMENT);
    formData.append("submitted_by", eventData.submitted_by);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.put(`${api.updates_apis.update_event}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Event updated successfully');
        getEvents();
        setShowModal(false);
      } else {
        alert('Failed to update the event. Please try again.');
      }
    } catch (error) {
      alert('Error updating event. Please try again.');
    }
  };

  const handleSubmit = () => {
    if (isEditing) {
      editEvent();
    } else {
      addEvent();
    }
  };

  useEffect(() => {
    getEvents();
    axios
      .get(api.updates_apis.departments)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length) {
          setDepartmentOptions(response.data);
        }
      })
      .catch(() => {
        setDepartmentOptions(fallbackDepartmentOptions);
      });
  }, []);

  const openModalForAdding = () => {
    setEventData({
      id: null,
      date: new Date().toISOString().slice(0, 10),
      title: "",
      file_path: "",
      external_text: "",
      external_link: "",
      department: "JNTUGV",
      type_of_update: "notification",
      is_static: "false",
      expiry_date: "",
      revised_date: "",
      submitted_by: 'admin',
    });
    setFile(null);
    setIsEditing(false);
    setShowModal(true);
  };

  return (
    <div className="responsive-console-page notifications-console">
      <Button variant="contained" startIcon={<AddIcon />} onClick={openModalForAdding} sx={{ mb: 2 }}>
        Add New Notification
      </Button>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '70%' },
            maxWidth: '600px',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
            overflowY: 'auto',
            maxHeight: '80vh',
          }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: 800, mb: 0.5 }}>
            {isEditing ? 'Edit Notification' : 'Add Notification'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter the notification details below. PDF verification QR is handled automatically by the API.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => setShowModal(false)}
            sx={{ mb: 2, borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
          >
            Close
          </Button>
          <form>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
                required
                InputLabelProps={{ shrink: true }}
                helperText="Official notification release date."
              />
              <TextField
                fullWidth
                label="Notification Title"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter clear public-facing title"
                helperText="Use a short, searchable title."
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="External Link Text"
                name="external_text"
                value={eventData.external_text}
                onChange={handleInputChange}
                placeholder="Example: Click here to apply"
                helperText="Optional text shown when using an external link."
              />
              <TextField
                fullWidth
                type="url"
                label="External Link"
                name="external_link"
                value={eventData.external_link}
                onChange={handleInputChange}
                placeholder="https://example.com/notice"
                helperText="Optional. Use only when the notification points to another page."
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={eventData.department || "JNTUGV"}
                  onChange={handleInputChange}
                >
                  {departmentOptions.map((department) => (
                    <MenuItem key={department.code} value={department.code}>
                      {department.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Type of Update</InputLabel>
                <Select
                  name="type_of_update"
                  value={eventData.type_of_update || eventData.update_type || "notification"}
                  onChange={handleInputChange}
                >
                  {getUpdateTypesForDepartment(eventData.department).map((type) => (
                    <MenuItem key={type.code} value={type.code}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
              <Box
                sx={{
                  minHeight: 56,
                  px: 2,
                  py: 1,
                  border: '1px solid #cfd8e3',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  bgcolor: String(eventData.is_static) === "true" ? '#f0f7ff' : '#fff',
                }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    Static Notification
                  </Typography>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, mt: 0.25 }}>
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: String(eventData.is_static) === "true" ? '#15803d' : '#64748b',
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {String(eventData.is_static) === "true" ? "Static" : "Regular"}
                    </Typography>
                  </Box>
                </Box>
                <Switch
                  checked={String(eventData.is_static) === "true"}
                  onChange={handleStaticToggle}
                  inputProps={{ 'aria-label': 'Toggle static notification' }}
                />
              </Box>
              {String(eventData.is_static) === "true" && (
                <TextField
                  fullWidth
                  required
                  type="date"
                  label="Expiry Date"
                  name="expiry_date"
                  value={eventData.expiry_date || ""}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  helperText="Static notifications remain in the homepage ticker until this date."
                />
              )}
              <TextField
                fullWidth
                type="date"
                label="Revised Date"
                name="revised_date"
                value={eventData.revised_date || ""}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                helperText="Use this when a notification is revised and must move back to the latest tracking date."
              />
            </Box>
            <Box sx={{ mb: 2, p: 2, border: '1px dashed #9bb7d6', borderRadius: 2.5, bgcolor: '#f8fbff' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                Notification PDF
              </Typography>
              <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 800 }}>
                Upload PDF File
                <VisuallyHiddenInput type="file" accept="application/pdf" onChange={handleFileChange} />
              </Button>
              {file ? (
                <Typography variant="body2" sx={{ mt: 1, color: '#0f5132', fontWeight: 700 }}>
                  Selected: {file.name}
                </Typography>
              ) : (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Upload a PDF notification. The backend adds the verification QR automatically when the first-page corner is clear.
                </Typography>
              )}
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                {isEditing ? 'Update Notification' : 'Add Notification'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <div className="eventsdisplay responsive-console-section">
        <Typography variant="h4" gutterBottom>
          Recent Notifications
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing latest 10 notifications only. Older records are available in the Records menu.
        </Typography>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '2em' }}>
            <Typography>Loading... Files</Typography>
            <CircularProgress />
          </div>
        ) : (
          <div>
            {events.length ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>S.NO</TableCell>
                      <TableCell>Notification Date</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Static</TableCell>
                      <TableCell>Expiry</TableCell>
                      <TableCell>Revised</TableCell>
                      <TableCell>View File</TableCell>
                      <TableCell>Action</TableCell>
                      {canDelete && <TableCell>Delete</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>{event.id}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.department_label || event.department || "JNTU-GV"}</TableCell>
                        <TableCell>{event.display_title || event.title}</TableCell>
                        <TableCell>{event.type_of_update_label || event.type_of_update || event.update_type || "notification"}</TableCell>
                        <TableCell>{event.is_static ? "True" : "False"}</TableCell>
                        <TableCell>{event.expiry_date || "-"}</TableCell>
                        <TableCell>{event.revised_date || "-"}</TableCell>
                        <TableCell>
                          {event.file_link ? (
                            <a href={event.file_link} target="_blank" rel="noopener noreferrer">View File</a>
                          ) : (
                            <a href={event.external_link} target="_blank" rel="noopener noreferrer">{event.external_link}</a>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="contained" onClick={() => openEditModal(event)}>
                            Edit
                          </Button>
                        </TableCell>
                        {canDelete && (
                          <TableCell>
                            <Button
                              variant="contained"
                              color="error"
                              className="danger-action-button"
                              onClick={() => deleteEvent(event)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="h6">No Notifications Added (or) Server is Busy while Loading the Notifications</Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Updates;
