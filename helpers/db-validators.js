const Role = require('../models/role') 
const User = require('../models/user')

const validRole =  async(role = '') => {
    const existeRole = await Role.findOne({role});
    if(!existeRole) {
        throw new Error(`Role ${role} doesn't exists in database`)
    }
}

const validEmail = async(email) => {
    const emailExists = await User.findOne({email});
    if (emailExists){
        throw new Error(`Email ${email} already exists in database`)
    }
}

const validUserById = async( id ) => {
    const idExists = await User.findById(id);
    if (!idExists){
        throw new Error(`Id ${id} doesn´t exists in database`)
    }
}

module.exports = {
    validRole,
    validEmail,
    validUserById
}