import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/DMCUpload.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import mods from "../../Main/Component/Logins/Login";

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

const ips = require("../../api.json");
const api_ip = ips.server_ip;

const Upload = () => {
  const [file, setFile] = useState(null);
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventData, setEventData] = useState({
    date: (new Date()),
    title: "",
    file_path: `${file}`,
    description: "",
    submitted: mods.uds.admin,
    admin_approval: "pending",
    carousel_scrolling: "",
    gallery_scrolling: ""
  });
  const [openModal, setOpenModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const addEvent = async () => {
    const formData = new FormData()
    formData.append("date", eventData.date)
    formData.append("title", eventData.title)
    formData.append("description", eventData.description)
    formData.append("submitted", eventData.submitted)
    formData.append('file', file)
    formData.append("admin_approval", eventData.admin_approval)
    formData.append("carousel_scrolling", eventData.carousel_scrolling)
    formData.append("gallery_scrolling", eventData.gallery_scrolling)
    
    try {
      const response = await axios.post(`${api_ip}/api/webadmin/addimage`, formData)
      if(response.data){
        alert("Event added successfully")
        resetForm()
        getEvents()
      } else {
        alert("Event Not Added")
      }
    } catch (error) {
      alert("Error adding event: " + error.message)
    }
  }

  const resetForm = () => {
    setEventData({
      date: new Date().toISOString().split('T')[0],
      title: "",
      description: "",
      submitted: mods.uds.admin,
      admin_approval: "pending",
      carousel_scrolling: "",
      gallery_scrolling: ""
    });
    setFile(null);
  }

  const getEvents = async () => {
    try {
      const response = await axios.get(`${api_ip}/api/webadmin/allimages`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  const deleteEvent = async (event) => {
    try {
      await axios.get(`${api_ip}/api/webadmin/removeimage/${event.id}`);
      alert(`Event ${event.title} deleted successfully`);
      getEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event");
    }
  }

  const handleEdit = (event) => {
    setEditingEvent(event);
    setEventData({
      date: event.date,
      title: event.title,
      description: event.description,
      submitted: event.submitted,
      admin_approval: event.admin_approval,
      carousel_scrolling: event.carousel_scrolling,
      gallery_scrolling: event.gallery_scrolling
    });
    setOpenModal(true);
  }

  const updateEvent = async () => {
    const formData = new FormData()
    formData.append("dmcupload[date]", eventData.date)
    formData.append("dmcupload[title]", eventData.title)
    formData.append("dmcupload[description]", eventData.description)
    formData.append("dmcupload[submitted]", eventData.submitted)
    if (file) {
      formData.append('file', file)
    }
    formData.append("dmcupload[admin_approval]", eventData.admin_approval)
    formData.append("dmcupload[carousel_scrolling]", eventData.carousel_scrolling)
    formData.append("dmcupload[gallery_scrolling]", eventData.gallery_scrolling)
    
    try {
      const response = await axios.put(`${api_ip}/api/webadmin/update-carousel-image/${editingEvent.id}`, formData)
      if(response.data){
        alert("Event updated successfully")
        setOpenModal(false);
        resetForm();
        getEvents();
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Error updating event");
    }
  }

  useEffect(() => {
    getEvents()
  }, []);

  return (
    <div>
      <div className="updates-main">
        <div>
          <form className="form_container">
            <TextField
              fullWidth
              margin="normal"
              label="Date"
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Title of the event"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              multiline
              rows={4}
              value={eventData.description}
              onChange={handleInputChange}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: '20px', marginBottom: '20px' }}
            >
              {file ? file.name + " Uploaded" : "UPLOAD FILE"}
              <VisuallyHiddenInput 
                type="file" 
                name='file' 
                onChange={(e) => setFile(e.target.files[0])} 
                required 
              />
            </Button>
            <FormControl fullWidth margin="normal">
              <InputLabel>Carousel Scrolling</InputLabel>
              <Select
                name="carousel_scrolling"
                value={eventData.carousel_scrolling}
                onChange={handleInputChange}
              >
                <MenuItem value="yes">YES</MenuItem>
                <MenuItem value="no">NO</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Gallery Scrolling</InputLabel>
              <Select
                name="gallery_scrolling"
                value={eventData.gallery_scrolling}
                onChange={handleInputChange}
              >
                <MenuItem value="yes">YES</MenuItem>
                <MenuItem value="no">NO</MenuItem>
              </Select>
            </FormControl>
            <Button 
              fullWidth
              variant="contained" 
              color="primary" 
              onClick={addEvent}
              style={{ marginTop: '20px' }}
            >
              Add Event
            </Button>
          </form>
        </div>

        <div className="eventsdisplay">
          <h2>Events</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.NO</TableCell>
                  <TableCell>Notification Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Approval Status</TableCell>
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
                    <TableCell>{event.admin_approval}</TableCell>
                    <TableCell>
                      <a href={event.imglink} target="_blank" rel="noopener noreferrer">View File</a>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleEdit(event)}>
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
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Event
          </Typography>
          <form>
            <TextField
              fullWidth
              margin="normal"
              label="Date"
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              multiline
              rows={4}
              value={eventData.description}
              onChange={handleInputChange}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: '20px', marginBottom: '20px' }}
            >
              {file ? file.name + " Uploaded" : "UPLOAD NEW FILE"}
              <VisuallyHiddenInput 
                type="file" 
                name='file' 
                onChange={(e) => setFile(e.target.files[0])} 
              />
            </Button>
            <FormControl fullWidth margin="normal">
              <InputLabel>Carousel Scrolling</InputLabel>
              <Select
                name="carousel_scrolling"
                value={eventData.carousel_scrolling}
                onChange={handleInputChange}
              >
                <MenuItem value="yes">YES</MenuItem>
                <MenuItem value="no">NO</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Gallery Scrolling</InputLabel>
              <Select
                name="gallery_scrolling"
                value={eventData.gallery_scrolling}
                onChange={handleInputChange}
              >
                <MenuItem value="yes">YES</MenuItem>
                <MenuItem value="no">NO</MenuItem>
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={updateEvent}
              style={{ marginTop: '20px' }}
            >
              Update Event
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Upload;
