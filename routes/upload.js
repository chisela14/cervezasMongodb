const express = require('express')
const router = express.Router()
const { uploadFile } = require('../controllers/upload')

router.post("/", uploadFile)

module.exports = router