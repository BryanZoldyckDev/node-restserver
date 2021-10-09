const { request, response } = require("express");
const {Product, Category} = require('../models');

const getProducts = async(req = request, res = response) =>{
    const {from = 0, to = 10} = req.query;
    const query = {status:true};

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product
            .find(query)
            .skip(Number(from))
            .limit(Number(to))
            .populate({
                path: 'user', 
                select: 'name -_id'})
            .populate({
                path: 'category', 
                select: 'name -_id'})
    ])

    res.status(200).json({
        total,
        products,
    })
}

const getProductById = async(req = request, res = response) =>{
    const {id} = req.params;

    const product = await Product.findById(id).populate({path: 'user', select: 'name -_id'}).populate({path: 'category', select: 'name -_id'})

    res.status(200).json(product)
}

const createProduct = async(req = request, res = response) => {

    const {status, user, ...body} = req.body;

    const name = body.name.toUpperCase();

    const productDB = await Product.findOne({name});

    if(productDB) {
        return res.status(400).json({
            msg: `The product ${req.body.name} already exists`
        });
    }

    // const category = req.body.category.toUpperCase();

    // const categoryDB = await Category.findOne({name: category})

    // if(!categoryDB) {
    //     return res.status(400).json({
    //         msg:  `The category ${req.body.category} doesn't exists, try a valid category.`
    //     });
    // }

    // const {_id} = categoryDB;

    // //Generate data to save
    // const data = {
    //     name,
    //     price,
    //     description,
    //     user: req.user._id,
    //     category: _id,
    //     available
    // }

    const data = {
        ...body,
        name,
        user: req.user._id
    }

    const product = await new Product(data);

    //Save in DB

    await product.save();

    res.status(200).json(product);
}

const updateProduct = async(req = request, res = response) => {
    
    const {id} = req.params;

    const {status, user, ...data} = req.body;

    if(data.name) {
        data.name = req.body.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, {new:true}).populate({path: 'user', select: 'name -_id'}).populate({path: 'category', select: 'name -_id'});

    res.status(200).json(product);
}

const deleteProduct = async(req = request, res = response) => {
    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id, {status:false}, {new:true}).populate({path: 'user', select: 'name -_id'}).populate({path: 'category', select: 'name -_id'});

    res.status(200).json(product);
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
