import React, { useEffect, useState } from "react";
import '../../css/affliatedColleges_css/AffliatedColleges.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const ips =require('../../api.json')
const api_ip = ips.server_ip

const Affliated_colleges = () => {
    const [collegeData, setCollegeData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function fetchCollegeData() {
            try {
                const response = await fetch(`http://${api_ip}:8888/api/affliated-colleges/all-colleges`);
                const data = await response.json();
                setCollegeData(data);
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching college data:', error);
            }
        }

        fetchCollegeData();
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filteredResults = collegeData.filter(college => {
            return college.college_name.toLowerCase().includes(value) || college.college_address.toLowerCase().includes(value);
        });
        setSearchResults(filteredResults);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="main_div">
            <Paper
                component="form"
                sx={{ p: '15px 4px', display: 'flex',justifyContent:'center', alignItems: 'center', width: '1000px' }}
                style={{ margin: 15 }}
                onSubmit={handleSearchSubmit}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="search by college_name/college_address"
                   className="searchbar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SI NO</TableCell>
                            <TableCell>LOGO</TableCell>
                            <TableCell>COLLEGE NAME</TableCell>
                            <TableCell>COLLEGE ADDRESS</TableCell>
                            <TableCell>VISIT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((college, index) => (
                            <TableRow
                                key={college.id || index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    <img src={college.logo} width="70" height="70" alt="Logo" />
                                </TableCell>
                                <TableCell>{college.college_name}</TableCell>
                                <TableCell>{college.college_address}</TableCell>
                                <TableCell>
                                <Button type="button" variant="contained" ><a style={{color:'white',textDecoration:'none'}} href={college.college_link}>VISIT</a>
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

export default Affliated_colleges;