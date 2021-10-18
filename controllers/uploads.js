const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require("express");

const { uploadFile } = require("../helpers");

const {User, Product} = require('../models')

const uploadFiles = async(req, res = response) => {
    try {
      const fileName = await uploadFile(req.files, 'img');
      res.json({fileName})
    } catch (msg) {
      res.status(400).json({msg})
    }
}

const updateImage = async(req, res = response) => {

	const {id, collection} = req.params;

	let model;

	switch (collection) {
		case 'users':
			model = await User.findById(id)
			
			if(!model){
				return res.status(400).json({
					msg: `Does not exists one user with id: ${id}`
				});
			}
    		break;

    	case 'products':
			model = await Product.findById(id)
			
			if(!model){
				return res.status(400).json({
					msg: `Does not exists one product with id: ${id}`
				});
			}
    		break;

    	default:
			return res.status(500).json({
				msg: 'I forgot about validate this.'
			})
      		break;
	}

	//Limpiar imagenes previas

	if(model.img) {
		//Hay que borrar la imagen del server
		const pathImage = path.join(__dirname, '../uploads', collection, model.img);
		if(fs.existsSync(pathImage)) {
			fs.unlinkSync(pathImage);
		}
	}

	const fileName = await uploadFile(req.files, collection)

	model.img = fileName;

	await model.save();

	res.json(model);
}

const updateImageCloudinary = async(req, res = response) => {

	const {id, collection} = req.params;

	let model;

	switch (collection) {
		case 'users':
			model = await User.findById(id)
			
			if(!model){
				return res.status(400).json({
					msg: `Does not exists one user with id: ${id}`
				});
			}
    		break;

    	case 'products':
			model = await Product.findById(id)
			
			if(!model){
				return res.status(400).json({
					msg: `Does not exists one product with id: ${id}`
				});
			}
    		break;

    	default:
			return res.status(500).json({
				msg: 'I forgot about validate this.'
			})
      		break;
	}

	//Limpiar imagenes previas

	if(model.img) {
		//Hay que borrar la imagen del server
		const splitUrl = model.img.split('/');
		const fileName = splitUrl[ splitUrl.length - 1 ];
		const [public_id] = fileName.split('.');

		cloudinary.uploader.destroy(public_id);
	}

	const {tempFilePath} = req.files.file;
	const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
	
	model.img = secure_url;

	await model.save();

	res.json(model);
}

const showImage = async(req, res = response) => {
	const {id, collection} = req.params;

	let model;

	switch (collection) {
		case 'users':
			model = await User.findById(id)
			
			if(!model){
				return res.status(400).json({
					msg: `Does not exists one user with id: ${id}`
				});
			}
    		break;

    	case 'products':
			model = await Product.findById(id)
			
			if(!model){
				return res.status(400).json({
					msg: `Does not exists one product with id: ${id}`
				});
			}
    		break;

    	default:
			return res.status(500).json({
				msg: 'I forgot about validate this.'
			})
      		break;
	}

	//Limpiar imagenes previas

	if(model.img) {
		//Mostrar la imagen del server
		const pathImage = path.join(__dirname, '../uploads', collection, model.img);
		if(fs.existsSync(pathImage)) {
			return res.sendFile(pathImage);
		}
	}

	const pathDefault = path.join(__dirname, '../assets/no-image.jpg');
	res.sendFile(pathDefault);
}

module.exports = {
    uploadFiles,
    updateImage,
	updateImageCloudinary,
	showImage,
}