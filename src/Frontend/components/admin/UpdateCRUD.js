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
    main_page: "",
    scrolling: "",
    update_type: "",
    update_status: "",
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
    formData.append("main_page",eventData.main_page)
    formData.append("scrolling",eventData.scrolling)
    formData.append("update_type",eventData.update_type)
    formData.append("update_status",eventData.update_status)
    formData.append('file',file)
    try {
      const response = await axios.post(`http://${api_ip}:8888/api/updates/addevent`,formData)
      console.log(response)
      if(response){
        alert("Event added"+response)
      }
        else{
          console.log("Event Not Added")
        }
      window.location.href='/admin';
    } catch (error) {
      console.log(error)
    }
  }

  const deleteEvent = async (event) => {
    try {
      console.log(event)
      // if(confirm(`Are you sure u want Delete ${event.title}`)==true){
        alert(`Deleting Event ${event.title}`)
        const id =event.id
        const response = await axios.get(`http://${api_ip}:8888/api/updates/removeevent/${id}`);
      // }
      // else{
      //   alert('Event Not Deleted')
      // }
      window.location.href='/admin'
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    axios
      .get(`http://${api_ip}:8888/api/updates/getevents`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="updates-main">
        <div>
          <form>
            <label for="date">Date:</label>
            <input type="text" id="date" name="date" value={eventData.date} onChange={handleInputChange} required />
            <br></br>
           
            <label for="title">Notification Title:</label>
            <TextField
              label="Notification Title"
              variant="outlined"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
            />
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
            <br></br>

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
            <br></br>

            <FormControl fullWidth>
              <InputLabel id="update-type-label">Type of Update</InputLabel>
              <Select
                labelId="update-type-label"
                id="update-type"
                name="update_type"
                value={eventData.update_type}
                onChange={handleInputChange}
              >
                <MenuItem value="notification">Notification</MenuItem>
                <MenuItem value="tender">Tender</MenuItem>
                <MenuItem value="conference">Conference</MenuItem>
                <MenuItem value="recruitment">Recruitment</MenuItem>
              </Select>
            </FormControl>
            <br></br>

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
                      <a href={`http://localhost:8888/files/${event.file_path}`}>View File</a>
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
