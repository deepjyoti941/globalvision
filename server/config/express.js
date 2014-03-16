var express = require('express'),
    stylus = require('stylus'),
    path = require('path'),
    passport = require('passport');

module.exports = function(config) {
  var app = express();
  app.configure(function() {
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({secret: 'multi vision unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(path.join(config.rootPath, '/public')));
    app.use(express.static(path.join(config.rootPath, '/public')));
  });
  return app;
};
