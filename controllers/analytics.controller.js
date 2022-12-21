module.exports = {
  analytics: (req, res) => {
    return res.status(200).json({
      'analyticsController': 'Analytics from controller.'
    });
  },

  overview: (req, res) => {
    return res.status(200).json({
      'overviewController': 'overviewController from controller.'
    });
  }
}
