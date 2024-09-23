import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../../Main/apis_data/APIs';
import "../../css/Admin.css";


const EventPhotosRequests = () => {
  const [requests,setRequests] =useState([])
  
  
  const get_requests = async () =>{
    axios
    .get(`${api.webadmin_requests.webadmin_event_requests}`)
    .then((response) => {
      setRequests(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Error in getting requests")
    });
  } 

  const request_accept = (request) => {
   const response = axios.get(`${api.webadmin_requests.webadmin_event_accept}/${request.id}`)
      .then((response) => {
        console.log(response);
        alert("Request Accepted");
        alert(response.data.message);
        get_requests();
      })
      .catch((err) => {
        console.error(err);
        alert("Error in accepting request");
      });
  }
  const request_deny = (request)=>{
    const response = axios.get(`${api.webadmin_requests.webadmin_event_deny}/${request.id}`)
      .then((response)=>{
        alert('Request Denied')
        alert(response.data.message)
        get_requests()
      })
      .catch((err)=>{
        console.log(err)
        alert("Error in denying request")
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
                  <TableCell>Thumbnail</TableCell>
                  <TableCell>Update Added By</TableCell>
                  <TableCell>Photos Count</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.uploaded_date}</TableCell>
                    <TableCell>{request.event_name}</TableCell>
                    <TableCell>
                      <img src={request.event_photos[0]} alt={request.event_name + "Thumbnail"} height={70} width={50}/>
                    </TableCell>
                    <TableCell>{request.added_by}</TableCell>
                    <TableCell>
                      {request.event_photos.length}
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

export default EventPhotosRequests;