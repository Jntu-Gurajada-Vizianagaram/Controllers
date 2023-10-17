const express = require("express")
const router = express.Router()
const adminauth= require('../../apis/admin_api/admin_auth')
const hods= require('../../apis/admin_api/Add_hods')

router.get('/getadmins',adminauth.alladmins)
router.post('/login',adminauth.login)
router.post('/add-hod',hods.addhods)

module.exports=router