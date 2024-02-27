import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Results = () => {
    const ips =require('../../api.json')
    const api_ip = ips.server_ip
    const [filenames,setFilenames] = useState([]);
    // const [filepath,setFilepath] = useState([]);

    const getfile = async() =>{

        try{
            const response = await axios.get(`${api_ip}:8888/api/results/R13PASSLIST`);
            setFilenames(response.data.files);
        }catch(error){
            console.log(error);
        }
    }
    // const path = './new folder/'
useEffect(()=>{
    getfile()
},[])

  return (
    <div>
        <h1>Results</h1>
        {
            filenames.map((file,index)=>(
                <div>
                    <a href={`http://${api_ip}:3000/../Storage/Results/BTECH3-2/R13PASSLIST/${file}`} download={file}><h4 key={index}>{file}</h4></a>
                </div>
            ))
        }
    </div>
  )
}

export default Results