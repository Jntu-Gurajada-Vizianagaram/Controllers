const express = require('express')
const router = express.Router();
const updates= require('../../apis/updates_api/UpdatesApi')

router.get('/getevents',updates.get_events);
router.post('/addevent',updates.Upload,updates.insert_event)
router.delete('/removeevent',updates.delete_event)
// router.patch('/update-event',router.update_event)


module.exports=router