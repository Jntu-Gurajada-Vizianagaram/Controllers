import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import api from '../../Main/apis_data/APIs';
import "../css/Updates.css";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Updates = () => {

  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventData, setEventData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: "",
    file_path: "",
    external_link: "",
    external_text: "",
    main_page: "",
    scrolling: "",
    update_type: "",
    update_status: "",
    submitted_by: "admin",
    admin_approval: "accepted",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const addEvent = async () => {
    const formData = new FormData();
    formData.append("date", eventData.date);
    formData.append("title", eventData.title);
    formData.append("external_txt", eventData.external_text);
    formData.append("external_lnk", eventData.external_link);
    formData.append("main_page", eventData.main_page);
    formData.append("scrolling", eventData.scrolling);
    formData.append("update_type", eventData.update_type);
    formData.append("update_status", eventData.update_status);
    formData.append("submitted_by", eventData.submitted_by);
    formData.append("admin_approval", eventData.admin_approval);
    formData.append('file', file);

    try {
      const response = await axios.post(`${api.updates_apis.add_event}`, formData);
      console.log(response);
      if (response) {
        alert("Event added");
      } else {
        console.log("Event Not Added");
      }
      getEvents();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api.updates_apis.all_admin_event}`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const editEvent = async () => {
    const id = editingEvent.id; 
    console.log(id)// Ensure the ID is correct
    const formData = new FormData();
    formData.append("date", eventData.date);
    formData.append("title", eventData.title);
    formData.append("external_txt", eventData.external_text);
    formData.append("external_lnk", eventData.external_link);
    formData.append("main_page", eventData.main_page);
    formData.append("scrolling", eventData.scrolling);
    formData.append("update_type", eventData.update_type);
    formData.append("update_status", eventData.update_status);
    formData.append("submitted_by", eventData.submitted_by);
    formData.append("admin_approval", eventData.admin_approval);
    if (file) {
      formData.append('file', file);
    }
  
    try {
      const response = await axios.put(`${api.updates_apis.all_admin_events}/${id}`, formData);
      if (response.status === 200) {
        alert("Event updated successfully");
        setShowModal(false);
        getEvents();
      } else {
        console.log("Event not updated", response);
      }
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };
  
  

  const deleteEvent = async (event) => {
    try {
      console.log(event);
      alert(`Deleting Event ${event.title}`);
      const id = event.id;
      await axios.delete(`${api.updates_apis.remove_event}/${id}`);
      getEvents();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const openEditModal = (event) => {
    setEditingEvent(event);
    setEventData({
      date: event.date,
      title: event.title,
      external_link: event.external_link,
      external_text: event.external_text,
      main_page: event.main_page,
      scrolling: event.scrolling,
      update_type: event.update_type,
      update_status: event.update_status,
      submitted_by: event.submitted_by,
      admin_approval: event.admin_approval,
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (isEditing && editingEvent) {
      editEvent();
    } else {
      addEvent();
    }
  };

  return (
    <div>
      <div className="updates-main">
        <div>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setShowModal(true); setEditingEvent(null); }}>
            Add Notification
          </Button>
        </div>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(2px)' }}>
            <div style={{ width: 800, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 8, boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', padding: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <Typography variant="h5" gutterBottom>
                  {editingEvent ? "Edit Notification" : "Add New Notification"}
                </Typography>
                <Button variant="contained" startIcon={<CloseIcon />} onClick={() => setShowModal(false)}>Close</Button>
              </div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: 8,
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
                padding: 10,
                overflowY: 'auto',
                maxHeight: '80vh',
              }}>
                <form>
                  <label htmlFor="date">Date:</label>
                  <input type="date" id="date" name="date" value={eventData.date} onChange={handleInputChange} required />
                  <br />

                  <label htmlFor="title">Notification Title:</label>
                  <TextField
                    label="Notification Title"
                    variant="outlined"
                    name="title"
                    value={eventData.title}
                    onChange={handleInputChange}
                  />
                  <br />

                  <label htmlFor="file-path">Path/Upload File:</label>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    {file ? `${file.name} Uploaded` : "UPLOAD FILE"}
                    <VisuallyHiddenInput type="file" name='file' onChange={(e) => setFile(e.target.files[0])} />
                  </Button>
                  <br />

                  <label htmlFor="external_text">External Text:<br />(Ex.Click here, Register Now,Read more)</label>
                  <TextField
                    label="External Text For Link"
                    variant="outlined"
                    name="external_text"
                    value={eventData.external_text}
                    onChange={handleInputChange}
                  />
                  <br />

                  <label htmlFor="external_link">External Link:<br />Note: full link (http://** or https://** ) </label>
                  <TextField
                    label="External Link"
                    variant="outlined"
                    name="external_link"
                    value={eventData.external_link}
                    onChange={handleInputChange}
                  />
                  <br />

                  <FormControl fullWidth>
                    <InputLabel id="main-page-label">Main Page Publish</InputLabel>
                    <Select
                      labelId="main-page-label"
                      id="main-page"
                      name="main_page"
                      value={eventData.main_page}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="yes">YES</MenuItem>
                      <MenuItem value="no">NO</MenuItem>
                    </Select>
                  </FormControl>
                  <br />

                  <FormControl fullWidth>
                    <InputLabel id="scrolling-label">Flash Scrolling</InputLabel>
                    <Select
                      labelId="scrolling-label"
                      id="scrolling"
                      name="scrolling"
                      value={eventData.scrolling}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="yes">YES</MenuItem>
                      <MenuItem value="no">NO</MenuItem>
                    </Select>
                  </FormControl>
                  <br />

                  <FormControl fullWidth>
                    <InputLabel id="update-type-label">Type of Update</InputLabel>
                    <Select
                      labelId="update-type-label"
                      id="update-type"
                      name="update_type"
                      value={eventData.update_type}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="exams">Exams</MenuItem>
                      <MenuItem value="calendar">Academic Calendar</MenuItem>
                      <MenuItem value="regulation">Academic Regulation</MenuItem>
                      <MenuItem value="syllabus">Academic Syllabus</MenuItem>
                      <MenuItem value="tender">Tender</MenuItem>
                      <MenuItem value="workshop">Workshop</MenuItem>
                      <MenuItem value="sports">Sports</MenuItem>
                      <MenuItem value="conference">Conference</MenuItem>
                      <MenuItem value="recruitment">Recruitment</MenuItem>
                    </Select>
                  </FormControl>
                  <br />

                  <FormControl fullWidth>
                    <InputLabel id="update-status-label">Status</InputLabel>
                    <Select
                      labelId="update-status-label"
                      id="update-status"
                      name="update_status"
                      value={eventData.update_status}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="update">Update</MenuItem>
                      <MenuItem value="draft">Draft</MenuItem>
                    </Select>
                  </FormControl>
                  <br />

                  <Button component="label" variant="contained" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </Modal>

        <div className="eventsdisplay">
          <h2>Events</h2>
          {loading ?
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '2em' }}>
              <h1>Loading... Files</h1>
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            </div>
            :
            <div>
              {events.length > 0 ?
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow key={"Table Attributes"}>
                        <TableCell>S.NO</TableCell>
                        <TableCell>Notification Date</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>View File</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{event.id}</TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>{event.update_status}</TableCell>
                          <TableCell>
                            <a href={event.file_link} target="_blank">View File</a>
                          </TableCell>
                          <TableCell>
                            <Button variant="contained" onClick={() => openEditModal(event)}>
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="contained" color="error" onClick={() => deleteEvent(event)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                :
                <div>
                  <h1>No Notifications Added (or) Server is Busy while Loading the Notifications</h1>
                </div>}
            </div>
          }
        </div>
      </div>
    </div >
  );
};

export default Updates;
