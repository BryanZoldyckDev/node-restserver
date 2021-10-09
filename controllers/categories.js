const { response, request } = require('express');

const {Category} = require('../models');

//getCategories - paged - total - populate
const getCategories = async(req = request, res = response) => {
    const {from = 0, to = 10} = req.query;
    const query = {status:true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category
            .find(query)
            .skip(Number(from))
            .limit(Number(to))
            .populate({
                path: 'user', 
                select: 'name'})
    ])

    res.status(200).json({
        total,
        categories,
    })
}

//getCategory - populate {}

const getCategoryById = async(req = request, res = response) => {
    
    const { id } = req.params;

    const category = await Category.findById(id).populate({path: 'user', select: 'name -_id'});

    res.status(200).json(category)
}


const createCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({name});

    if (categoryDB) {
        return res.status(400).json({
            msg: `The category ${categoryDB.name} already exists`
        });
    }

    //Generate data to save
    const data = {
        name,
        user: req.user._id
    }

    const category = await new Category(data);

    //Save ind DB
    await category.save();

    res.status(200).json(category);
}

//updateCategory 
const updateCategory = async(req = request, res = response) => {
    
    const {id} = req.params;

    const {status, user, ...data} = req.body;

    data.name = req.body.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true}).populate({path: ' user', select: 'name'})

    res.status(200).json(category);
}

//deleteCategory - status:false
const deleteCategory = async(req = request, res = response) => {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, {status: false}, {new:true}).populate({path: 'user', select: 'name'});

    res.status(200).json(category);
}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}