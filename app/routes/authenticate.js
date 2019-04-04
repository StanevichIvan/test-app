const express = require('express');
const { authenticate } = require('../controllers/authenticate-controller');
const router = express.Router();

router.post('/', authenticate);

module.exports = router;
