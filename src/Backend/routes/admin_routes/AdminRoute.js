const express = require("express")
const router = express.Router()
const adminauth= require('../../apis/admin_api/admin_auth')

router.get('/getadmins',adminauth.alladmins)
router.post('/login',adminauth.login)


module.exports=router