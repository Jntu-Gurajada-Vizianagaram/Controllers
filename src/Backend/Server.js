const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

//Routes Import
const admins= require('./routes/admin_routes/AdminRoute')

//middle ware import
app.use(express.json())

//apis start
app.use('/api/admins',admins)




// server listener
app.listen(8888,()=>{
    console.log("Server ruinning at port no:8888")
})