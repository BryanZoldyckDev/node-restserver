const { response } = require('express');
const {ObjectId} = require('mongoose').Types;

const {User, Category, Product} = require('../models')

const collectionsAllowed = [
    'categories',
    'products',
    'roles',
    'users',
];

const searchCategories = async(term='', res = response) => {
    
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const category = await Category.findById(term);
        return res.json({
            results: (category) ?  [category] : [],
        });
    }

    const regex = new RegExp( term, 'i');

    const categories = await Category.find({name: regex, status:true})
                                    .populate({path: 'user', select: 'name -_id'});

    res.json({
        results: categories
    });
}

const searchProducts = async(term = '', res = response) =>{

    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const product = await Product.findById(term);
        return res.json({
            results: (product) ?  [product] : [],
        });
    }

    const regex = new RegExp( term, 'i');

    const products = await Product.find({name: regex, status:true})
                                    .populate({path: 'user', select: 'name -_id'})
                                    .populate({path: 'category', select: 'name -_id'});

    res.json({
        results: products
    });
}

const searchUsers = async(term = '', res = response) =>{

    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ?  [user] : [],
        });
    }

    const regex = new RegExp( term, 'i');

    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{status:true}]
    });

    res.json({
        results: users
    });
}



const search = async(req, res = response) => {

    const {collection, term} = req.params;

    if(!collectionsAllowed.includes(collection)) {
        return res.status(400).json({
            msg: `Collections allowed are : ${collectionsAllowed}`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res);
        break;
        case 'categories':
            searchCategories(term, res);
        break;
        case 'products':
            searchProducts(term, res);
        break;
        default:
            res.status(500).json({
                msg: 'I forgot about did this search '
            })

    }
}

module.exports = {
    search,
}