const express = require('express')
const router = express.Router()
const {getBeers, getBeer, addBeer, deleteBeer, editBeer} = require('../controllers/cervezas')
const{check} = require('express-validator');
const{validateFields} = require("../helpers/validate-fields");
const {} = require('../helpers/db-validator');

router.get('/', getBeers)
router.get('/:id', getBeer)
router.post('/',[
    check('Precio').toFloat
], addBeer)
router.delete('/:id', deleteBeer)
router.put('/:id', editBeer)

module.exports = router