module.exports = {
  getAll: (req, res) => {
    res.status(200).json({
      categoryController: 'All Categories from controller.'
    });
  },

  getById: (req, res) => {
    res.status(200).json({
      categoryController: 'Category from controller.'
    });
  },

  create: (req, res) => {
    res.status(200).json({
      categoryController: 'Category from controller.'
    });
  },

  update: (req, res) => {
    res.status(200).json({
      categoryController: 'categoryEditingController from controller.'
    });
  },

  delete: (req, res) => {
    res.status(200).json({
      categoryController: 'categoryDeletionController from controller.'
    });
  }
}