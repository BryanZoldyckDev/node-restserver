const path = require('path');
const {v4: uuidv4} = require('uuid');

const uploadFile = (files, directory = '', validExtensions = ['png', 'jpg', 'jpeg', 'gif']) => {
    return new Promise((resolve, reject) => {
        //Validar nombre del archivo
        const { file } = files;

        const cutName = file.name.split('.');
        const extension = cutName[cutName.length -1];
        
        //validar la extensión

        if(!validExtensions.includes(extension)){
            return reject(`File extension ${extension} is not valid. Valid extensions are: ${validExtensions}.`);
        };

        const tempName = uuidv4() + '.' + extension;
    
        const uploadPath = path.join(__dirname, '../uploads/', directory ,tempName);
    
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(tempName);
        });
    });

    
}

module.exports = {
    uploadFile,
}