const {Category, Role, User, Product} = require('../models')

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
        throw new Error(`Id ${id} doesn't exists in database`)
    }
}

const validCategoryById = async( id ) => {
    const categoryExists = await Category.findById(id);
    if (!categoryExists){
        throw new Error(`Id ${id} doesn't exists in database`)
    }
}

const validProductById = async( id ) => {
    const productExists = await Product.findById(id);
    if (!productExists){
        throw new Error(`Id ${id} doesn't exists in database`)
    }
}

const collectionsAllowed = async(collection = '', collections = []) => {
    const collectionExits = collections.includes(collection);

    if(!collectionExits) {
        throw new Error(`The ${collection} is not allowed, valid collections are: ${collections}`);
    }

    return true;
}
module.exports = {
    collectionsAllowed,
    validRole,
    validEmail,
    validUserById,
    validCategoryById, 
    validProductById,
}