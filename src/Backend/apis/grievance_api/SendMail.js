// const express = require('express')
// const cors = require('cors')
// const app = express();
// app.use(cors())
// app.use(express.json())
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'instadmc@jntugv.edu.in',
        pass:"lvqu tdwy fmfh jhcf "
    },
});

// const transporter = nodemailer.createTransport({
//     host:'smtp.ethereal.email',
//     port: 587,
//     auth:{
//         user:'kristina.smitham88@ethereal.email',
//         pass:"ZgJu1hdhPPMmKGXk9K"
//     },
// });

exports.send = (req,res)=>{
    try {
        
        const {rollno,email,name,phno,adhaarno,collegename,category,msg} = req.body;
        const body=`<!DOCTYPE html>
<html>
<head>
    <title>HTML Email Example</title>
</head>
<body>
    <h1>Hello, ${name} </h1>
    <p>Thank You For Contacting JNTUGV GRIEVIANCE PORTAL </p>
    <p>Inconvinience is Deeply </p>

    <ul>
        <div>Name:${name}</div>
        <div>Rollno:${rollno}</div>
        <div>Email:${email}</div>
        <div>Phone No:${phno}</div>
        <div>Adhaar No:${adhaarno}</div>
        <div>College Name:${collegename}</div>
        <div>Category:${category}</div>
        <div>Message:${msg}</div>
    </ul>
    <p>Please Go Through the Link for more information<a href="https://ucev.in">JNTU-GV</a> <a href="https://dsak.vercel.app">Dannana Sai Ajith Kumar</a></p>
</body>
</html>
`
        const mailoptions= {
            from:`${email}`,
            to:'dsak.official@gmail.com',
            subject:'Grievance',
            text:` `,
            html:`${body}`,
        }

        transporter.sendMail(mailoptions,(error,info)=>{
            if(error){
                console.log("Sending Error"+error)
                res.status(500).send('Email Sending Failed!')
            }
            else{
                console.log("SENT"+info.response)
                res.json({success:true,data:{name,email,msg}})
            }
        })

        
    } catch (error) {
        console.log(error)
    }
}

exports.receive = (req,res)=>{
    try {
        res.send("im recieving")
    } catch (error) {
        console.log(error)
    }
}