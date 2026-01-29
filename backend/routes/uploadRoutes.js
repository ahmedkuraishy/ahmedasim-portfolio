const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../utils/multerConfig');

router.post('/', authenticateToken, upload.single('image'), uploadController.uploadImage);

module.exports = router;
