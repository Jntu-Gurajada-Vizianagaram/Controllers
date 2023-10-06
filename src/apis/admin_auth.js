const express = require('express')
const con=require('./config')
const cors = require('cors')
const app = express()
var alladmins =[]
app.use(cors())
app.use(express.json())

app.get('/check',(req,res)=>{
    const query ="SELECT * FROM admins;"
    try {
        con.query(query,(err,result)=>{
            if(err){
                console.log(err+"not fetched")
            }
            else{
                alladmins=(result)
                res.json(result)
                // res.end()
            }
        })
    } catch (error) {
        
    }
})

app.post('/admin-login-auth',(req,res)=>{
    try {
        const {username,password,role}=req.body;
        const user =alladmins.find((admin)=>admin.username===username && admin.password === password && admin.role === role);
        if(user){
            res.json({success:true ,msg:"login success"})
            res.redirect('http://localhost:3000/DMC')
        }
        else{
            res.status(401).json({success:false ,msg:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error)
    }

})

app.listen(8081,(req,res)=>{
    console.log("port 8081 for admin auth")
})