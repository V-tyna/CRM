module.exports = {
  getByCategoryId: (req, res) => {
    res.status(200).json({
      positionController: 'getByCategoryId from controller.'
    });
  },

  create: (req, res) => {
    res.status(200).json({
      positionController: 'create Position from controller.'
    });
  },

  update: (req, res) => {
    res.status(200).json({
      positionController: 'Edit Position from controller.'
    });
  },

  delete: (req, res) => {
    res.status(200).json({
      positionController: 'Delete position from controller.'
    });
  }
}