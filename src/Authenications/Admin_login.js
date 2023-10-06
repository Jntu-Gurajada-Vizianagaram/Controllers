import React, { useEffect, useState } from 'react'
import Admin from '../controllers/admin/Admin'
import '../components/css/admin_css/Admin_login.css'
import axios from 'axios';

const Admin_login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [session,setSession] = useState(false);
    const [role,setRole] = useState("")
    const [alladmins,setAlladmins] = useState([])
    const [error,setError] = useState("")
    const login_handle = async () =>{
        try {
            const response= await axios.post('http://localhost:8081/admin-login-auth',{ username, password, role })
            if(response.data.success){
                alert("Ok Logged In")
                // window.location.href='http://localhost:3000/admin-control'
                console.log(response.data)
                setSession(true)
            }
            else{
                console.log("Invalid Credentials")
                console.log(response.data)
                alert("Invalid Credentials")
                // setSession(true)
            }
        } catch (error) {
            alert("Invalid Credentials")
            console.log(error)
        }
    }
    
    const admins = async ()=>{
        try {
            const response = await axios.get('http://localhost:8081/check')
            if(response!=""){
                setAlladmins(response.data)
                // console.log(response.data)
            }
            else{
                setError("Datat Not Fetched")
            }
        } catch (error) {
            console.log(error+"Smthing wrong")
            setError(error)
        }
    }
    
    useEffect(()=>{
        admins()
        // login_handle()
    },[]);

  return (
    <div className='admin-login-main' >
        {
            session ? 
            <div>
                <Admin/>
                <h3>All Admins:</h3>
                    {error ? (<div>Not Data fetched</div>) :
                    (alladmins.map((admin)=>(
                        <div>
                            <p>
                                {admin.name}
                            ----
                                {admin.role}
                            </p>
                    </div>

                    ))
                    )
                    }
            </div>
            :
            <div className='admin-login-form'>
                <div className='login-form'>
                    <h2>Admin Login</h2>
                    <div className='form-group'>
                        <label htmlFor='admin-username'>Admin Username:</label>
                        <input
                            type='text'
                            id='admin-username'
                            placeholder='Enter your username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='admin-password'>Admin Password:</label>
                        <input
                            type='password'
                            id='admin-password'
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='admin-role'>Role:</label>
                        <input type='text' id='admin-role' placeholder='Enter your role' 
                        onChange={(e) => setRole(e.target.value)}/>
                    </div>
                    <button className='btn-admin-login' onClick={login_handle}>
                    LOGIN
                    </button>
                    <a href='/passwordreset' className='forgot-password'>
                    Forgot Password...?
                    </a>
                </div>

                <div className='credentials-display'>
                    
                </div>

            </div>

        }
    </div>
  )
}

export default Admin_login