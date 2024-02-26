import React from 'react'

import mods from './Logins/Login'


const Profile = () => {

    console.log(mods.uds)
    
  return (
    <div>
        <h3>{mods.uds.admin}'s Profile</h3>
        <div>
            <h1>{mods.uds.admin}</h1>
            <h1>{mods.uds.role}</h1>
        </div>
    </div>
  )
}

export default Profile