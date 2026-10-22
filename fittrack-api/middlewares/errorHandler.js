const fs = require('fs');
const { error } = require('./apiResponse');

function removeUploadedFiles(req) {
    const uploadedFiles = [];

    if (req.file) {
        uploadedFiles.push(req.file);
    }
    if (req.files) {
        uploadedFiles.push(...Object.values(req.files).flat());
    }

    uploadedFiles.forEach((file) => {
        fs.unlink(file.path, (err) => {
            if (err) console.error('Erro ao limpar arquivo órfão:', err);
        });
    });
}


module.exports = (err, req, res, next) => {
    console.error(err);

    removeUploadedFiles(req);

    const statusCode = err.status || 500;
    const errors = err.errors || [];

    return error(res, err.message || 'Ocorreu um erro inesperado.', statusCode, errors);
};