const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async(req = request, res = response) => {

    //const {q, nombre = 'No name', page = '1'} = req.query;
    const {limit = 10, from = 0} = req.query;
    const query = {status:true};

    // const users = await User.find(query)
    // .skip(Number(from))
    // .limit(Number(limit));

    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.status(200).json({
        total,
        users
    })
}

const postUsers = async(req, res = response) => {
    
    const {name, password, email, role} = req.body;
    const user = new User({name, password, email, role});

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );




    //Guardar en DB
    await user.save();

    res.status(201).json(user)
}

const putUsers = async(req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, email, ...rest } = req.body;

    //TODO: Validar contra base de datos

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );

    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.status(400).json(user)
}

const deleteUsers = async(req, res = response) => {
    const { id } = req.params;

    //Fisicamente lo borramos
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {estado: false});
    res.status(200).json(user)
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
