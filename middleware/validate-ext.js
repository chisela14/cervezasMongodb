const {request, response} = require("express");
const path = require('path');

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

module.exports = {hasExtension};