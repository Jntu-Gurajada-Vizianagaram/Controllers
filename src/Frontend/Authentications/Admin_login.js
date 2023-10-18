import React, { useEffect, useState } from "react";
import Admin from "../components/admin/Admin";
import "../css/admin_css/Admin_login.css";
import { MdLogin } from "react-icons/md";
import { RiAdminFill, RiLockPasswordFill } from "react-icons/ri";
import { GiCharacter } from "react-icons/gi";
import library from "../media/jntu library.jpg";
import axios from "axios";

const Admin_login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(false);
  const [role, setRole] = useState("");
  const [alladmins, setAlladmins] = useState([]);
  const [error, setError] = useState("");
  const roles={
    options:[
    {
      role:"",
      disp:"Select Role"
    },
    {
      role:"admin",
      disp:"Admin"
    },
    {
      role:"hod_civil",
      disp:"Civil HOD"
    },
    {
      role:"hod_cse",
      disp:"CSE HOD"
    },
    {
      role:"hod_ece",
      disp:"ECE HOD"
    },
    {
      role:"hod_eee",
      disp:"EEE HOD"
    },
    {
      role:"hod_it",
      disp:"IT HOD"
    },
    {
      role:"hod_mech",
      disp:"MECH HOD"
    },
    {
      role:"hod_met",
      disp:"MET HOD"
    },
    {
      role:"controller",
      disp:"Controller"
    },
    {
      role:"developer",
      disp:"Developer"
    },
    {
      role:"d",
      disp:"d"
    }
  ],
   data:"roles"
}
const handleSubmit = (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  // You can access the selectedRole state here and use it as needed
  console.log("Selected Role:", role);
};
const handleRoleChange = (event) => {
  setRole(event.target.value);
};
  const login_handle = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8888/api/admins/login",
        { credentials:{username, password, role} },
      );
      if (response.data.success) {
        alert("Ok Logged In");
        window.location.href = "http://localhost:3000/admin-control";
        console.log(response.data);
        // setSession(true)
      } else {
        console.log("Invalid Credentials");
        console.log(response.data);
        alert("Invalid Credentials");
        // setSession(true)
      }
    } catch (error) {
      alert("Invalid Credentials");
      console.log(error);
    }
  };

  const admins = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/admins/getadmins");
      if (response != "") {
        setAlladmins(response.data);
        // console.log(response.data)
      } else {
        setError("Datat Not Fetched");
      }
    } catch (error) {
      console.log(error + "Smthing wrong");
      setError(error);
    }
  };

  useEffect(() => {
    admins();
  }, []);

  return (
    <div className="admin-login-main">
      {session ? (
        <div>
          <Admin />
          <h3>All Admins:</h3>
          {error ? (
            <div>Not Data fetched</div>
          ) : (
            alladmins.map((admin) => (
              <div>
                <p>
                  {admin.name}
                  ----
                  {admin.role}
                </p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="admin-login-form">
          <div className="login-form">
            <h2>Admin Login</h2>
            <div className="form-group">
              <label htmlFor="admin-username">
                <RiAdminFill />
                Admin Username:
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
                Admin Password:
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
              <select  id="role" value={role} onChange={handleRoleChange}>
                {roles.options.map((option, index) => (
                  <option key={index} value={option.role}>
                    {option.disp}
                  </option>
                ))}
              </select>
              {/* <input
                type="text"
                id="admin-role"
                placeholder="Enter your role"
                onChange={(e) => setRole(e.target.value)}
              /> */}
            </div>
            <button className="btn-admin-login" onClick={login_handle}>
              LOGIN <MdLogin />
            </button>
            <a href="/passwordreset" className="forgot-password">
              Forgot Password...?
            </a>
          </div>

          <div className="library-image">
            <img src={library} height={400} width={900} className="library-image"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_login;
