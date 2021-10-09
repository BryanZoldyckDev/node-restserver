const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, hasRole} = require('../middlewares');

const { validCategoryById } = require('../helpers/db-validators');

const { getCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory, } = require('../controllers/categories');

const router = Router();

/** 
 * {{url}}/api/categories
 */

//Get all the categories - public acceso
router.get('/', getCategories)

//Get one categorie by id - public
router.get('/:id', [
        check('id', 'Ins´t a valid ID').isMongoId(),
        check('id').custom(validCategoryById),
        validateFields
], getCategoryById)

//Create a new categorie - private anyone with a valid token
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
],createCategory)

//Update a register by id - private anyone with valid token
router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'Ins´t a valid a ID').isMongoId(),
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(validCategoryById),
    validateFields
], updateCategory)

//Delete a categorie - Admin
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'Ins´t a valid a ID').isMongoId(),
    check('id').custom(validCategoryById),
    validateFields
],deleteCategory)

module.exports = router;