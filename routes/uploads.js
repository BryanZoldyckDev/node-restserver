const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, hasRole, validateFile } = require('../middlewares');
const { collectionsAllowed } = require('../helpers');

const { uploadFiles, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads');

const router = Router();

router.get('/:collection/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'Id must be a Mongo Id').isMongoId(),
    check('collection').custom(c => collectionsAllowed(c, ['users', 'products'])),
    validateFields,
], showImage);


router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    validateFile,
    validateFields
],uploadFiles);

router.put('/:collection/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    validateFile,
    check('id', 'Id must be a Mongo Id').isMongoId(),
    check('collection').custom(c => collectionsAllowed(c, ['users', 'products'])),
    validateFields,
], updateImageCloudinary);

module.exports = router;