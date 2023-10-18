import axios from 'axios';
import React, { useState } from 'react'

const FacultyGrievance = () => {
  const [rollno,setRollno]=useState("");
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [phno,setPhno]=useState("");
  const [adhaarno,setAdaarno]=useState("");
  const [collegename,setCollegeName]=useState("");
  const [category,setCategory]=useState("");
  const [msg,setMsg]=useState("");
  const sendmail= async ()=>{
    alert("Sending Mail...")
    const response = await axios.post("https://controllerz.vercel.app/api/mailing/sendmail",{
      rollno,email,name,phno,adhaarno,collegename,category,msg
    })
    if(response.data.success===true){
      alert("Grievance Mail Sent")
    }
    else{
      alert("no response")
    }
  }
  return (
    <div className='faculty--main'>
       <div className='grievance-form'>
        {/* Faculty & Student Grievances */}
        <br/>
        <form>
        <h3>Student Grievance Form</h3>
        <input type='text' placeholder='Student Rollno' className='inp-roll' value={rollno} onChange={(e)=> setRollno(e.target.value)} required={true}/>
        <input type='text' placeholder='Student Email' className='inp-email' value={email} onChange={(e)=> setEmail(e.target.value)} required={true}/>
        <input type='text' placeholder='Full Name' className='inp-name' value={name} onChange={(e)=> setName(e.target.value)} required={true}/>
        <input type='text' placeholder='Phone Number' className='inp-phno' value={phno} onChange={(e)=> setPhno(e.target.value)} required={true}/>
        <input type='text' placeholder='Adhaar Number' className='inp-adno' value={adhaarno} onChange={(e)=> setAdaarno(e.target.value)} required={true}/>
        <input type='text' placeholder='College Name' className='inp-college' value={collegename} onChange={(e)=> setCollegeName(e.target.value)} required={true}/>
        <input type='text' placeholder='Griviance Category' className='inp-category' value={category} onChange={(e)=> setCategory(e.target.value)} required={true}/>
        <input type='text' placeholder='Detailed Description of Grievance/Problem' className='inp-grievance' value={msg} onChange={(e)=> setMsg(e.target.value)} required={true}/>
        <button onClick={sendmail} type='submit'>Send</button>
        </form>
       </div>
    </div>
  )
}

export default FacultyGrievance