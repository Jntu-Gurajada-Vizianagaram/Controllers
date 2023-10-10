import React, { useState } from "react";
import axios from "axios";
import "../../components/css/dmc_css/Upload.css";

const Upload = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    uploadedImage: null,
    submittedBy: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const MAX_FILE_SIZE = 2 * 1024 * 1024; 
  const ALLOWED_FILE_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (ALLOWED_FILE_FORMATS.includes(file.type)) {
        if (file.size <= MAX_FILE_SIZE) {
          setFormData({ ...formData, uploadedImage: file });
        } else {
          alert(
            "File size exceeds the allowed limit (2MB). Please choose a smaller file.",
          );
          e.target.value = null;
        }
      } else {
        alert("Invalid file format. Please upload a JPEG or PNG or JPG image.");
        e.target.value = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.title &&
      formData.description &&
      formData.uploadedImage &&
      formData.submittedBy
    ) {
      alert("Details sent to the admin for approval.");
      console.log(formData);
      setFormData({
        title: "",
        description: "",
        uploadedImage: null,
        submittedBy: "",
      });
    } else {
      alert("Please fill out all the fields.");
    }
    if (formData.uploadedImage) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("uploadedImage", formData.uploadedImage);

        await axios.post("http://localhost:3001/upload", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    } else {
      alert("Please select an image to upload.");
    }
  };

  return (
    <div>
      <div className="title">Upload Photography</div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Title of the Event:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label>Upload Images:</label>
            <input
              type="file"
              name="uploadedImage"
              onChange={handleFileChange}
            />
          </div>
          <div className="input-container">
            <label>Submitted By:</label>
            <input
              type="text"
              name="submittedBy"
              value={formData.submittedBy}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
