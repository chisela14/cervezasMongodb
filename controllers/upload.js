const {request, response} = require('express')
const { upload } = require('../helpers/uploadFile');
const Bar = require('../models/bar');
const User = require('../models/user');
const Cerveza = require('../models/cerveza');

const uploadFile = async(req = request, res = response) => {

    //comprobar que se ha subido un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    try {
        
        // txt, md
        // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
        const nombre = await upload( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }
    
}

const updateImage = async(req = request, res = response) => {
     //comprobar que se ha subido un archivo
     if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    try {
        const collection = req.params.collection;
        const id = req.params.id
        const img = await upload( req.files, undefined, collection);

        let updatedEl;
        switch(collection) {
            case("bares"):
                updatedEl = await Bar.findByIdAndUpdate(id, {img: `${img}`});
                break;
            case("users"):
                updatedEl = await User.findByIdAndUpdate(id, {img: img});
                break;
            case("cervezas"):
                updatedEl = await Cerveza.findByIdAndUpdate(id, img);
                break;
        }
        res.json({updatedEl});

    } catch (msg) {
        res.status(400).json({ msg });
    }
}

module.exports = {uploadFile, updateImage}