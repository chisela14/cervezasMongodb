const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const app = express()

// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()

//MIDDLEWARE
app.use(express.json())

//ROUTES
const cervezas = require('./routes/cervezas')
app.use('/cervezas', cervezas)

const users = require('./routes/users')
app.use('/users', users)

const login = require('./routes/login')
app.use('/auth/login', login)

app.listen(process.env.PORT)