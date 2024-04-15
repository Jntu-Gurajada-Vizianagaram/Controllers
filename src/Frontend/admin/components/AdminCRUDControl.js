import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, Modal, Typography, TextField, Grid, Box } from '@mui/material';
import { RiAdminFill, RiLockPasswordFill } from "react-icons/ri";
import { GiCharacter } from "react-icons/gi";
import AddIcon from '@mui/icons-material/Add';

const AdminsCRUDControl = () => {
  const [allAdmins, setAllAdmins] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const ips = require('../../api.json');
  const api_ip = ips.server_ip;

  const admins = async () => {
    try {
      const response = await axios.get(`${api_ip}/api/admins/getadmins`);
      if (response.data) {
        setAllAdmins(response.data);
      } else {
        console.log("Data Not Fetched");
      }
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  const adding_handle = async () => {
    try {
      const response = await axios.post(`${api_ip}/api/admins/add-hod`, {
        data: { name, username, password, role }
      });
      if (response.data.Success) {
        alert("HOD Data Successfully added");
        admins();
        setShowModal(false); // Close modal after adding admin
      } else {
        alert("HOD Data Not added. Reason: " + response.data.MSG);
      }
    } catch (error) {
      alert("Exception: " + error);
      console.log(error);
    }
  }

  const remove_hod = async (admin) => {
    try {
      alert("Removing Admin: " + admin.id);
      const response = await axios.get(`${api_ip}/api/admins/remove-hod/${admin.id}`);
      if (response.data.Success) {
        alert("Admin Removed Successfully");
        admins();
      } else {
        console.log("Something went wrong: " + response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    admins();
  }, []);

  return (
    <div>
      <div className="admin-crud-consoles">
        <div className="hods-crud-console">
          <div>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>Add Admin</Button>
          </div>
        </div>
      </div>
      {allAdmins != "" ? 
        <TableContainer component={Card}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAdmins.map((admin) => (
              <TableRow key={admin.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{admin.name}</TableCell>
                <TableCell align="left">{admin.username}</TableCell>
                <TableCell align="left">{admin.role}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="success">Edit</Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="error" onClick={() => { remove_hod(admin) }} startIcon={<DeleteIcon />}>Delete {admin.id}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      :
      <div>
      <h1> No Admins to Show (or) Server Busy to Load ADMINS</h1>
      </div>}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(2px)' }}>
          <div style={{ width: 400, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 8, boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Add Admin
            </Typography>
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Role" variant="outlined" onChange={(e) => setRole(e.target.value)} />
                </Grid>
              </Grid>
            </Box>
            <Button variant="contained" onClick={adding_handle} style={{ marginTop: 20 }}>Add</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

export default AdminsCRUDControl;



// import axios from 'axios'
// import React from 'react'
// const AdminsControl = () => {
//   const ips =require('../../api.json')
//   const api_ip = ips.server_ip

//   const gen_password = async () =>{
//     try {
//       const response = await axios.get(`https://${api_ip}:8888/api/admins/generate-password`);
//       if (response !== null) {
//         console.log(response.data)
//         alert(response.data.pwd)
//       } else {
//         console.log("Data Not Fetched");
//         // setError("Datat Not Fetched");
//       }
//     } catch (error) { 
//       console.log(error)
//     }
//   }


//   return (
//     <div className='hod-contraol-main'>
//         <div className='add-hod'>
//           <button onClick={gen_password}>Alert-Password</button>
//         </div>
//         <div className='All Hods'>
            
//         </div>
//     </div>
//   )
// }

// export default AdminsControl