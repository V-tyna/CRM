const Category = require('../models/category.model');
const errorHandler = require('../utils/errorHandler');
const Position = require('../models/position.model');

module.exports = {
	getAll: async (req, res) => {
		try {
			const categories = await Category.find({
				user: req.user.id,
			});
			res.status(200).json(categories);
		} catch (e) {
			errorHandler(res, e);
		}
	},

	getById: async (req, res) => {
		try {
			const category = await Category.findById(req.params.id);
			res.status(200).json(category);
		} catch (e) {
			errorHandler(res, e);
		}
	},

	create: async (req, res) => {
		try {
			const category = new Category({
				name: req.body.name,
				user: req.user.id,
				imageUrl: req.file ? req.file.path : '',
			});
			await category.save();
			res.status(201).json(category);
		} catch (e) {
			errorHandler(res, e);
		}
	},

	update: async (req, res) => {
		try {
			const updated = {
        name: req.body.name,
      };
      if (req.file) {
        updated.imageUrl = req.file.path;
      }
			const updatedCategory = await Category.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: updated },
				{ new: true }
			);
			res.status(200).json(updatedCategory);
		} catch (e) {
			errorHandler(res, e);
		}
	},

	delete: async (req, res) => {
		try {
			await Category.deleteOne({ _id: req.params.id });
			await Position.deleteMany({ category: req.params.id });
			res.status(200).json({
				message:
					'Category and all positions from that category were successfully deleted.',
			});
		} catch (e) {
			errorHandler(res, e);
		}
	},
};
