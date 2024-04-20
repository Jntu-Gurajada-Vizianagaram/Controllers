import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/DMCUpload.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
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




  const [file, setFile] = useState();
  const [events, setEvents] = useState([]);
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
    formData.append("admin_approval",eventData.admin_approval)
    formData.append("carousel_scrolling",eventData.carousel_scrolling)
    formData.append("gallery_scrolling",eventData.gallery_scrolling)
    
    try {
      const response = await axios.post(`${api_ip}/api/webadmin/addimage`,formData)
      console.log(response)
      if(response){
        alert("Event added"+response)
      }
        else{
          console.log("Event Not Added")
        }
      getEvents()
    } catch (error) {
      console.log(error)
    }
  }


  const getEvents = async () =>{

    axios
    .get(`${api_ip}/api/webadmin/allimages`)
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
        const response = await axios.get(`${api_ip}/api/webadmin/removeimage/${id}`);
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
          <form className="form_container">
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

            {/* <label for="submitted">Submitted By:</label>
            <TextField
              label="Name of the person"
              variant="outlined"
              name="submitted"
              value={eventData.submitted}
              onChange={handleInputChange}
            /> */}
{/*             
            <br></br>

            <FormControl fullWidth>
              <InputLabel id="admin_approval">Admin Approval</InputLabel>
              <Select
                labelId="admin_approval"
                id="admin_approval"
                name="admin_approval"
                value={eventData.admin_approval}
                onChange={handleInputChange}
              >
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl> */}
            <br></br>
            <FormControl fullWidth>
              <InputLabel id="carousel_scrolling">Carousel Scrolling</InputLabel>
              <Select
                labelId="carousel_scrolling"
                id="carousel_scrolling"
                name="carousel_scrolling"
                value={eventData.carousel_scrolling}
                onChange={handleInputChange}
              >
                <MenuItem value="yes">YES</MenuItem>
                <MenuItem value="no">NO</MenuItem>
              </Select>
            </FormControl>
            <br></br>

            <FormControl fullWidth>
              <InputLabel id="gallery_scrolling">Gallery Scrolling:</InputLabel>
              <Select
                labelId="gallery_scrolling"
                id="gallery_scrolling"
                name="gallery_scrolling"
                value={eventData.gallery_scrolling}
                onChange={handleInputChange}
              >
                <MenuItem value="yes">YES</MenuItem>
                <MenuItem value="no">NO</MenuItem>
              </Select>
            </FormControl>
            <br></br>

            <Button component="label" className="button" variant="contained" onClick={addEvent}>
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
                      <a href={event.imglink} target="_blank">View File</a>
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

export default Upload;
