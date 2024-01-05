import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

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




  const [file, setFile] = useState();
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    date: (new Date()),
    title: "",
    file_path: `${file}`,
    description: "",
    submitted: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

 

  const addEvent = async () =>{
    const formData = new FormData()
    formData.append("date",eventData.date)
    formData.append("title",eventData.title)
    formData.append("description",eventData.description)
    formData.append("submitted",eventData.submitted)
    formData.append('file',file)
    try {
      const response = await axios.post(`http://${api_ip}:8888/api/upload/addevent`,formData)
      console.log(response)
      if(response){
        alert("Event added"+response)
      }
        else{
          console.log("Event Not Added")
        }
      // window.location.href='/admin';
      getEvents()
    } catch (error) {
      console.log(error)
    }
  }


  const getEvents = async () =>{

    axios
    .get(`http://${api_ip}:8888/api/upload/allevents`)
    .then((response) => {
      setEvents(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }


  const deleteEvent = async (event) => {
    try {
      console.log(event)
      // if(confirm(`Are you sure u want Delete ${event.title}`)==true){
        alert(`Deleting Event ${event.title}`)
        const id =event.id
        const response = await axios.get(`http://${api_ip}:8888/api/upload/removeevent/${id}`);
      // }
      // else{
      //   alert('Event Not Deleted')
      // }
      // window.location.href='/admin'
      getEvents()

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
  
    getEvents()
  }, []);

  return (
    <div>
      <div className="updates-main">
        <div>
          <form>
            <label for="date">Date:</label>
            <input type="text" id="date" name="date" value={eventData.date} onChange={handleInputChange} required />
            <br></br>
           
            <label for="title">Title of the event:</label>
            <TextField
              label="Title of the event"
              variant="outlined"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
            />
            <br></br>
            <label for="description">Description:</label>
            <textarea 
              id="description" 
              name="description"
              value={eventData.description}
              onChange={handleInputChange} required>
            </textarea>
          <br></br>

            <label for="file-path">Path/Upload File:</label>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              {file != null ? file.name + " Uploaded" : "UPLOAD FILE"}
              <VisuallyHiddenInput type="file" name='file' onChange={(e)=>{
                setFile(e.target.files[0]) 
                
                }} required />
            </Button>
            <br></br>

            <label for="submitted">Submitted By:</label>
            <TextField
              label="Name of the person"
              variant="outlined"
              name="submitted"
              value={eventData.submitted}
              onChange={handleInputChange}
            />
            
            <br></br>

            <Button component="label" variant="contained" onClick={addEvent}>
              Submit
            </Button>
            <br></br>
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
                      <a href={`http://api.jntugv.edu.in:8888/files/${event.file_path}`}>View File</a>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => alert(event.title)}>
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
    </div>
  );
};

export default Updates;
