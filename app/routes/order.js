const express = require('express');
const router = express.Router();
const { createOrder, getOrder, deleteOrderById } = require('../controllers/order-controller');

router.get('/:id', getOrder);
router.post('/', createOrder);
router.delete('/:id', deleteOrderById);

module.exports = router;
