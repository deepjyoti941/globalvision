var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

module.exports = function() {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log('passport.use');
      User.findOne({ username: username }, function(err, user) {
        if (user && user.authenticate(password))
          return done(null, user);
        else
          return done(null, false);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
