import React, { useState, useEffect  } from "react";
import '../../css/updates_css/Updates.css'
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
const ips =require('../../api.json')
const api_ip = ips.server_ip
const Updates = () => {
  const [eventData, setEventData] = useState({
    date: "",
    title: "",
    file_path: "",
    update_type: "",
    update_status: "",
  });
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventData({ ...eventData, [name]: value });
  };

  const addEvent = () => {
    axios.post(`http://${api_ip}:8888/api/updtaes/add-event`, { data: eventData })
      .then((response) => {
        console.log(response.data);
        setEventData({
          title: "",
          date: "",
          file_path: "",
          update_type: "",
          update_status: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    axios.get(`http://${api_ip}:8888/api/updates/get-events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const editEvent = (event) => {
    setEditingEvent(event);
    setEventData({
      title: event.title,
      date: event.date,
      file_path: event.file_path,
      update_type: event.update_type,
      update_status: event.update_status,
    });
  };
  const updateEvent = () => {
    axios
      .put(`http://${api_ip}:8888/api/updates/update-event:${editingEvent.id}`,
       { data: eventData })
      .then((response) => {
        console.log(response.data);
        setEditingEvent(null);
        setEventData({
          title: "",
          date: "",
          file_path: "",
          update_type: "",
          update_status: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  

  return (
    <div>
      <div className="updates-main">
        <h1>University Events</h1>

        <h2>Create New Event</h2>
        

          <label for="date">Date:</label>
          <input type="date" id="date" name="date" value={eventData.date}
        onChange={handleInputChange} required />
          <br></br>
          <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={eventData.title}
        onChange={handleInputChange}
        required
      />          <br></br>

          <label for="file-path">Path / Upload File:</label>
          <input type="text" id="time" name="time" value={eventData.file_path}
        onChange={handleInputChange} required />
          <br></br>

          <label for="update-type">Type:</label>
          <input type="text" id="location" name="location" value={eventData.update_type}
        onChange={handleInputChange} required />
          <br></br>

          <label for="update-status">Staus:</label>
          <textarea id="description" name="description"value={eventData.update_status}
        onChange={handleInputChange} required></textarea>
          <br></br>

          <button type="submit" onClick={editingEvent ? updateEvent : addEvent}>
  {editingEvent ? "Update Event" : "Create Event"}
</button>

        

          <div className="eventsdisplay">
          <h2>Events</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.NO</TableCell>
                  <TableCell>Notifiaction Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Staus</TableCell>
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
                    <TableCell><a href={event.file_path} >View File</a></TableCell>
                    <TableCell>
  <Button variant="contained" onClick={() => editEvent(event)}>edit</Button>
</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Updates;