const Order = require('../models/order.model');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  getAll: async (req, res) => {
    try {
      let allOrdersLength;
      // GET http://localhost:4200/api/order?offset=2&limit=5 , req.query: offset and limit
      const queryForFilters = {
        user: req.user.id,
      };

      // Search by date range
      if (req.query.start && req.query.end) {
        queryForFilters.date = {
          $gte: req.query.start,
          $lte: req.query.end
        }
        allOrdersLength =  await Order.find(queryForFilters).count();
      }

      // Search by order number
      if(req.query.order) {
        queryForFilters.order = +req.query.order;
        allOrdersLength = 1;
      }

      if (!req.query.order && (!req.query.start && !req.query.end)) {
        allOrdersLength = await Order.find().count();
      }

      const orders = await Order
        .find(queryForFilters)
        .sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit);
        return res.status(200).json({orders, allOrdersLength});
    } catch(e) {
      errorHandler(res, e);
    }
  },

  create: async (req, res) => {
    try {
      const lastOrder = await Order
        .findOne({ user: req.user.id })
        .sort({ date: -1 });
      const maxOrder = lastOrder ? lastOrder.order : 0;
      const order = new Order({
        list: req.body.list,
        user: req.user.id,
        order: maxOrder + 1
      });
      await order.save();
      return res.status(201).json(order);
    } catch(e) {
      errorHandler(res, e);
    }
  },
}