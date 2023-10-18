const express =require('express')
const router = express.Router()
const mailing = require('../../apis/grievance_api/SendMail')


router.post('/sendmail',mailing.send)
router.get('/recieve',mailing.receive)

module.exports=router