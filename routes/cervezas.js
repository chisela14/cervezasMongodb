const express = require('express')
const router = express.Router()
const {getBeers, getBeer, addBeer, deleteBeer, editBeer} = require('../controllers/cervezas')
const{check} = require('express-validator');
const{validateFields} = require("../helpers/validate-fields");
const {priceRange, beerExists} = require('../helpers/db-validator');

router.get('/', getBeers)
router.get('/:id', getBeer)
router.post('/',[
    check('Precio', 'El precio no es válido').isFloat(),
    check('Precio').custom(priceRange),
    validateFields
], addBeer) //validateFields es necesario siempre que hagamos check
router.delete('/:id', [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(beerExists),
    validateFields
], deleteBeer)
router.put('/:id', editBeer)

module.exports = router