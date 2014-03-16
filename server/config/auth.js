var passport = require('passport');

exports.authenticate = function(req, res, next) {
  req.body.username = req.body.username.toLowerCase();
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send({success: false}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({success: true, user: user});
    });
  })(req, res, next);
};

exports.requiresApiLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};

exports.requiresRole = function(role) {
  return function(req, res, next) {
    if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
};
