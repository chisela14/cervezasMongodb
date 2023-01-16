const {request, response} = require('express')
const { upload } = require('../helpers/uploadFile');
const path = require('path');
const fs = require('fs');
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
        const {collection, id} = req.params;
        let model;
        switch(collection) {
            case "bares":
                model = await Bar.findById(id);
                break;
            case "users":
                model = await User.findById(id);
                // updatedEl = await User.findByIdAndUpdate(id, {img});
                break;
            case "cervezas":
                model = await Cerveza.findById(id);
                break;
        }
        //comprobar si existe un archivo en el modelo
        if(model.img != ""){
            const oldPath = path.join(__dirname, '../uploads/', collection, '/', model.img);
            if(fs.existsSync(oldPath)){
                fs.unlinkSync(oldPath);
            }
        }
        const img = await upload( req.files, undefined, collection);
        model.img = img;
        await model.save();
        res.status(200).json({model});

    } catch (msg) {
        res.status(400).json({ msg });
    }
}


module.exports = {uploadFile, updateImage}