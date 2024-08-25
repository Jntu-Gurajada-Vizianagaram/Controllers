import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../css/DMCUpload.css";
import "../css/Gallery.css";

const api_ip = 'https://api.jntugv.edu.in' || 'http:localhost:8888'; // Update this to your server's IP or domain

const GalleryImagesUpload = () => {
  const [eventDetails, setEventDetails] = useState({
    event_name: "",
    uploaded_date: new Date().toISOString().split('T')[0],
    description: "",
    main_page: "",
    admin_approval: "pending",
    added_by: "webadmin" // Replace with dynamic admin user if necessary
  });

  const [files, setFiles] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    Object.entries(eventDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    axios.post(`${api_ip}/api/webadmin/add-gallery-images`, formData)
      .then(response => {
        console.log(response.data);
        fetchGalleryItems(); // Refresh the gallery list
        setFiles([]); // Reset file input after upload
      })
      .catch(error => {
        console.error('Error uploading files:', error);
      });
  };

  const fetchGalleryItems = () => {
    axios.get(`${api_ip}/api/webadmin/all-gallery-images`)
      .then(response => {
        setGalleryItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching gallery items:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${api_ip}/api/webadmin/delete-gallery-image/${id}`)
      .then(response => {
        console.log(response.data);
        fetchGalleryItems(); // Refresh the gallery list after deletion
      })
      .catch(error => {
        console.error('Error deleting image:', error);
      });
  };

  return (
    <Container>
      <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: 3, marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom align="center">Upload Gallery Images</Typography>
        <TextField
          label="Event Name"
          name="event_name"
          value={eventDetails.event_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Uploaded Date"
          name="uploaded_date"
          type="date"
          value={eventDetails.uploaded_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Description"
          name="description"
          value={eventDetails.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Main Page</InputLabel>
          <Select
            name="main_page"
            value={eventDetails.main_page}
            onChange={handleChange}
            label="Main Page"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ marginBottom: '20px', marginRight: '10px' }}
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
            disabled={!eventDetails.event_name || !eventDetails.uploaded_date || files.length === 0}
            sx={{ marginTop: '10px' }}
          >
            Upload
          </Button>
        </Box>
      </Box>
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px', textAlign: 'center' }}>Gallery Items</Typography>
      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
        {galleryItems.map((item) => (
          <Grid item xs={6} sm={4} md={3} key={item.id} sx={{ textAlign: 'center' }}>
            <img
              src={`${api_ip}/uploads/${item.filename}`}
              alt={item.filename}
              style={{ height: '100px', width: '100%', objectFit: 'cover', borderRadius: '4px' }}
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(item.id)}
              sx={{ marginTop: '10px' }}
            >
              Delete
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GalleryImagesUpload;
