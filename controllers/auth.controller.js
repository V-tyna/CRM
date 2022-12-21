const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errorHandler = require('../utils/errorHandler');
const { SECRET_JWT } = require('../configs/index');
const User = require('../models/user.model');

module.exports = {
  loginController: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: `User with this email: ${email} doesn\'t exist.`
        });
      } else {
        const areSame = await bcrypt.compare(password, user.password);
        if (areSame) {
          const token = jwt.sign({
            email: user.email,
            userId: user._id
          },
          SECRET_JWT,
          { expiresIn: '1h' }
          );
          return res.status(200).json({
            token: `Bearer ${token}`
          })
        } else {
          return res.status(403).json({
            message: 'Wrong password.'
          });
        }
      }
    } catch(e) {
      errorHandler(res, e);
    }
  },

  signupController: async (req, res) => {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(409).json({
        message: `User with this email: ${email} already exist.`
      });
    } else {
      try {
        const encryptedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: encryptedPassword });
        await user.save();
        return res.status(201).json(user);
      } catch(e) {
        errorHandler(res, e);
      } 
    }
  }
}
