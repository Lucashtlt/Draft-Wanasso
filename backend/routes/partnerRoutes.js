const express = require('express')
const router = express.Router();
const partnerController = require('../controllers/partnerController')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.delete('/:id', auth, partnerController.deletePartner);
router.post('', auth, partnerController.createPartner );
router.get('', partnerController.getAllPartners);
router.get('/:id', partnerController.getOnePartner);


module.exports = router;