const {request, response} = require('express')
const { upload } = require('../helpers/uploadFile');
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
        const collection = req.params.collection;
        const id = req.params.id
        const img = await upload( req.files, undefined, collection);

        let updatedEl;
        switch(collection) {
            case("bares"):
                const bar = await Bar.findById(id);
                checkFile(collection, bar);
                bar.img = img;
                updatedEl = bar;
                // updatedEl = await Bar.findByIdAndUpdate(id, {img});
                break;
            case("users"):
                const user = await User.findById(id);
                checkFile(collection, user);
                user.img = img;
                await user.save();
                updatedEl = user;
                
                // updatedEl = await User.findByIdAndUpdate(id, {img});//funciona esta sintaxis
                break;
            case("cervezas"):
                const cerveza = await Cerveza.findById(id);
                checkFile(collection, cerveza);
                cerveza.img = img;
                updatedEl = cerveza;
                // updatedEl = await Cerveza.findByIdAndUpdate({_id: id}, {img: String(img)});//funciona esta sintaxis
                break;
        }
        res.json({updatedEl});

    } catch (msg) {
        res.status(400).json({ msg });
    }
}

//comprobar si existe un archivo con el nombre del img en bar
const checkFile = (collection, model)=>{
    if(fs.existsSync(__dirname, '../uploads/', collection, '/', model.img)){
        fs.unlinkSync(__dirname, '../uploads/', collection, '/', model.img);
    }
}

module.exports = {uploadFile, updateImage}