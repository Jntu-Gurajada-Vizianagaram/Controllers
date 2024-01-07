import axios from 'axios';
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, InputLabel, Select, MenuItem, FormControl, Input } from '@mui/material';

const FacultyGrievance = () => {
  const [rollno, setRollno] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [adhaarno, setAdaarno] = useState("");
  const [collegename, setCollegeName] = useState("");
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState("");
  const ips = require('../../api.json');
  const api_ip = ips.server_ip;

  const sendMail = async () => {
    alert("Sending Mail...");

    const formData = new FormData();
    formData.append("rollno", rollno);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("phno", phno);
    formData.append("adhaarno", adhaarno);
    formData.append("collegename", collegename);
    formData.append("category", category);
    formData.append("msg", msg);
    formData.append("file", file);

    const response = await axios.post(`http://${api_ip}:8888/api/mailing/sendmail`, formData);

    if (response.data.success === true) {
      alert("Grievance Mail Sent");
    } else {
      alert("No response");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} className='grievance-form' style={{ padding: '20px',marginTop:"20px" }}>
        <Typography variant="h5">Authority Grievance Form</Typography>
        <form style={{textAlign:"center"}}>
          <TextField label="Student Rollno" variant="outlined" fullWidth value={rollno} onChange={(e) => setRollno(e.target.value)} required={true} margin="normal" />
          <TextField label="Student Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required={true} margin="normal" />
          <TextField label="Full Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} required={true} margin="normal" />
          <TextField label="Phone Number" variant="outlined" fullWidth value={phno} onChange={(e) => setPhno(e.target.value)} required={true} margin="normal" />
          <TextField label="Adhaar Number" variant="outlined" fullWidth value={adhaarno} onChange={(e) => setAdaarno(e.target.value)} required={true} margin="normal" />
          <TextField label="College Name" variant="outlined" fullWidth value={collegename} onChange={(e) => setCollegeName(e.target.value)} required={true} margin="normal" />

          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Grievance Category</InputLabel>
            <Select labelId="category-label" id="category" value={category} onChange={(e) => setCategory(e.target.value)} label="Grievance Category">
              <MenuItem value="category1">Category 1</MenuItem>
              <MenuItem value="category2">Category 2</MenuItem>
              {/* Add other MenuItem components for different categories */}
            </Select>
          </FormControl>

          <TextField label="Detailed Description of Grievance/Problem" variant="outlined" fullWidth multiline rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} required={true} margin="normal" />

          <Input type="file" fullWidth accept=".jpg, .jpeg, .png, .pdf" onChange={(e) => setFile(e.target.files[0])} />

          <Button variant="contained" color="primary" onClick={sendMail} style={{ marginTop: '20px' }}>Send</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default FacultyGrievance;
