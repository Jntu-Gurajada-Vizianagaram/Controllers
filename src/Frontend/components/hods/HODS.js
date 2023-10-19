import React, { useState } from 'react';
import '../../css/hods_css/Hod.css';
import {FaUpload} from 'react-icons/fa'
const HODS = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('option1');
  const [file, setFile] = useState(null); // State to store the selected file
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="hod-form">
      {submitted ? (
        <div className="hod-submitted">
          <h2>Form Submitted Successfully!</h2>
          <p>Name: {name}</p>
          <p>Description: {description}</p>
          <p>Submitted By: {submittedBy}</p>
          <p>Department: {selectedDepartment}</p>
          {file && <p>Selected File: {file.name}</p>}
        </div>
      ) : (
        <div className="hod-form-container">
          <h2>Institutional Data Upload</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Event Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Event name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Event Description:</label>
              <textarea
                id="description"
                placeholder="Add description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="submittedBy">Submitted By:</label>
              <input
                type="text"
                id="submittedBy"
                placeholder="Enter your name"
                value={submittedBy}
                onChange={(e) => setSubmittedBy(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                required
              >
                <option value="option1">select Department</option>
                <option value="option1">Computer Science and Engineering</option>
                <option value="option2">Electronics and Communication engineering</option>
                <option value="option3">Mechanical Engineering</option>
                <option value="option4">Electrical & Electronics Engineering</option>
                <option value="option5">Information Technology</option>
                <option value="option6">metallurgical engineering</option>
                <option value="option7">Civil Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="file"><FaUpload/>Upload File:</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                accept=".pdf, .doc, .docx" // Specify accepted file types
              />
            </div>
            <button className="btn-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HODS;
