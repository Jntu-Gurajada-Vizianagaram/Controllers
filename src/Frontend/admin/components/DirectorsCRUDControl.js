import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import api from '../../Main/apis_data/APIs';

const DirectorForm = () => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    academic_position_id: "",
    department_id: "",
    directorate_id: "",
    profile_url: "",
    personal_website: "",
    photo: null,
    is_incharge: false,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "full_name",
      "email",
      "academic_position_id",
      "department_id",
      "directorate_id",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const formDataToSubmit = new FormData();

      // Append form data and handle special cases
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "photo" && value instanceof File) {
          formDataToSubmit.append(key, value); // Append file
        } else {
          formDataToSubmit.append(
            key,
            key === "is_incharge" ? (value ? 1 : 0) : value // Handle boolean as integer
          );
        }
      });

      // Debugging: Print FormData key-value pairs
      console.log("FormData before submission:");
      for (let pair of formDataToSubmit.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // POST request to the API
      const response = await axios.post(
        `${api.admin_apis.add_director}`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Director added successfully!");
        handleCloseModal();
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error saving director:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Error saving director. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({
      full_name: "",
      email: "",
      academic_position_id: "",
      department_id: "",
      directorate_id: "",
      profile_url: "",
      personal_website: "",
      photo: null,
      is_incharge: false,
    });
  };

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get(`${api.admin_apis.directors}`);
        if (response?.data) {
          setDirectors(response.data);
          console.log(response.data);
        } else if (response?.data === null || response?.data === undefined) {
          setError('No directors data available');
        }
      } catch (err) {
        setError('Failed to fetch directors');
        console.error('Error fetching directors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectors();
  }, []);

  const handleEdit = async (id) => {
    try {
      const directorToEdit = directors.find(director => director.id === id);
      if (!directorToEdit) {
        throw new Error("Director not found");
      }

      // Set form data for editing
      setFormData({
        id: directorToEdit.id, // Add the ID to track which director we're editing
        full_name: directorToEdit.full_name,
        email: directorToEdit.email,
        academic_position_id: directorToEdit.academic_position_id,
        department_id: directorToEdit.department_id,
        directorate_id: directorToEdit.directorate_id,
        profile_url: directorToEdit.profile_url || "",
        personal_website: directorToEdit.personal_website || "",
        photo: null,
        is_incharge: directorToEdit.is_incharge
      });

      // Update modal title to indicate editing
      setModalTitle("Edit Director");
      setSelectedDirector(directorToEdit);
      setModalOpen(true);
    } catch (error) {
      console.error("Error preparing director for edit:", error);
      alert("Error preparing director for edit. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this director?")) {
      return;
    }

    try {
      const response = await axios.delete(`${api.admin_apis.remove_director}/${id}`);

      if (response.status === 200) {
        setDirectors(directors.filter(director => director.id !== id));
        alert("Director deleted successfully!");
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (error) {
      console.error("Error deleting director:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Error deleting director. Please try again.");
    }
  };

  return (
    <div>
      <h1>Directors Management</h1>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
        Add Director
      </Button>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Add Director</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              name="full_name"
              label="Full Name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Academic Position</InputLabel>
              <Select
                name="academic_position_id"
                value={formData.academic_position_id}
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Position</MenuItem>
                <MenuItem value="1">Professor</MenuItem>
                <MenuItem value="2">Associate Professor</MenuItem>
                <MenuItem value="3">Assistant Professor</MenuItem>
                <MenuItem value="4">Senior Lecturer</MenuItem>
                <MenuItem value="5">Lecturer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Department</InputLabel>
              <Select
                name="department_id"
                value={formData.department_id}
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Department</MenuItem>
                <MenuItem value="1">Computer Science Engineering</MenuItem>
                <MenuItem value="2">Information Technology</MenuItem>
                <MenuItem value="3">Mechanical Engineering</MenuItem>
                <MenuItem value="4">Civil Engineering</MenuItem>
                <MenuItem value="5">Electrical and Electronics Engineering</MenuItem>
                <MenuItem value="6">Electronics and Communications Engineering</MenuItem>
                <MenuItem value="7">Metallurgical Engineering</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Directorate</InputLabel>
              <Select
                name="directorate_id"
                value={formData.directorate_id}
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Directorate</MenuItem>
                <MenuItem value="1">Academic Planning</MenuItem>
                <MenuItem value="2">Academic Audit</MenuItem>
                <MenuItem value="3">Evaluation</MenuItem>
                <MenuItem value="4">Admissions</MenuItem>
                <MenuItem value="5">Industrial Relations & Placements</MenuItem>
                <MenuItem value="6">Research and Development</MenuItem>
                <MenuItem value="7">Alumni Relations</MenuItem>
                <MenuItem value="8">Internal Quality Assurance Cell</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="is_incharge"
                  checked={formData.is_incharge}
                  onChange={handleCheckboxChange}
                />
              }
              label="Is Incharge"
            />
            <TextField
              fullWidth
              margin="normal"
              name="profile_url"
              label="Profile URL"
              value={formData.profile_url}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="personal_website"
              label="Personal Website"
              value={formData.personal_website}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              type="file"
              name="photo"
              onChange={handleFileChange}
              inputProps={{
                accept: "image/*",
              }}
            />
            <DialogActions>
              <Button onClick={handleCloseModal} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mt: 4, gap: 2 }}>
        {/* Left Panel - Directors Grid */}
        <Box sx={{ width: { xs: '100%', md: '60%' }, p: 1 }}>
          <Typography variant="h4" gutterBottom>
            Directors List
          </Typography>
          {directors.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No directors found
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {directors.map((director) => (
                <Grid item xs={12} sm={6} md={4} key={director.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                    onClick={() => setSelectedDirector(director)}
                  >
                    <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                      <CardMedia
                        component="img"
                        image={director.photo_url || '/default-director.jpg'}
                        alt={director.full_name}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="body2" color="primary" noWrap>
                        {director.directorate_name}
                      </Typography>
                      <Typography variant="subtitle1" noWrap>
                        {director.full_name}
                      </Typography>
                      {director.is_incharge && (
                        <Chip label="In Charge" color="primary" size="small" sx={{ mt: 1 }} />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Right Panel - Director Details */}
        <Box sx={{ width: { xs: '100%', md: '40%' }, p: 2, borderLeft: { md: '1px solid #ddd' } }}>
          {selectedDirector ? (
            <Box>
              <Typography variant="h5" gutterBottom>
                Director Details
              </Typography>
              <Box sx={{ mb: 2, position: 'relative', paddingTop: '56.25%' }}>
                <img
                  src={selectedDirector.photo_url || '/default-director.jpg'}
                  alt={selectedDirector.full_name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                {selectedDirector.full_name}
              </Typography>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                {selectedDirector.directorate_name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {selectedDirector.academic_position_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">{selectedDirector.department_name}</Typography>
              <Typography variant="body2" gutterBottom>
                Email: {selectedDirector.email}
              </Typography>
              {selectedDirector.profile_url && (
                <Typography variant="body2" gutterBottom>
                  Profile: <a href={selectedDirector.profile_url} target="_blank" rel="noopener noreferrer">View Profile</a>
                </Typography>
              )}
              {selectedDirector.personal_website && (
                <Typography variant="body2" gutterBottom>
                  Website: <a href={selectedDirector.personal_website} target="_blank" rel="noopener noreferrer">Visit Website</a>
                </Typography>
              )}
              {selectedDirector.is_incharge && (
                <Chip label="In Charge" color="primary" sx={{ mt: 1 }} />
              )}
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(selectedDirector.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(selectedDirector.id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              Select a director to view details
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default DirectorForm;
