const express = require('express')
const router = express.Router()
const { uploadFile } = require('../controllers/upload')
const{validateFields} = require("../helpers/validate-fields");
const { hasExtension } = require('../middleware/validate-ext');

// router.post("/", uploadFile)
router.post("/",[
    hasExtension(".jpg", ".png", ".jpeg"),
    validateFields
], uploadFile)

module.exports = router