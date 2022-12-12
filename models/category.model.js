const { Schema, model } = require('mongoose');

const category = new Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
});

module.exports = model('category', category);
