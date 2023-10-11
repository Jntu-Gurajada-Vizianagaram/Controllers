const express = require("express")
const cors = require("cors")
const con =require('../config')
const app = express()
app.use(cors())
app.use(express.json())

app.post('/add-hod', async (req,res)=>{
    const {data} = req.body;
    console.log(data)
    sql="INSERT INTO admins(id,name,username,password,role) VALUES (?,?,?,?,?);"
    try {
        con.query(sql, [data.id, data.name, data.username, data.password, data.role], (err) => {
            if (err) {
                console.log("Data Inserted")
                res.json({Success:true})
                res.end()
            }
            else {
                console.log("Insertion Failed :" + err)
                res.status(401).json({Success:false,MSG:`Data not Inserted ${err}`})
            }
            res.end()
        })
    } catch (error) { 
        console.log(error)
    
    }
})
app.listen(8081,(req,res)=>{
    console.log("Port no 8081")
})