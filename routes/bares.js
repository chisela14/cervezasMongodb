const express = require('express');
const router = express.Router();

const{getBares, getBar, addBar, deleteBar, modifyBar}=require('../controllers/bares.js');

router.get('/', getBares);
router.get('/', getBar);
router.post('/', addBar);
router.delete('/:id', deleteBar);
router.put('/:id', modifyBar)

module.exports = router;