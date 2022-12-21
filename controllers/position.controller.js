const Position = require('../models/position.model');
const errorHandler = require('../utils/errorHandler');

module.exports = {
	getAllPositionsByCategoryId: async (req, res) => {
		try {
			const positions = await Position.find({
				category: req.params.categoryId,
				user: req.user.id,
			});
			return res.status(200).json(positions);
		} catch (e) {
			errorHandler(res, e);
		}
	},

	getById: async (req, res) => {
		try {
			const position = await Position.findOne({
				_id: req.params.id,
				user: req.user.id,
			});
			return res.status(200).json(position);
		} catch (e) {
			errorHandler(res, e);
		}
	},

	create: async (req, res) => {
		try {
			const { name, cost, category } = req.body;
			const position = new Position({
				name,
				cost,
				category,
				user: req.user.id,
			});
			await position.save();
			return res.status(201).json(position);
		} catch (e) {
			errorHandler(res, e);
		}
	},

	update: async (req, res) => {
		try {
			const updatedPosition = await Position.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: req.body },
        { new: true }
			);
			await updatedPosition.save();
			return res.status(200).json(updatedPosition);
		} catch (e) {
			errorHandler(res, e);
		}
	},

	delete: async (req, res) => {
		try {
			await Position.deleteOne({ _id: req.params.id });
			return res.status(200).json({
				message: 'Position was successfully deleted.',
			});
		} catch (e) {
			errorHandler(res, e);
		}
	},
};
