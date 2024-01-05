const express = require('express')
const router = express.Router();
const updates= require('../../apis/dmc_api/DMCApi')




//------APIS for admin console-------//

router.get('/allevents',updates.all_events); 
router.post('/addevent',updates.Upload,updates.insert_event)
router.get('/removeevent/:id',updates.delete_event);
// router.patch('/update-event',router.update_event)

// ----- Apis for Frontend----------//




module.exports=router