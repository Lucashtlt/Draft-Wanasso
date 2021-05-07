const express = require('express')
const router = express.Router();
const eventController = require('../controllers/eventController')
const auth = require('../middleware/auth');

router.get('', eventController.getAllEvents);
router.delete('/:id', auth, eventController.deleteEvent);
router.post('', auth, eventController.createEvent );

module.exports = router;