const express = require('express');
const router = express.Router();

const{getUsers, getUser, addUser, deleteUser, modifyUser}=require('../controllers/users.js');

router.get('/', getUsers);
router.get('/', getUser);
router.post('/', addUser);
router.delete('/:id', deleteUser);
router.put('/:id', modifyUser)

module.exports = router;