const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

//Routes Import
const admins= require('./routes/admin_routes/AdminRoute')
const mailing = require('./routes/grievance_routes/GrievanceRoutes')
const updates = require('./routes/updates_routes/upates_api_routes')
const affliatedColleges = require('./routes/affliated_colleges_routes/AffliatedCollegesRoutes')

//middle ware import
app.use(express.json())

//apis start
app.use('/api/admins',admins)
app.use('/api/mailing',mailing)
app.use('/api/updates',updates)
app.use('/api/affliated-colleges',affliatedColleges)
// app.use('/api/addhod',) 



// server listener
app.listen(8888,()=>{
    console.log("Server ruinning at port no:8888")
})