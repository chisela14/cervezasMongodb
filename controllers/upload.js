const {request, response} = require('express')
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (req = request, res = response) => {

    // if (!req.files) {
    //     res.send({
    //         status: false,
    //         message: 'No file uploaded'
    //     });
    // }else{
    //     // Recoger el archivo con el nombre del input (se le dará el nombre de "ejemplo")
    //     let file = req.files.ejemplo;
        
    //     // Mover el archivo al directorio indicado
    //     file.mv('./files/' + ejemplo.name);

    //     //Enviar respuesta
    //     res.send({
    //         status: true,
    //         message: 'File is uploaded',
    //         data: {
    //             name: ejemplo.name,
    //             size: ejemplo.size
    //         }
    //     });
    // }
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({msg:'No files were uploaded.'});
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    extension = path.extname(sampleFile.name)//devuelve extensión con punto
    //splitName
    uuidv4();

    uploadPath = path.join(__dirname,'../uploads', sampleFile.name);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
        if (err)
        return res.status(500).json({err});

        res.json({msg:'File uploaded!'});
    });
}

module.exports = {uploadFile}