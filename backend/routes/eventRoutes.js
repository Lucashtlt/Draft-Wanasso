const express = require('express')
const router = express.Router();
const eventController = require('../controllers/eventController')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.delete('/:id', auth, eventController.deleteEvent);
router.post('', auth, eventController.createEvent );
router.get('', eventController.getAllEvents);
router.get('/:id', eventController.getOneEvent);



module.exports = router;