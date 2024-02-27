import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from 'axios';
import "../css/Admin.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdminsCRUDControl from '../components/AdminCRUDControl';
import AllCrudControls from "../components/AllCrudControl";
import AllRequestControls from "../components/AllRequestControl";



const Admin = () => {
  const [requests,setRequests] =useState([])
  const ips = require("../../api.json");
  const api_ip = ips.server_ip;
  
  
  const get_requests = async () =>{
    axios
    .get(`http://${api_ip}/api/updates/update-requests`)
    .then((response) => {
      setRequests(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  } 

  const request_accept = (request)=>{
    axios.get(`http://${api_ip}/api/updates/update-accept-request/${request.id}`)
      .then((response)=>{
        alert(response.data.message)
        get_requests()
      })
      .catch((err)=>{
        console.log(err)
      })
      
    }
    
  //   const PWDCHECK =()=>{
  //     axios.get(`http://${api_ip}/api/admins/generate-password`)
  //       .then((response)=>{
  //         alert(response.data.pwd)   
  //         get_requests()
  //       })
  //       .catch((err)=>{
  //         console.log(err)
  //         alert(err)
  //       })
  // }



useEffect(()=>{
  get_requests();
},[])
  
  
  return (
    <div className="admin-main">
      <div>
        <a href="/">
          
          <br />
        </a>
        <div className="all-requests">
          <h1>All Pending or Active Requests</h1>
        </div>
        <div className="eventsdisplay">
          <h2>Events</h2>
          {/* <Button variant="contained" color="error" onClick={() => PWDCHECK()}>
            Deny
          </Button> */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow key={"Table Attributes"}>
                  <TableCell>S.NO</TableCell>
                  <TableCell>Notification Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Update Added By</TableCell>
                  <TableCell>View File</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>{request.update_status}</TableCell>
                    <TableCell>{request.submitted_by}</TableCell>
                    <TableCell>
                      <a href={request.file_link} target="_blank">View File</a>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => request_accept(request)}>
                        Accept
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" onClick={() => request_deny(request)}>
                        Deny
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="all-consoles">
        
      </div>
      {/* <AdminsCRUDControl/> */}
       {/* <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography> Admins Requests </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <AllRequestControls/>
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography>ALL Consoles</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <AllCrudControls/>
        </Typography>
      </AccordionDetails>
    </Accordion>*/}
    </div> 
  );
};

export default Admin;