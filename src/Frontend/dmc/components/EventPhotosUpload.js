import React, { useState } from 'react';
import { Button, Container, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import mods from '../../Main/Component/Logins/Login'
const EventPhotosUpload = () => {
  const [event_details, setEventDetails] = useState({
    event_name: "",
    uploaded_date: (new Date()), // Set initial date to today
    description: "",
    main_page: "",
    admin_approval:"pending",
    added_by:mods.uds.admin,
  });
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    Object.entries(event_details).forEach(([key, value]) => {
      formData.append(key, value);
    });
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    axios.post('http://localhost:8888/api/webadmin/add-event-photos', formData)
      .then(response => {
        console.log(response.data);
        // Show success message or handle response accordingly
      })
      .catch(error => {
        console.error('Error uploading files:', error);
        // Show error message or handle error accordingly
      });
  };

  return (
    <Container>
      <TextField
        label="Event Name"
        name="event_name"
        value={event_details.event_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Uploaded Date"
        name="uploaded_date"
        type="date"
        value={event_details.uploaded_date}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={event_details.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Main Page</InputLabel>
        <Select
          name="main_page"
          value={event_details.main_page}
          onChange={handleChange}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </Select>
      </FormControl>
      <label htmlFor="file-path">Path/Upload File: <br></br>
      <i>Note Please use ctrl to Select Multiple Files</i   >
      </label>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        {files.length > 0 ? `${files.length} files selected` : "UPLOAD Photos"}
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </Button> 
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!event_details.event_name || !event_details.uploaded_date || files.length === 0}
      >
        Upload
      </Button>
    </Container>
  );
};

export default EventPhotosUpload;
