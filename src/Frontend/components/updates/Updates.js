import React, { useState, useEffect  } from "react";
import '../../css/updates_css/Updates.css'
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const Updates = () => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventData({ ...eventData, [name]: value });
  };

  const addEvent = () => {
    axios.post("http://localhost:8081/insert", { data: eventData })
      .then((response) => {
        console.log(response.data);
        setEventData({
          title: "",
          date: "",
          time: "",
          location: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/updates")
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
      time: event.time,
      location: event.location,
      description: event.description,
    });
  };
  const updateEvent = () => {
    axios
      .put(`http://localhost:8081/update/${editingEvent.id}`,
       { data: eventData })
      .then((response) => {
        console.log(response.data);
        setEditingEvent(null);
        setEventData({
          title: "",
          date: "",
          time: "",
          location: "",
          description: "",
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
        
          <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={eventData.title}
        onChange={handleInputChange}
        required
      />          <br></br>

          <label for="date">Date:</label>
          <input type="date" id="date" name="date" value={eventData.date}
        onChange={handleInputChange} required />
          <br></br>

          <label for="time">Time:</label>
          <input type="text" id="time" name="time" value={eventData.time}
        onChange={handleInputChange} required />
          <br></br>

          <label for="location">Location:</label>
          <input type="text" id="location" name="location" value={eventData.location}
        onChange={handleInputChange} required />
          <br></br>

          <label for="description">Description:</label>
          <textarea id="description" name="description"value={eventData.description}
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
                  <TableCell>Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.description}</TableCell>
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