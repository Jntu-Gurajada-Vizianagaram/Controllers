import axios, { all } from 'axios'
import React, { useState,useEffect } from 'react'





const Allfiles = () => {
const [allfiles,setAllfiles] =useState([])
    
  const ips = require("../../api.json");
  const api_ip = ips.server_ip;
  
const Files = async () =>{
    try {
        console.log("ALL STORED FILES")
        await axios.get(`${api_ip}/api/admins/allstoredfiles`)
        .then((response)=>{
            console.log(allfiles,"All Stored Files")
            console.log(response.data)
            setAllfiles(response.data.files)
        }).catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }   

}
useEffect(()=>{
    Files()
},[])
  return (
    <div>
    Allfiles
    <div>
        {allfiles.map((file,index)=>(
                <div key={index}>
                    <h3>{file.filename}</h3>
                    <a href={file.filelink}>OPEN
                    <h4>{file.filename}</h4></a>
                </div>
            ))}
    </div>
    </div>
  )
}

export default Allfiles