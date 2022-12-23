const moment = require('moment');

module.exports = {
	getOrdersMap: function (orders = []) {
		const daysOrders = {};
		orders.forEach((order) => {
			const date = moment(order.date).format('DD.MM.YYYY');

			if (!daysOrders[date]) {
				daysOrders[date] = [];
			}
			daysOrders[date].push(order);
		});
		return daysOrders;
	},
	calculatePrice: function (orders = []) {
    return orders.reduce((total, order) => {
      const orderPrice = order.list.reduce((orderTotal, item) => {
        return orderTotal += item.cost * item.quantity;
      }, 0);
      return total += orderPrice;
    }, 0);
  },
};
