const { response, request } = require('express');
const Bar = require('../models/bar');

async function getBares(req, res) {
    const {name, address} = req.query
    const query = {name, address}
    for (const key in query) {
        if (query[key] === undefined) {
          delete query[key];
        }
      }
    const bares = await Bar.find(query)
    res.json(bares)
}

async function getBar(req = request, res = response) {
    const id = req.params.id
    const bar = await Bar.findById(id);
    if (bar !=null) {
        res.json(bar);
    } else {
        res.json({ message: `El bar con id ${id} no existe` })
    }
}

async function addBar(req = request, res = response) {
    const {name, address} = req.body;
    const bar = new Bar({ name, address});
    await bar.save();
    res.json({bar});
}

async function deleteBar(req, res){
    const barId = req.params.id;
    const removed = await Bar.findByIdAndDelete(barId);
    res.json(removed);    
}

async function modifyBar(req = request, res = response) {
    const barId = req.params.id;
    const bar = req.body;
    const updatedBar =  await Bar.findByIdAndUpdate(barId, bar);
    res.json(updatedBar);
}

module.exports = { getBares, getBar, addBar, deleteBar, modifyBar }