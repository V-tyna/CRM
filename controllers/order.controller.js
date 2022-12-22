const Order = require('../models/order.model');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  getAll: async (req, res) => {
    try {
      // GET http://localhost:4200/api/order?offset=2&limit=5 , req.query: offset and limit
      const queryForFilters = {
        user: req.user.id,
      };

      // Queries for filter 'data start'. Search by orders made after query date.
      if (req.query.start) {
        queryForFilters.date = {
          $gte: req.query.start
        }
      }

      // Queries for filter 'data end'. Search by orders made before query date.
      if (req.query.end) {
        if (!queryForFilters.date) {
          queryForFilters.date = {};
        } else {
          queryForFilters.date['$lte']= req.query.end;
        }
      }

      // Search by order number
      if(req.query.order) {
        queryForFilters.order = +req.query.order;
      }

      const orders = await Order
        .find(queryForFilters)
        .sort({ date: -1 })
        .skip(req.query.offset);
        return res.status(200).json(orders);
    } catch(e) {
      errorHandler(res, e);
    }
  },

  create: async (req, res) => {
    try {
      console.log('Order at backend: ', '1) User id:', req.user.id, '2) List: ', req.body.list)
      const lastOrder = await Order
        .findOne({ user: req.user.id })
        .sort({ date: -1 });
      const maxOrder = lastOrder ? lastOrder.order : 0;
      const order = new Order({
        list: req.body.list,
        user: req.user.id,
        order: maxOrder + 1
      });
      console.log('Last order: ', lastOrder, 'order: ', order, 'Max order: ', maxOrder)
      await order.save();
      return res.status(201).json(order);
    } catch(e) {
      errorHandler(res, e);
    }
  },
}