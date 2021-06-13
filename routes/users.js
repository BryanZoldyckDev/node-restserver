const { Router } = require('express');
const { getUsers, postUsers, deleteUsers, putUsers, patchUsers } = require('../controllers/users');

const router = Router();

router.get('/', getUsers)

router.put('/:id', putUsers)

router.post('/', postUsers)

router.delete('/', deleteUsers)

router.patch('/', patchUsers)

module.exports = router;