var mongoose = require('mongoose'),
    userModel = require('../models/user'),
    courseModel = require('../models/course'),
    PostModel = require('../models/article');

module.exports = function(config) {
  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('globalvision db opened');
  });

  userModel.createDefaultUsers();
  courseModel.createDefaultCourses();
};

