import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from 'axios';
import "../../css/Admin.css";
import api from '../../../Main/apis_data/APIs'


const WebAdminRequests = () => {
  const [requests,setRequests] =useState([])
  
  
  const get_requests = async () =>{
    axios
    .get(`${api.webadmin_requests.webadmin_requests}`)
    .then((response) => {
      setRequests(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  } 

  const request_accept = (request)=>{
    axios.get(`${api.webadmin_requests.webadmin_request_accept}/${request.id}`)
      .then((response)=>{
        alert(response.data.message)
        get_requests()
      })
      .catch((err)=>{
        console.log(err)
      })
      
    }
  const request_deny = (request)=>{
    axios.get(`${api.webadmin_requests.webadmin_request_deny}/${request.id}`)
      .then((response)=>{
        alert(response.data.message)
        get_requests()
      })
      .catch((err)=>{
        console.log(err)
      })
      
    }
    
 


useEffect(()=>{
  get_requests();
},[])
  
  
  return (
    <div className="admin-main">
      <div>
        
        <div className="eventsdisplay">

          {requests !=""? <TableContainer component={Paper}>
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
          :
          <div>
          <h1> No New Requests</h1>
          </div>}
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

export default WebAdminRequests;