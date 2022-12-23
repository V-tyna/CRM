const moment = require('moment');
const Order = require('../models/order.model');
const {getOrdersMap, calculatePrice} = require('../utils/analyticsHelpers')
const errorHandler = require('../utils/errorHandler');

module.exports = {
	analytics: (req, res) => {
		return res.status(200).json({
			analyticsController: 'Analytics from controller.',
		});
	},

	overview: async (req, res) => {
		try {
			const allOrders = await Order.find({ user: req.user.id }).sort({ date: 1 });
      const ordersMap = getOrdersMap(allOrders);
			const todayOrders = ordersMap[moment().format('DD.MM.YYYY')] || [];

			// All today's orders quantity:
			const totalTodayOrdersQuantity = todayOrders.length;
			// All orders quantity:
			const totalOrdersQuantity = allOrders.length;
			// All days quantity:
			const allDaysQuantity = Object.keys(ordersMap).length;
			// Average quantity orders per day:
			const averageQuantityOrdersPerDay = (totalOrdersQuantity / allDaysQuantity).toFixed(0);
			// Percent for orders quantity:
			const ordersPercent = (((totalTodayOrdersQuantity / averageQuantityOrdersPerDay) - 1) * 100).toFixed(2);
			// Total income:
			const totalIncome = calculatePrice(allOrders);
			// Income per day:
			const incomePerDay = totalIncome / allDaysQuantity;
			// Today's income:
			const todayIncome = calculatePrice(todayOrders);
			// Percent of income:
			const incomePercent = (((todayIncome / incomePerDay) - 1) * 100).toFixed(2);
			// Income compare:
			const incomeCompare = (todayIncome - incomePerDay).toFixed(2);
			// Quantity orders compare: 
			const quantityOrdersCompare = (totalTodayOrdersQuantity - averageQuantityOrdersPerDay).toFixed(2);

			return res.status(200).json({
				income: {
					compare: Math.abs(+incomeCompare),
					isHigher: +incomePercent > 0,
					perDay: +incomePerDay,
					percent: Math.abs(+incomePercent),
					today: +todayIncome
				},
				orders: {
					compare: Math.abs(+quantityOrdersCompare),
					isHigher: +ordersPercent > 0,
					perDay: +averageQuantityOrdersPerDay,
					percent: Math.abs(+ordersPercent),
					today: +totalTodayOrdersQuantity
				}
			});
		} catch (e) {
			errorHandler(res, e);
		}
	},
};
