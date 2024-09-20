import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib';
import QRCode from 'qrcode';
import React, { useEffect, useState } from 'react';
import api from '../../Main/apis_data/APIs';
import '../css/Updates.css';

// Accessing favicon using URL
const favicon = `${process.env.PUBLIC_URL}/jntugv.ico`;

// Hidden input for file uploads
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Updates = () => {
  
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState({
    id: null,
    date: new Date().toISOString().slice(0, 10),
    title: "",
    file_path: "",
    external_link: "",
    external_text: "",
    main_page: "",
    scrolling: "",
    update_type: "",
    update_status: "",
    submitted_by: 'admin',
    admin_approval: 'accepted',
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
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
    formData.append("update_type", eventData.update_type);
    formData.append("update_status", eventData.update_status);
    formData.append("submitted_by", eventData.submitted_by);
    formData.append("admin_approval", eventData.admin_approval);
    if (file) {
      formData.append('file', file);
    }
    else{
      formData.append('file','')
    }

    try {
      await axios.post(`${api.updates_apis.add_event}`, formData);
      alert('Event added successfully');
      getEvents();
      setShowModal(false);
    } catch (error) {
      //console.error(error);
      alert("Event Failed to Add..");
    }
  };

  const getEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api.updates_apis.all_admin_event}`);
      setEvents(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (event) => {
    try {
      alert(`Deleting Event ${event.title}`);
      const id = event.id;
      await axios.delete(`${api.updates_apis.remove_event}/${id}`);
      getEvents();
    } catch (error) {
      alert("Event Not Deleted..");
      //console.log(error)
    }
  };

  const openEditModal = (event) => {
    // Populate the form with the event data and format the date correctly
    setEventData({
        ...event,
        date: event.date.slice(0, 10),  // Format date to YYYY-MM-DD
    });
    setFile(null);  // Reset the file input
    setIsEditing(true);  // Set the editing mode
    setShowModal(true);  // Show the modal
};

const editEvent = async () => {
    const id = eventData.id;
    const formData = new FormData();
    formData.append("date", eventData.date);
    formData.append("title", eventData.title);
    formData.append("external_text", eventData.external_text);
    formData.append("external_link", eventData.external_link);
    formData.append("main_page", eventData.main_page);
    formData.append("scrolling", eventData.scrolling);
    formData.append("update_type", eventData.update_type);
    formData.append("update_status", eventData.update_status);
    formData.append("submitted_by", eventData.submitted_by);
    formData.append("admin_approval", eventData.admin_approval);

    // Append the file if it exists
    if (file) {
        formData.append('file', file);
    }

    try {
        const response = await axios.put(`${api.updates_apis.update_event}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            alert('Event updated successfully');
            getEvents();
            setShowModal(false);
        } else {
            alert('Failed to update the event. Please try again.');
        }
    } catch (error) {
        alert('Error updating event. Please try again.');
    }
};

