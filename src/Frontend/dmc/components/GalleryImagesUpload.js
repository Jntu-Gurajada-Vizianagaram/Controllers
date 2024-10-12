import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import "../css/DMCUpload.css";
import "../css/Gallery.css";

const ips = require("../../api.json");
const api_ip = ips.server_ip;

const GalleryImagesUpload = () => {
  const [eventDetails, setEventDetails] = useState({
    event_name: "",
    uploaded_date: new Date().toISOString().split('T')[0],
    description: "",
    added_by: "webadmin"
  });
  const [files, setFiles] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchGalleryItems = useCallback(() => {
    axios.get(`${api_ip}/api/gallery/all-gallery-images`)
      .then(response => setGalleryItems(response.data))
      .catch(error => console.error('Error fetching gallery items:', error));
  }, []);

  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setEventDetails({
      event_name: "",
      uploaded_date: new Date().toISOString().split('T')[0],
      description: "",
      added_by: "webadmin"
    });
    setFiles([]);
  };

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleUpload = () => {
    const formData = new FormData();
    Object.entries(eventDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
    files.forEach((file) => formData.append('files', file));

    axios.post(`${api_ip}/api/gallery/add-gallery-images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => {
        alert("Gallery Image added Successfully");
        fetchGalleryItems();
        clearForm();
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
        alert('Failed to upload images. Please try again.');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${api_ip}/api/gallery/delete-gallery-image/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
      .then(() => {
        alert('Image deleted successfully');
        fetchGalleryItems();
      })
      .catch((error) => {
        console.error('Error deleting image:', error);
        alert('Failed to delete the image. Please try again.');
      });
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  return (
    <Container>
      <Box
        sx={{
          padding: 3,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          boxShadow: 3,
          mt: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Upload Gallery Images
        </Typography>
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
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ mr: 2 }}
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
            disabled={!eventDetails.event_name || files.length === 0}
          >
            Upload
          </Button>
        </Box>
      </Box>

      <Typography variant="h5" gutterBottom align="center" sx={{ mt: 3 }}>
        Gallery Items
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {galleryItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                borderRadius: 2,
                height: '100%',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.imagelink}
                alt={item.event_name}
                sx={{
                  objectFit: 'fill',
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                {/* <Typography variant="h6" gutterBottom>{item.event_name}</Typography> */}
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.description.length > 75
                    ? `${item.description.slice(0, 100)}...`
                    : item.description}
                </Typography>
                {item.description.length > 75 && (
                  <Button
                    size="small"
                    onClick={() => handleOpenModal(item)}
                  >
                  <Typography variant="body2" color="text.secondary" gutterBottom>Read more</Typography> 
                  </Button>
                )}
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  {new Date(item.uploaded_date).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedItem && (
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedItem.event_name}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              {selectedItem.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default GalleryImagesUpload;
