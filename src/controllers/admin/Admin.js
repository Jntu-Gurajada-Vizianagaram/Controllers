import React from 'react'
import '../../components/css/admin_css/Admin.css'


const Admin = () => {
  
  return (
    <div className='admin-main'>
      <div>
        <a
        href='/admin'
        >
        <button>Logout</button><br/>
        </a>
        All Requests
        <div>
          Update Requests
        </div>
        <div>
          DMC Requests
        </div>
        <div>
          News and Event Request
        </div>
        <div>
          Department Circular Requests
        </div>
      </div>
    <div>
      Admin_login
    </div>
  </div>
  )
}

export default Admin