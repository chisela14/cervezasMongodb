const express = require('express')
const router = express.Router()
const{check} = require('express-validator');
const { uploadFile, updateImage, getImage } = require('../controllers/upload')
const { validateFields } = require("../helpers/validate-fields");
const { hasExtension } = require('../helpers/uploadFile');
const {isValidCollection} = require('../helpers/db-validator');

router.post("/", uploadFile)
// router.post("/",[
//     hasExtension(".jpg", ".png", ".jpeg"),
//     validateFields
// ], uploadFile)
router.put('/:collection/:id',[
    check("collection").isIn(["bares", "cervezas", "users"]),
    check("id").isMongoId(),
    validateFields
], updateImage)
router.get('/:collection/:id',[
    check("collection").isIn(["bares", "cervezas", "users"]),
    check("id").isMongoId(),
    validateFields
], getImage)

module.exports = router