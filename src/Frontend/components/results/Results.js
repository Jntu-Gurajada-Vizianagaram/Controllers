import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Results = () => {
    // const ips =require('../../api.json')
    // const api_ip = ips.server_ip
    const [filenames,setFilenames] = useState([]);
    // const [filepath,setFilepath] = useState([]);

    const getfile = async() =>{

        try{
            const response = await axios.get('http://localhost:8888/api/results/r13-btech-3-2');
            setFilenames(response.data.files);
            console.log(response.data.files);
        }catch(error){
            console.log(error);
        }
    }
    const path = './new folder/'
useEffect(()=>{
    getfile()
},[])

  return (
    <div>
        
        {
            filenames.map((file,index)=>(
                <div>
                    <a href={`http://localhost:3001/../Storage/results/btech3-2/R13 PASS LIST/${file}`} download={file}><h4 key={index}>{file}</h4></a>
                </div>
            ))
        }
    </div>
  )
}

export default Results