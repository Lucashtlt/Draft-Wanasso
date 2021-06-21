const express = require('express')
const router = express.Router();
const fileController = require('../controllers/fileController')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.delete('/:id', auth, fileController.deleteFile);
router.post('', auth, multer, fileController.createFile );
router.get('', fileController.getAllFiles);
router.get('/:id', fileController.getOneFile);



module.exports = router;