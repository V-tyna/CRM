const moment = require('moment');

module.exports = {
	getOrdersMap: function (orders = []) {
		const daysOrders = {};
		orders.forEach((order) => {
			const date = moment(order.date).format('YYYY-MM-DD');

			if (!daysOrders[date]) {
				daysOrders[date] = [];
			}
			daysOrders[date].push(order);
		});
		return daysOrders;
	},
	getPopularProducts: function(orders = []) {
		const popProds = {};
		orders.forEach((order) => {
			order.list.forEach((item) => {
				popProds[item.name] = popProds[item.name] + item.quantity || item.quantity;
			});
		});
		return Object.entries(popProds).sort((a, b) => b[1] - a[1]).slice(0, 5);
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
