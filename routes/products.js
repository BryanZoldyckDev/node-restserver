const {Router} = require('express');
const {check} = require('express-validator');

const { validateFields, hasRole, validateJWT } = require('../middlewares');


const { getProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct } = require('../controllers/products');

const { validProductById, validCategoryById } = require('../helpers/db-validators');

const router = Router();


/** 
 * {{url}}/api/products
 */

router.get('/', getProducts);

router.get('/:id', [
    check('id', `Isn't a valid ID`).isMongoId(),
    check('id').custom(validProductById),
    validateFields
], getProductById);

router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('name', 'Name is required').not().isEmpty(),
    check('category', `Ins't a valid Mongo Id`).isMongoId(),
    check('category').custom(validCategoryById),
    validateFields
], createProduct);

router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'Ins´t a valid a ID').isMongoId(),
    check('id').custom(validProductById),
    validateFields
], updateProduct);

router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'Ins´t a valid a ID').isMongoId(),
    check('id').custom(validProductById),
    validateFields
], deleteProduct);



module.exports = router;