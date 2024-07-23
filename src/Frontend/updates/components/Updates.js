import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel, MenuItem,
  Paper,
  Select,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow,
  TextField
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

const Updates = () => {
  const [file, setFile] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: "",
    file_path: "",
    external_link: "",
    external_text: "",
    main_page: "",
    scrolling: "",
    update_type: ["notification"], // default to notification
    update_status: "",
    submitted_by: mods.uds.admin,
    admin_approval: "pending",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEventData((prevState) => {
      const update_type = checked
        ? [...prevState.update_type, name]
        : prevState.update_type.filter((type) => type !== name);
      
      // Ensure notification is always checked
      if (!update_type.includes("notification")) {
        update_type.push("notification");
      }

      return {
        ...prevState,
        update_type,
      };
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
    formData.append("update_type", JSON.stringify((eventData.update_type)));
    formData.append("update_status", eventData.update_status);
    formData.append("submitted_by", eventData.submitted_by);
    formData.append("admin_approval", eventData.admin_approval);
    if (file) formData.append("file", file);

    try {
      const response = await axios.post(`${api_ip}/api/updates/add-event`, formData);
      console.log(response);
      alert("Event added successfully");
      getEvents();
      setEventData({
        date: new Date().toISOString().split('T')[0],
        title: "",
        file_path: "",
        external_link: "",
        external_text: "",
        main_page: "",
        scrolling: "",
        update_type: "",
        update_status: ["notification"],
        submitted_by: mods.uds.admin,
        admin_approval: "pending",
      });
      setFile(null);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get(`${api_ip}/api/updates/all-updater-events/${mods.uds.admin}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const deleteEvent = async (event) => {
    try {
      const id = event.id;
      await axios.get(`${api_ip}/api/updates/remove-event/${id}`);
      alert(`Event ${event.title} deleted successfully`);
      getEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="updates-main">
      <h1>Add New all Notification</h1>
      <form>
        <TextField
          type="date"
          label="Date"
          variant="outlined"
          name="date"
          value={eventData.date}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <br /><br />
        <TextField
          label="Notification Title"
          variant="outlined"
          name="title"
          value={eventData.title}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <br /><br />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          {file ? file.name + " Uploaded" : "UPLOAD FILE"}
          <VisuallyHiddenInput
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>
        <br /><br />
        <TextField
          label="External Text (e.g., Click here, Register Now, Read more)"
          variant="outlined"
          name="external_text"
          value={eventData.external_text}
          onChange={handleInputChange}
          fullWidth
        />
        <br /><br />
        <TextField
          label="External Link (full URL)"
          variant="outlined"
          name="external_link"
          value={eventData.external_link}
          onChange={handleInputChange}
          fullWidth
        />
        <br /><br />
        <FormControl fullWidth>
          <InputLabel id="main-page-label">Main Page Publish</InputLabel>
          <Select
            labelId="main-page-label"
            id="main_page"
            name="main_page"
            value={eventData.main_page}
            onChange={handleInputChange}
          >
            <MenuItem value="yes">YES</MenuItem>
            <MenuItem value="no">NO</MenuItem>
          </Select>
        </FormControl>
        <br /><br />
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
        <br /><br />
        <FormControl component="fieldset" fullWidth>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked disabled name="notification" />}
              label="Notification"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={eventData.update_type.includes("examination")}
                  onChange={handleCheckboxChange}
                  name="examination"
                />
              }
              label="Examssss"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={eventData.update_type.includes("workshop")}
                  onChange={handleCheckboxChange}
                  name="workshop"
                />
              }
              label="Workshop"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={eventData.update_type.includes("sports")}
                  onChange={handleCheckboxChange}
                  name="sports"
                />
              }
              label="Sports"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={eventData.update_type.includes("recruitment")}
                  onChange={handleCheckboxChange}
                  name="recruitment"
                />
              }
              label="Recruitment"
            />
          </FormGroup>
        </FormControl>
        <br /><br />
        <FormControl fullWidth>
          <InputLabel id="update-status-label">Status</InputLabel>
          <Select
            labelId="update-status-label"
            id="update_status"
            name="update_status"
            value={eventData.update_status}
            onChange={handleInputChange}
          >
            <MenuItem value="update">Update</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </Select>
        </FormControl>
        <br /><br />
        <Button variant="contained" onClick={addEvent}>
          Submit
        </Button>
      </form>
      <h2>Events</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Notification Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Update Added By</TableCell>
              <TableCell>Admin Approval</TableCell>
              <TableCell>View File</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.update_status}</TableCell>
                <TableCell>{event.submitted_by}</TableCell>
                <TableCell>{event.admin_approval}</TableCell>
                <TableCell>
                  <a href={event.file_link} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
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
  );
};

export default Updates;
