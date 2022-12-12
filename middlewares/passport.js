const mongoose = require('mongoose');
const { ExtractJwt, Strategy } = require('passport-jwt');

const { SECRET_JWT } = require('../configs/index');

const User = mongoose.model('user');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_JWT
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try{
        const user = await User.findById(payload.userId).select('email id');
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch(e) {
        console.log('Passport middleware error: ', e);
      }
    })
  );
};
