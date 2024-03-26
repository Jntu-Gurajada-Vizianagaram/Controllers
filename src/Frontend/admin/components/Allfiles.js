import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const Allfiles = () => {
    const [allfiles, setAllfiles] = useState([]);
    
    const ips = require("../../api.json");
    const api_ip = ips.server_ip;
  
    const fetchFiles = async () => {
        try {
            const response = await axios.get(`${api_ip}/api/admins/allstoredfiles`);
            setAllfiles(response.data.files);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleDelete = async (filename) => {
        try {
            // Add your delete logic here
            console.log(`Deleting file with Name ${filename}`);
        } catch (error) {
            console.log(error);
        }
    }
    // const handleDownload = (fileLink) => {
    //     window.open(fileLink, '_blank'); // Open the file link in a new tab
    // }
    
    return (
        <div>
            <h2>All Files</h2>
            <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                    The Files which are deleted from here.. will be deleted Permanently.
            </Alert>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Filename</TableCell>
                            <TableCell>View File</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allfiles.map((file, index) => (
                            <TableRow key={index}>
                                <TableCell>{file.filename}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" href={file.filelink} target="_blank">
                                        View File
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    {/* <Button variant="contained" color="primary" onClick={() => handleDownload(file.filelink)}>
                                        Download
                                    </Button><br/> */}
                                    <Button variant="contained" color="error" onClick={() => handleDelete(file.filename)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Allfiles;
