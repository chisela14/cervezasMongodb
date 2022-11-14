const express = require('express');
const router = express.Router();
const{getUsers, getUser, addUser, deleteUser, modifyUser}=require('../controllers/users.js');
const{check} = require('express-validator');
const{validateFields} = require("../helpers/validate-fields");
const {isValidRol, isEmail} = require('../helpers/db-validators')

router.get('/', getUsers);
router.get('/', getUser);
router.post('/', [
    check('Email', 'El email no es válido').isEmail(), 
    check('Email').custom(isEmail), 
    check('Contraseña', 'El password debe de ser más de 6 letras').isLength({ min: 6, max: 12 }),
    check('Nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('Rol').custom( isValidRol),
    validateFields
    ],addUser);
router.delete('/:id', deleteUser);
router.put('/:id', modifyUser)

module.exports = router;