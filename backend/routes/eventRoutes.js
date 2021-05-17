const express = require('express')
const router = express.Router();
const eventController = require('../controllers/eventController')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// penser à remettre le auth
router.get('', eventController.getAllEvents);
router.delete('/:id', eventController.deleteEvent);
router.post('', multer, eventController.createEvent );

module.exports = router;