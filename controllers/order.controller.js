module.exports = {
  getAll: (req, res) => {
    res.status(200).json({
      orderController: 'Order from controller.'
    });
  },

  create: (req, res) => {
    res.status(200).json({
      orderController: 'Order creation from controller.'
    });
  },
}