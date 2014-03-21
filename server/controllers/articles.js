var PostModel = require('mongoose').model('Post');

var publicFields = '_id title url tags content created';

exports.list = function(req, res) {
	var query = PostModel.find({is_published: true});
	query.select(publicFields);
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		for (var postKey in results) {
    		results[postKey].content = results[postKey].content.substr(0, 400);
    	}

  		return res.json(200, results);
	});
};

exports.listAll = function(req, res) {
	var query = PostModel.find();
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		for (var postKey in results) {
    		results[postKey].content = results[postKey].content.substr(0, 400);
    	}

  		return res.json(200, results);
	});
};

exports.read = function(req, res) {
	var id = req.params.id;
	if (id === undefined || id == '') {
		return res.send(400);
	}

	var query = PostModel.findOne({_id: id});
	query.select(publicFields);
	query.exec(function(err, result) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		result.update({ $inc: { read: 1 } }, function(err, nbRows, raw) {
			return res.json(200, result);
		});
	});
};


exports.adminRead = function(req, res) {
	var id = req.params.id;
	if (id === undefined || id == '') {
		return res.send(400);
	}

	var query = PostModel.findOne({_id: id});
	query.select(publicFields);
	query.exec(function(err, result) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}
  		return res.json(200, result);
	});
};


exports.create = function(req, res) {

	var postData = req.body.post;
	if (postData === undefined || postData.title === undefined || postData.content === undefined 
		|| postData.tags === undefined) {
		return res.send(400);
	}

	postData.title = postData.title;
	postData.tags = postData.tags.split(',');
	postData.is_published = postData.is_published;
	postData.content = postData.content;

	PostModel.create(postData, function(err) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		return res.send(200);
	});
};

exports.update = function(req, res) {

	var post = req.body.post;

	if (post === undefined || post._id === undefined) {
		res.send(400);
	}

	var updatePost = {};

	if (post.title !== undefined && post.title != "") {
		updatePost.title = post.title;
	} 

	if (post.tags !== undefined) {
		if (Object.prototype.toString.call(post.tags) === '[object Array]') {
			updatePost.tags = post.tags;
		}
		else {
			updatePost.tags = post.tags.split(',');
		}
	}

	if (post.is_published !== undefined) {
		updatePost.is_published = post.is_published;
	}

	if (post.content !== undefined && post.content != "") {
		updatePost.content = post.content;
	}

	updatePost.updated = new Date();

	PostModel.update({_id: post._id}, updatePost, function(err, nbRows, raw) {
		return res.send(200);
	});
};


exports.delete = function(req, res) {

	var id = req.params.id;
	if (id === undefined || id == '') {
		res.send(400);
	} 

	var query = PostModel.findOne({_id:id});

	query.exec(function(err, result) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		result.remove();
		return res.send(200);
	});
};


exports.listByTag = function(req, res) {
	var tagName = req.params.tagName;
	if (tagName === undefined || tagName == '') {
		return res.send(400);
	}

	var query = PostModel.find({tags: tagName, is_published: true});
	query.select(publicFields);
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		for (var postKey in results) {
    		results[postKey].content = results[postKey].content.substr(0, 400);
    	}

  		return res.json(200, results);
	});
}