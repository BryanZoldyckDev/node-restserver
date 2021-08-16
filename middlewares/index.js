const validateFields = require('../middlewares/validar-campos');
const validateJWT = require('../middlewares/validar-jwt');
const validateRoles = require('../middlewares/validar-roles');


module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles
}