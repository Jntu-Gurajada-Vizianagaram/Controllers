import React,{useState,useEffect  } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { MdLogin } from "react-icons/md";
import { RiAdminFill, RiLockPasswordFill } from "react-icons/ri";
import { GiCharacter } from "react-icons/gi";
import { Card } from '@mui/material';
const AdminsCRUDControl = () => {

  const [alladmins, setAlladmins] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const ips =require('../../api.json')
  const api_ip = ips.server_ip


  const admins = async () => {
    try {
      const response = await axios.get(`${api_ip}/api/admins/getadmins`);
      if (response !== "") {
        setAlladmins(response.data);
        // console.log(response.data)
      } else {
        console.log("Datat Not Fetched");
      }
    } catch (error) {
      console.log(error + "Smthing wrong");
    }
  };


  const adding_handle = async()=>{
    try {
      const id =0;
      const response = await axios.post(`${api_ip}/api/admins/add-hod`,
      {data:{id,name,username,password,role}}
      )
      // alert("Adding Hod Credentials")
      if(response.data.Success){
        alert("Hod Data Successfully added")
      }
      else{
        alert("Hod Data Not added \n Reason:"+response.data.MSG)
      }
      admins()
    } catch (error) {
      alert("Exception"+error)
      console.log(error)
    }
  }
const remove_hod = async (admin) => {
  try {
        // if(confirm("Are you Sure! you want Remove Admin")==true){
        alert("Removing Admin" + admin.id);
        const response = await axios.get(`${api_ip}/api/admins/remove-hod/${admin.id}`)
        if(response.data.Success){
          alert("Admin Removed Successfully")
        }
        else{
          console.log("Sm Thing error" + response.data.msg)
        }
        admins()
        // window.location.href='/admin'
      }
      // else{
        // alert("Admin Removing Aborted")
      // }
    // } 
    catch (error) {
      console.log(error)
    }
    
}

  useEffect(() => {
    // get_role()
    admins();
  }, []);


  return (
    <div>
      
      <div>
        <div className="admin-crud-consoles">
            <div className="hods-crud-console">
              <div>
                <form>
                  <div className="admin-login-form">
                    <div className="login-form">
                      <h2>ADD Institutional Heads</h2>
                      <div className="form-group">
                        <label htmlFor="admin-name">
                          <RiAdminFill />
                          Add HOD Name:
                        </label>
                        <input
                          type="text"
                          id="admin-name"
                          placeholder="Enter HOD Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="admin-username">
                          <RiAdminFill />
                          Add HOD Username:
                        </label>
                        <input
                          type="text"
                          id="admin-username"
                          placeholder="Enter your username"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="admin-password">
                          <RiLockPasswordFill />
                          Generate HOD Password:
                        </label>
                        <input
                          type="password"
                          id="admin-password"
                          placeholder="Enter your password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="admin-role">
                          <GiCharacter />
                          Role:
                        </label>
                        <input
                          type="text"
                          id="admin-role"
                          placeholder="Enter your role"
                          onChange={(e) => setRole(e.target.value)}
                        />
                      </div>
                      <button className="btn-admin-login" onClick={adding_handle}>
                        ADD HOD <MdLogin />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
        </div>
        <div>
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
          {alladmins.map((admin) => (
            <TableRow
              key={admin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {admin.name}
              </TableCell>
              <TableCell align="left">{admin.username}</TableCell>
              <TableCell align="left">{admin.role}</TableCell>
              <TableCell align="center">
              <Button variant="contained" color="success">
                Edit
              </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color="error" onClick={()=>{remove_hod(admin)}} startIcon={<DeleteIcon />}>
                 Delete {admin.id}
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
      </div>
      </div>
    </div>
  )
}

export default AdminsCRUDControl

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