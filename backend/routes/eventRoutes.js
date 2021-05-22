const express = require('express')
const router = express.Router();
const eventController = require('../controllers/eventController')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// penser à remettre le auth
router.get('', eventController.getAllEvents);
router.delete('/:id', auth, eventController.deleteEvent);
router.post('', auth, multer, eventController.createEvent );

module.exports = router;