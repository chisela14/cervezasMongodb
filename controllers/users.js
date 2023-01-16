const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

async function getUsers(req = request, res = response) {
    const {name, surname, username, email, password, role, limit=5, skip=0} = req.query
    const query = {name, surname, username, email, password, role, limit, skip}
    for (const key in query) {
        if (query[key] === undefined) {
          delete query[key];
        }
      }
    const users = await User.find(query).limit(limit).skip(skip);
    res.json(users)
}

async function getUser(req =request, res = response) {
    const id = req.params.id
    const user = await User.findById(id);
    if (user !=null) {
        res.json(user);
    } else {
        res.json({ message: `El usuario con id ${id} no existe` })
    }
}

async function addUser(req = request, res = response) {
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors);
    // }
    const { name, surname, username, email, password, role} = req.body;
    const user = new User({ name, surname, username, email, password, role});
    //encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    await user.save();
    res.json({user});
}

async function deleteUser(req = request, res = response) {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id); //findByIdAndUpdate(id, {"Status": false})
    //const uid = req.uid;
    const authUser = req.user;
    res.json({user, authUser});
}

async function modifyUser(req = request, res = response) {
    const {id} = req.params;
    //no se va a permitir que se modifique el email
    const {_id, email, Status, ...userBody} = req.body; //... operador splice, permite que con el resto que quede se crea una variable(userBody)

    const salt = bcryptjs.genSaltSync();
    userBody.password = bcryptjs.hashSync( userBody.password, salt );
    const updatedUser =  await User.findByIdAndUpdate(id, userBody);

    res.json(updatedUser);
   
}

module.exports = { getUsers, getUser, addUser, deleteUser, modifyUser}