//router y express
const express = require('express');
const router = express.Router();
//controlador
const{getUser}=require('../controllers/users.js');
//comprobaciones generales
const{check} = require('express-validator');
const{validateFields} = require("../helpers/validate-fields");
//comprobaciones personalizadas en el controlador
const { checkLogin } = require('../controllers/login.js');

router.post('/', [
    check('Email', 'El email no es válido').isEmail(),
    check('Contraseña', 'La contraseña no puede quedar vacía').not().isEmpty(),
    validateFields
], checkLogin)

module.exports = router;