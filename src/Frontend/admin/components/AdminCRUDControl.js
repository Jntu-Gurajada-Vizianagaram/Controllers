import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, Grid, Modal, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../Main/apis_data/APIs';

const AdminsCRUDControl = () => {
  const [allAdmins, setAllAdmins] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRole, setEditRole] = useState("");

  const admins = async () => {
    try {
      const response = await axios.get(`${api.admin_apis.all_admins}`);
      if (response.data) {
        setAllAdmins(response.data);
      } else {
        //console.log("Data Not Fetched");
      }
    } catch (error) {
      //console.error("Error fetching admins:", error);
      alert("Something went wrong while fetching admins");
    }
  };

  const adding_handle = async () => {
    try {
      const response = await axios.post(`${api.admin_apis.add_hod}`, {
        data: { name, username, password, role }
      });
      if (response.data.Success) {
        alert("Admin Data Successfully added");
        admins();
        setShowModal(false);
      } else {
        alert("Admin Data Not added. Reason: " + response.data.MSG);
      }
    } catch (error) {
      //console.error("Error adding admin:", error);
      alert("An error occurred while adding the admin");
    }
  }

  const openEditModal = (admin) => {
    setEditName(admin.name);
    setEditUsername(admin.username);
    setEditPassword("");
    setEditRole(admin.role);
  };

  const closeEditModal = () => {
    setEditingAdmin(null);
  };

  const update_hod = async () => {
    try {
      if (!editingAdmin) return;

      const updatedAdmin = {
        id: editingAdmin.id,
        name: editingAdmin.name,
        username: editUsername,
        password: editingAdmin.password,
        role: editingAdmin.role
      };

      const response = await axios.put(`${api.admin_apis.update_hod}/${editingAdmin.id}`, updatedAdmin);

      if (response.data.Success) {
        alert("Admin updated successfully!");
        admins();
        closeEditModal();
      } else {
        alert("Failed to update Admin: " + response.data.MSG);
      }
    } catch (error) {
      //console.error("Error updating Admin:", error);
      alert("An error occurred while updating the admin. Please try again.");
    }
  };

  const remove_hod = async (admin) => {
    try {
      const confirmDelete = window.confirm(`Are you sure you want to remove Admin: ${admin.name}?`);
      if (confirmDelete) {
        const response = await axios.delete(`${api.admin_apis.remove_hod}/${admin.id}`);
        if (response.data.Success) {
          alert("Admin Removed Successfully");
          admins();
        } else {
          alert("Something went wrong: " + response.data.msg);
        }
      }
    } catch (error) {
     // console.error("Error removing admin:", error);
      alert("An error occurred while removing the admin");
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
            <Typography variant="h5" color="error">
              NOW EDIT Function Enabled..
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>Add Admin</Button>
          </div>
        </div>
      </div>
      {allAdmins.length > 0 ? (
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
                  <TableCell align="center">{admin.username}</TableCell>
                  <TableCell align="center">{admin.role}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" onClick={() => openEditModal(admin)}>Edit</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="error" onClick={() => remove_hod(admin)} startIcon={<DeleteIcon />}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" align="center">No Admins to Show or Server is Busy Loading Admins</Typography>
      )}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(2px)' }}>
          <div style={{ width: 400, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 8, boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', padding: 20, position: 'relative' }}>
            <IconButton
              style={{ position: 'absolute', top: 10, right: 10 }}
              onClick={() => setShowModal(false)}
            >
              <CloseIcon />
            </IconButton>
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
      <Modal open={!!editingAdmin} onClose={closeEditModal}>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(2px)' }}>
          <div style={{ width: 400, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 8, boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', padding: 20, position: 'relative' }}>
            <IconButton
              style={{ position: 'absolute', top: 10, right: 10 }}
              onClick={closeEditModal}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>
              Edit Admin
            </Typography>
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Name" variant="outlined" value={editName} onChange={(e) => setEditName(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Username" variant="outlined" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="New Password" variant="outlined" type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Role" variant="outlined" value={editRole} onChange={(e) => setEditRole(e.target.value)} />
                </Grid>
              </Grid>
            </Box>
            <Button variant="contained" onClick={update_hod} style={{ marginTop: 20 }}>Update</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminsCRUDControl;