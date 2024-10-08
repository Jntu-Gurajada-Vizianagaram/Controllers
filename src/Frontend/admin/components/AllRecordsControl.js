import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import api from '../../Main/apis_data/APIs'


const AllRecordsControls = () => {
  const [requests,setRequests] =useState([])
  const [loading,setLoading] =useState([])

  const get_update_events = async () =>{
    setLoading(true)
    axios
    .get(`${api.updates_apis.every_event}`)
    .then((response) => {
      setRequests(response.data);
      setLoading(false)
    })
    .catch((error) => {
      console.error(error);
    });
  } 

  // const accept =(request)=>{
  //    alert(request.title)
  //    axios.post(`$api.`)
  //  }
  const del_notification =(request)=>{
    axios.get(`${api.updates_apis.remove_event}/${request.id}`)
    .then((response)=>{
      alert(response.data.message)
      get_update_events()
    })
    .catch((error)=>{
      console.log(error)
    })
  }


useEffect(()=>{
  get_update_events();
},[])

  return (
    <div>
      <div className="all-requests">
        <h1> All Updates and Events will be Shown here</h1>
      </div>
      <div className="admin-main">
      <div>
        <a href="/">
         
          <br />
        </a>
        <div>
        <div className="eventsdisplay">
          {loading ?
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', fontSize: '2em' }}>
                <h1>Loading Events ...</h1>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
              </div> 
              :
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
                      <a href={request.file_link} target="_blank" rel="noreferrer">View File</a>
                    </TableCell>
                    <TableCell>
                      {/* <Button variant="contained" onClick={() => accept(request)}>
                        Accept
                      </Button> */}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained"  color="error" onClick={() => del_notification(request)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
        </div>
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
    </div>
  )
}

export default AllRecordsControls