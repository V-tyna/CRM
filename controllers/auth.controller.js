module.exports = {
  loginController: (req, res) => {
    res.status(200).json({
      login: {
        email: req.body.email,
        password: req.body.password
      }
    });
  },

  signupController: (req, res) => {
    res.status(200).json({
      signup: 'Signup from controller.'
    });
  }
}
