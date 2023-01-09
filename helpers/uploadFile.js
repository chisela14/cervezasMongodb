const {request, response} = require("express");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const hasExtension = (...extensions) => {
    return (req=request, res=response, next)=>{

        const {file} = req.files;
        if(!extensions.includes(path.extname(file.name))){
            return res.status(401).json({
                msg: `${file.name} no tiene la extensión adecuada`
            })
        }

        next();
    }
}

const upload = ( files, validExtensions = ['png','jpg','jpeg','gif'], folder = '' ) => {

    return new Promise( (resolve, reject) => {

        const { file } = files;
        const splitName = file.name.split('.');
        const extension = splitName[ splitName.length - 1 ];

        // Validar la extension
        if ( !validExtensions.includes( extension ) ) {
            return reject(`La extensión ${ extension } no está permitida - ${ validExtensions }`);
        }
        
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', folder, tempName );

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( tempName );
        });

        // //recoger el archivo con su extension
        // // The name of the input field (i.e. "file") is used to retrieve the uploaded file
        // const {file} = req.files;
        // extension = path.extname(file.name)//devuelve extensión con punto
        // //splitName = file.name.split('.')
        // //extension = splitName[splitName - 1] //extensión sin punto
        // //extension = file.name.split('.').pop() //sin punto en una línea

        // //creamos el nombre único del archivo
        // const fileName = uuidv4()+extension;
        // //configuramos la ruta de subida
        // uploadPath = path.join(__dirname,'../uploads', fileName);

        // //movemos el archivo a la ruta congifurada
        // // Use the mv() method to place the file somewhere on your server
        // file.mv(uploadPath, function(err) {
        //     if (err)
        //     return res.status(500).json({err});

        //     res.json({msg:`File uploaded with extension ${extension} to ${uploadPath}`});
        // });

    });

}

module.exports = {hasExtension, upload};