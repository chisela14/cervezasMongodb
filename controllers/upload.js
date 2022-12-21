const {request, response} = require('express')
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({msg:'No files were uploaded.'});
    }

    // The name of the input field (i.e. "file") is used to retrieve the uploaded file
    const {file} = req.files;
    extension = path.extname(file.name)//devuelve extensión con punto
    //splitName = file.name.split('.')
    //extension = splitName[splitName - 1] //extensión sin punto
    //extension = file.name.split('.').pop() //sin punto en una línea

    const fileName = uuidv4()+extension;

    uploadPath = path.join(__dirname,'../uploads', fileName);

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, function(err) {
        if (err)
        return res.status(500).json({err});

        res.json({msg:`File uploaded with extension ${extension} to ${uploadPath}`});
    });
}

module.exports = {uploadFile}