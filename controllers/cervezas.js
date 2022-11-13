const { response, request } = require('express');
const Cerveza = require('../models/cerveza');

async function getBeers(req, res) {
    const {Nombre, Descripción, Graduación, Envase, Precio} = req.query
    const query = {Nombre, Descripción, Graduación, Envase, Precio}
    for (const key in query) {
        if (query[key] === undefined) {
          delete query[key];
        }
      }
    const beers = await Cerveza.find(query)
    res.json(beers)
}

async function getBeer(req = request, res = response) {
    const id = req.params.id
    const beer = await Cerveza.findById(id);
    if (beer !=null) {
        res.json(beer);
    } else {
        res.json({ message: `La cerveza  con id ${id} no existe` })
    }
}

async function addBeer(req = request, res = response) {
    const { Nombre, Descripción, Graduación, Envase, Precio } = req.body;
    const beer = new Cerveza({ Nombre, Descripción, Graduación, Envase, Precio });
    await beer.save();
    res.json({beer});
}

async function deleteBeer(req = request, res = response) {
    const beerId = req.params.id;
    const removed = await Cerveza.findByIdAndDelete( beerId );
    res.json(removed);
}

async function editBeer(req = request, res = response) {
    const beerId = req.params.id;
    const beer = req.body;
    const updatedBeer = await Cerveza.findByIdAndUpdate( beerId, beer );
    res.json(updatedBeer);
}

module.exports = { getBeers, getBeer, addBeer, deleteBeer, editBeer }