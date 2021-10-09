const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validateJWT } = require('../middlewares/validar-jwt');
// const { isAdmin, hasRole } = require('../middlewares/validar-roles');

const {validateFields, validateJWT, isAdmin, hasRole} = require('../middlewares/');
const { validRole, validEmail, validUserById } = require('../helpers/db-validators');

const { getUsers, 
        postUsers, 
        deleteUsers, 
        putUsers, 
        patchUsers } = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and must be more than 4 characters').isLength({min: 5}), 
    check('email', 'E-mail is not valid').isEmail(),
    check('email').custom(validEmail),
    //check('role', 'Is not a valid role').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('role').custom(validRole),
    validateFields

], postUsers)

router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'Ins´t a valid a ID').isMongoId(),
    check('id').custom(validUserById),
    check('role').custom(validRole),
    validateFields
],putUsers)

router.delete('/:id', [
    validateJWT,
    //isAdmin,
    hasRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'Ins´t a valid a ID').isMongoId(),
    check('id').custom(validUserById),
    validateFields
], deleteUsers)

router.patch('/', patchUsers)

module.exports = router;