const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const app = express()

// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()

//MIDDLEWARE
app.use(express.json())
app.use(fileUpload())
//ROUTES
const cervezas = require('./routes/cervezas')
app.use('/cervezas', cervezas)

const users = require('./routes/users')
app.use('/users', users)

const login = require('./routes/login')
app.use('/auth/login', login)

const upload = require('./routes/upload')
app.use('/upload', upload)

app.listen(process.env.PORT)