// Upload.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../components/css/dmc_css/Upload.css';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    uploadedImage: null,
    submittedBy: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
  const ALLOWED_FILE_FORMATS = ['image/jpeg', 'image/png', 'image/jpg']; 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    // Check if a file is selected
    if (file) {
      // Check if the file format is allowed
      if (ALLOWED_FILE_FORMATS.includes(file.type)) {
        // Check if the file size is within the allowed limit
        if (file.size <= MAX_FILE_SIZE) {
          // File format and size are valid, update the state
          setFormData({ ...formData, uploadedImage: file });
        } else {
          alert('File size exceeds the allowed limit (2MB). Please choose a smaller file.');
          // Clear the input field to let the user select a different file
          e.target.value = null;
        }
      } else {
        alert('Invalid file format. Please upload a JPEG or PNG or JPG image.');
        // Clear the input field to let the user select a different file
        e.target.value = null;
      }
    }
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.uploadedImage && formData.submittedBy) {
      alert('Details sent to the admin for approval.');
      console.log(formData);
      setFormData({
        title: '',
        description: '',
        uploadedImage: null,
        submittedBy: ''
      });
    } else {
      alert('Please fill out all the fields.');
    }
    if (formData.uploadedImage) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('uploadedImage', formData.uploadedImage);

        await axios.post('http://localhost:3001/upload', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        alert('Image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image: ', error);
      }
    } else {
      alert('Please select an image to upload.');
    }
  };
  

  return (
    <div>
      <div className="title">Upload Photography</div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label>Title of the Event:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      </div>
      <div className="input-container">
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} />
      </div>
      <div className="input-container">
        <label>Upload Images:</label>
        <input type="file" name="uploadedImage" onChange={handleFileChange} />
      </div>
      <div className="input-container">
        <label>Submitted By:</label>
        <input type="text" name="submittedBy" value={formData.submittedBy} onChange={handleInputChange} />
      </div>
      <div className="button-container">
      <button type="submit">Submit</button></div>
    </form>
    </div>
    </div>
  );
}

export default Upload
