import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/affliatedColleges_css/AffliatedColleges.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EDIT from "./EditCollege";

const ips =require('../../api.json')
const api_ip = ips.server_ip

const Affliated_colleges = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);

  useEffect(() => {
    async function fetchCollegeData() {
      try {
        const response = await fetch(`http://${api_ip}:8888/api/affliated-colleges/all-colleges`);
        const data = await response.json();
        setCollegeData(data);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    }

    fetchCollegeData();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredResults = collegeData.filter((college) => {
      return (
        college.college_name.toLowerCase().includes(value) ||
        college.college_address.toLowerCase().includes(value)
      );
    });
    setSearchResults(filteredResults);
  };

  const handleDeleteClick = async (id) => {
    try {
      const url = new URL(`http://${api_ip}:8888/delete/${id}`);
      const response = await fetch(url.toString(), {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedResults = searchResults.filter((college) => college.id !== id);
        setSearchResults(updatedResults);
      } else {
        if (response.status === 500) {
          throw new Error('Server error: Internal Server Error');
        } else if (response.status === 404) {
          throw new Error('Server error: Not Found');
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to delete. Server responded with: ${errorText}`);
        }
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };  
  
  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleEditClick = (college) => {
    setSelectedCollege(college);
  };

  return (
    <div className="main_div">
      <div>
        <Link to="/add-new-affliated-college">
          <Button variant="contained">Add College</Button>
        </Link>
      </div>
      {selectedCollege && (
        <EDIT
          id={selectedCollege.id}
          logo={selectedCollege.logo}
          college_name={selectedCollege.college_name}
          college_address={selectedCollege.college_address}
          college_link={selectedCollege.college_link}
        />
      )}
      <Paper
        component="form"
        sx={{ p: "2px 4px", alignItems: "center", width: 400 }}
        style={{ margin: 15 }}
        onSubmit={handleSearchSubmit}
      >
        <InputBase
          sx={{ ml: 2, flex: 1,mr:2 }}
          placeholder="search by college_name/college_address"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
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
              <TableCell>EDIT</TableCell>
              <TableCell>DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((college, index) => (
              <TableRow
                key={college.id || index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  <img src={college.logo} width="70" height="70" alt="Logo" />
                </TableCell>
                <TableCell>{college.college_name}</TableCell>
                <TableCell>{college.college_address}</TableCell>
                <TableCell>
                  <Button type="button" variant="contained">
                    <a
                      href={college.college_link}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      VISIT
                    </a>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => handleEditClick(college)}
                  >
                    EDIT
                  </Button>
                </TableCell>
                <TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => handleDeleteClick(college.id)} // Passing the college id
                  >
                  DELETE
                  </Button>
</TableCell>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Affliated_colleges;