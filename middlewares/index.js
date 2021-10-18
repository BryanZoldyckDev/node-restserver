const validateFields = require('../middlewares/validar-campos');
const validateJWT = require('../middlewares/validar-jwt');
const validateRoles = require('../middlewares/validar-roles');
const validateFile =require('../middlewares/validar-archivo');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateFile
}