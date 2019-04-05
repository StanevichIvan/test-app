const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, deleteUserById, getUserOrders, updateUser, getUserOrdersById } = require('../controllers/user');

router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);
router.get('/:id/orders', getUserOrders);
router.get('/:id/orders/:orderId', getUserOrdersById);

module.exports = router;
