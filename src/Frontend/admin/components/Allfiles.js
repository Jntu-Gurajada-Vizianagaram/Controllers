import axios, { all } from 'axios'
import React, { useState,useEffect } from 'react'





const Allfiles = () => {
const [allfiles,setAllfiles] =useState([])
    
  const ips = require("../../api.json");
  const api_ip = ips.server_ip;
  
const files = async () =>{
    try {
        await axios.get(`${api_ip}/api/admins/allstoredfiles`)
        .then((response)=>{
            console.log(response.data.data)
            setAllfiles(response.data.files)
        }).catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }   

useEffect(()=>{
    files()
},[])
files()
console.log(allfiles)
}
  return (
    <div>
    Allfiles
    <div>
        {allfiles.map((file,index)=>(
                <div key={index}>
                    <h1>{file.filename}</h1>
                    <h1>{file.filelink}</h1>
                </div>
            ))}
    </div>
    </div>
  )
}

export default Allfiles