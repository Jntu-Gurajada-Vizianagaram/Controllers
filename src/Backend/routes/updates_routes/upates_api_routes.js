const express = require('express')
const cors = require('cors')
const router = express.Router();
const updates= require('../../apis/updates_api/UpdatesApi')

router.get('/get-events',updates.get_events);
router.post('/add-event',updates.insert_event)
router.delete('/remove-event',updates.delete_event)
// router.patch('/update-event',router.update_event)


module.exports=router