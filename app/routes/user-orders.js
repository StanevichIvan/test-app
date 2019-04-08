const express = require('express');
const router = express.Router();
const { getUserOrders, getUserOrdersById } = require('../controllers/user');

router.get('/:id/orders', getUserOrders);
router.get('/:id/orders/:orderId', getUserOrdersById);

module.exports = router;
