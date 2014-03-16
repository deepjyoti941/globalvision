var Course = require('mongoose').model('Course');

exports.list = function(req, res) {
  Course.find(function (err, collection) {
    res.send(collection);
  });
};

exports.detail = function (req, res) {
  Course.findById(req.params.id, function (err, course) {
    res.send(course);
  });
};