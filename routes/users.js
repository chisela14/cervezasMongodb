const express = require('express');
const router = express.Router();
const{getUsers, getUser, addUser, deleteUser, modifyUser}=require('../controllers/users.js');
const{check} = require('express-validator');
const{validateFields} = require("../helpers/validate-fields");
const {isValidRol, emailExists, userExists} = require('../helpers/db-validator');

router.get('/', getUsers);
router.get('/', getUser);
router.post('/', [
    check('Email', 'El email no es válido').isEmail(), 
    check('Email').custom(emailExists), 
    check('Contraseña', 'El password debe de ser más de 6 letras').isLength({ min: 6, max: 12 }),
    check('Nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('Rol').custom(isValidRol),
    validateFields
    ],addUser);
router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(userExists),
    validateFields
], deleteUser);
//TO DO
router.put('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    validateFields
], modifyUser)

module.exports = router;