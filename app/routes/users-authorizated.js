const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, deleteUserById, updateUser } = require('../controllers/user');

router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
