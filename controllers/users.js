const { response, request } = require('express');
const User = require('../models/user');

async function getUsers(req, res) {
    const {Nombre, Apellidos, Username, Email, Contraseña} = req.query
    const query = {Nombre, Apellidos, Username, Email, Contraseña}
    for (const key in query) {
        if (query[key] === undefined) {
          delete query[key];
        }
      }
    const users = await User.find(query)
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
    const { Nombre, Apellidos, Username, Email, Contraseña} = req.body;
    const user = new Users({ Nombre, Apellidos, Username, Email, Contraseña});
    await user.save();
    res.json({user});
}

async function deleteUser(req, res){
    const userId = req.params.id;
    const removed = await User.findByIdAndDelete(userId);
    res.json(removed);
}

async function modifyUser(req = request, res = response) {
    const userId = req.params.id;
    const user = req.body;
    const updatedUser =  await User.findByIdAndUpdate(userId, user);
    res.json(updatedUser);
}

module.exports = { getUsers, getUser, addUser, deleteUser, modifyUser, }