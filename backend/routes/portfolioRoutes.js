const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', portfolioController.getPortfolio);
router.put('/', authenticateToken, portfolioController.updatePortfolio);

module.exports = router;
