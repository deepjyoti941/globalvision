var app = angular.module('app');

app.controller('mvMainCtrl', function($scope, mvCachedCourses) {
  $scope.courses = mvCachedCourses.query();
});


app.controller('mvNavBarLoginCtrl', function($scope, $http, $location, mvIdentity, mvNotifier, mvAuth) {
  $scope.identity = mvIdentity;
  $scope.signin = function(username, password) {
    mvAuth.authenticateUser(username, password)
      .then(function(success) {
        if (success) {
          mvNotifier.notifySuccess('You have successfully signed in!');
        } else {
          mvNotifier.notifyError('Username/Password combination incorrect');
        }
    });
  };
  $scope.signout = function () {
    mvAuth.logoutUser().then(function () {
      $scope.username = '';
      $scope.password = '';
      mvNotifier.notifySuccess('You have succesfully signed out');
      $location.path('/');
    });
  };
});

app.controller('mvSignupCtrl', function($scope, $location, mvAuth, mvNotifier) {
  $scope.signup = function() {
    var newUserData = {
      username: $scope.email,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname 
    };

    mvAuth.createUser(newUserData).then(function() {
      mvNotifier.notifySuccess('User account created!');
      $location.path('/');
    }, function(reason) {
      mvNotifier.notifyError(reason);
    })
  }
});


app.controller('mvProfileCtrl', function($scope, mvAuth, mvIdentity, mvNotifier) {
  $scope.email = mvIdentity.currentUser.username;
  $scope.fname = mvIdentity.currentUser.firstName;
  $scope.lname = mvIdentity.currentUser.lastName;

  $scope.update = function() {
    var newUserData = {
      username: $scope.email,
      firstName: $scope.fname,
      lastName: $scope.lname
    };

    if ($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
    } 

    mvAuth.updateCurrentUser(newUserData).then(function() {
      mvNotifier.notifySuccess("Profile updated!")
    }, function(reason) {
      mvNotifier.notifyError(reason);
    });
  }
});


app.controller('mvUserListCtrl', function($scope, mvUser) {
  $scope.users = mvUser.query();
});


app.controller('mvCourseListCtrl', function($scope, mvCachedCourses) {
  $scope.courses = mvCachedCourses.query();

  $scope.sortOptions = [
    {value:'title', text: 'Sort By Title'},
    {value:'published', text: 'Sort By Published Date'}
  ];
  $scope.sortOrder = $scope.sortOptions[0].value;
});


app.controller('mvCourseDetailCtrl', function($scope, mvCachedCourses, $routeParams){
  mvCachedCourses.query().$promise.then(function (collection) {
    collection.forEach(function (course) {
      if (course._id === $routeParams.id) {
        $scope.course = course;
      }
    });
  });
});


app.controller('mvAdminPostListCtrl', function ($scope, mvPostService) {
    $scope.posts = [];

    mvPostService.findAll().success(function(data) {
        $scope.posts = data;
    });

    $scope.updatePublishState = function updatePublishState(post, shouldPublish) {
        if (post !== undefined && shouldPublish !== undefined) {

            mvPostService.changePublishState(post._id, shouldPublish).success(function(data) {
                var posts = $scope.posts;
                for (var postKey in posts) {
                    if (posts[postKey]._id == post._id) {
                        $scope.posts[postKey].is_published = shouldPublish;
                        return ;
                    }
                }
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }
    }


    $scope.deletePost = function deletePost(id) {
        if (id != undefined) {

            mvPostService.delete(id).success(function(data) {
                var posts = $scope.posts;
                for (var postKey in posts) {
                    if (posts[postKey]._id == id) {
                        $scope.posts.splice(postKey, 1);
                        return ;
                    }
                }
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }
    }
});



app.controller('mvAdminPostCreateCtrl', function($scope, $location, mvPostService) {
	$('#textareaContent').wysihtml5({"font-styles": false});

    $scope.save = function save(post, shouldPublish) {
	    if (post !== undefined 
	        && post.title !== undefined
	        && post.tags != undefined) {

	        var content = $('#textareaContent').val();
	        if (content !== undefined) {
	            post.content = content;

	            if (shouldPublish !== undefined && shouldPublish == true) {
	                post.is_published = true;
	            } else {
	                post.is_published = false;
	            }

	            mvPostService.create(post).success(function(data) {
	                $location.path("/admin/articles/list");
	            }).error(function(status, data) {
	                console.log(status);
	                console.log(data);
	            });
	        }
	    }
	}
});


app.controller('mvAdminPostEditCtrl', function ($scope, $location, $routeParams, $sce, mvPostService) {

    $scope.post = {};
    var id = $routeParams.id;

    mvPostService.adminRead(id).success(function(data) {
        $scope.post = data;
        $('#textareaContent').wysihtml5({"font-styles": false});
        $('#textareaContent').val($sce.trustAsHtml(data.content));
    }).error(function(status, data) {
        $location.path("/admin/articles/list");
    });

    $scope.save = function save(post, shouldPublish) {
        if (post !== undefined 
            && post.title !== undefined && post.title != "") {

            var content = $('#textareaContent').val();
            if (content !== undefined && content != "") {
                post.content = content;

                if (shouldPublish != undefined && shouldPublish == true) {
                    post.is_published = true;
                } else {
                    post.is_published = false;
                }

                // string comma separated to array
                if (Object.prototype.toString.call(post.tags) !== '[object Array]') {
                    post.tags = post.tags.split(',');
                }
                
                mvPostService.update(post).success(function(data) {
                    $location.path("/admin/articles/list");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }
    }

});


app.controller('mvListArticleCtrl', function ($scope,$sce, mvPostService) {
    $scope.posts = [];

    mvPostService.findAllPublished().success(function(data) {
        for (var postKey in data) {
            data[postKey].content = $sce.trustAsHtml(data[postKey].content);
        }

        $scope.posts = data;            
    }).error(function(data, status) {
        console.log(status);
        console.log(data);
    });
});


app.controller('mvViewArticleCtrl', function($scope, $routeParams, $location, $sce, mvPostService) {
    $scope.post = {};
    var id = $routeParams.id;

    mvPostService.read(id).success(function(data) {
        data.content = $sce.trustAsHtml(data.content);
        $scope.post = data;
    }).error(function(data, status) {
        console.log(status);
        console.log(data);
    });	
});


app.controller('mvListTagArticleCtrl', function ($scope, $routeParams, $sce, mvPostService) {
    
    $scope.posts = [];
    var tagName = $routeParams.tagName;

    mvPostService.findByTag(tagName).success(function(data) {
        for (var postKey in data) {
            data[postKey].content = $sce.trustAsHtml(data[postKey].content);
        }
        $scope.posts = data;
    }).error(function(status, data) {
        console.log(status);
        console.log(data);
    });

});







