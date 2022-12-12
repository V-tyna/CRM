module.exports = {
  analytics: (req, res) => {
    res.status(200).json({
      'analyticsController': 'Analytics from controller.'
    });
  },

  overview: (req, res) => {
    res.status(200).json({
      'overviewController': 'overviewController from controller.'
    });
  }
}
