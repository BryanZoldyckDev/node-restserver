const {response, request} = require('express');

const getUsers = (req = request, res = response) => {

    const {q, nombre = 'No name', page = '1'} = req.query;

    res.status(200).json({
        msg: 'get API - controller',
        q, 
        nombre, 
        page
    })
}

const postUsers = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.status(201).json({
        msg: 'post API - controller',
        nombre,
        edad
    })
}

const putUsers = (req, res = response) => {

    const {id} = req.params;

    res.status(400).json({
        msg: 'put API - controller',
        id
    })
}

const deleteUsers = (req, res = response) => {
    res.status(200).json({
        msg: 'delete API - controller',
    })
}

const patchUsers = (req, res) => {
    res.status(200).json({
        msg: 'patch API - controller',
    })
}



module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    patchUsers,
}
