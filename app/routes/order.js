const express = require('express');
const router = express.Router();
const { createOrder, getOrder, deleteOrderById, updateOrder } = require('../controllers/order');

router.get('/:id', getOrder);
router.post('/', createOrder);
router.delete('/:id', deleteOrderById);
router.put('/:id', updateOrder);

module.exports = router;