const handleSubmit = () => {
    if (isEditing) {
        editEvent();
    } else {
        addEvent();
    }
};

  const generateQRCodePDF = async () => {
    if (!file) {
      alert('Please upload a file first.');
      return;
    }

    const fileName = file.name.split('.').slice(0, -1).join('.');
    const qrLink = `https://api.jntugv.edu.in/media/${fileName}.pdf`;

    try {
      const qrCodeCanvas = document.createElement('canvas');
      await QRCode.toCanvas(qrCodeCanvas, qrLink, { errorCorrectionLevel: 'H' });

      const qrCodeContext = qrCodeCanvas.getContext('2d');
      const logoImg = await loadImage(favicon);

      const logoSize = qrCodeCanvas.width / 2;
      const x = (qrCodeCanvas.width - logoSize) / 2;
      const y = (qrCodeCanvas.height - logoSize) / 2;
      qrCodeContext.drawImage(logoImg, x, y, logoSize, logoSize);

      const qrCodeBlob = await new Promise((resolve) => qrCodeCanvas.toBlob(resolve, 'image/png'));

      const pdfBytes = await appendQRCodeToPdf(qrCodeBlob, file);
      saveAs(new Blob([pdfBytes]), `${fileName}.pdf`);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const appendQRCodeToPdf = async (qrCodeBlob, pdfFile) => {
    const pdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const firstPage = pdfDoc.getPages()[0];
    const { width, height } = firstPage.getSize();
    

    const qrImage = await pdfDoc.embedPng(await qrCodeBlob.arrayBuffer());
    const qrSize = 75;
    firstPage.drawImage(qrImage, {
      x: width - qrSize - 10,
      y: 10,
      width: qrSize,
      height: qrSize,
    });

    return pdfDoc.save();
  };

  useEffect(() => {
    getEvents();
  }, []);

  const openModalForAdding = () => {
    setEventData({
      id: null,
      date: new Date().toISOString().slice(0, 10),
      title: "",
      file_path: "",
      external_text: "",
      external_link: "",
      main_page: "",
      scrolling: "",
      update_type: "",
      update_status: "",
      submitted_by: 'admin',
      admin_approval: 'accepted',
    });
    setFile(null);
    setIsEditing(false);
    setShowModal(true);
  };

  return (
    <div>
      <Button variant="contained" startIcon={<AddIcon />} onClick={openModalForAdding} sx={{ mb: 2 }}>
        Add New Notification
      </Button>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '70%' },
            maxWidth: '600px',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
            overflowY: 'auto',
            maxHeight: '80vh',
          }}
        >
          <Typography variant="h5" component="h2">
            {isEditing ? 'Edit Notification' : 'Add Notification'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<CloseIcon />}
            onClick={() => setShowModal(false)}
            sx={{ mb: 2 }}
          >
            Close
          </Button>
          <form>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Notification Title"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="External Text For Links"
                name="external_text"
                value={eventData.external_text}
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="External Link"
                name="external_link"
                value={eventData.external_link}
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Main Page</InputLabel>
                <Select
                  name="main_page"
                  value={eventData.main_page}
                  onChange={handleInputChange}
                >
                  <MenuItem value="yes">YES</MenuItem>
                  <MenuItem value="no">NO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Flash Scrolling</InputLabel>
                <Select
                  name="scrolling"
                  value={eventData.scrolling}
                  onChange={handleInputChange}
                >
                  <MenuItem value="yes">YES</MenuItem>
                  <MenuItem value="no">NO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Type of Update</InputLabel>
                <Select
                  name="update_type"
                  value={eventData.update_type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="circular">Circular</MenuItem>
                  <MenuItem value="exams">Exams</MenuItem>
                  <MenuItem value="calendar">Academic Calendar</MenuItem>
                  <MenuItem value="regulation">Academic Regulation</MenuItem>
                  <MenuItem value="syllabus">Academic Syllabus</MenuItem>
                  <MenuItem value="tender">Tender</MenuItem>
                  <MenuItem value="workshop">Workshop</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="conference">Conference</MenuItem>
                  <MenuItem value="recruitment">Recruitment</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="update_status"
                  value={eventData.update_status}
                  onChange={handleInputChange}
                >
                  <MenuItem value="update">Update</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                Upload PDF File
                <VisuallyHiddenInput type="file" accept="application/pdf" onChange={handleFileChange} />
              </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                {isEditing ? 'Update Notification' : 'Add Notification'}
              </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button fullWidth variant="contained" color="secondary" onClick={generateQRCodePDF} disabled={!file}>
                Generate QR Code and Download PDF
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <div className="eventsdisplay">
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '2em' }}>
            <Typography>Loading... Files</Typography>
            <CircularProgress />
          </div>
        ) : (
          <div>
            {events.length ? (
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
                          <a href={event.file_link} target="_blank" rel="noopener noreferrer">View File</a>
                        </TableCell>
                        <TableCell>
                          <Button variant="contained" onClick={() => openEditModal(event)}>
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
            ) : (
              <Typography variant="h6">No Notifications Added (or) Server is Busy while Loading the Notifications</Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Updates;