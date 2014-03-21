var appService = angular.module('app');

appService.factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
  return {
    authenticateUser: function(username, password) {
      var deferred = $q.defer();
      $http.post('/login', {username: username, password: password})
        .then(function(response) {
          if (response.data.success) {
            var user = new mvUser();
            angular.extend(user, response.data.user);
            mvIdentity.currentUser = user;
            deferred.resolve(true);
          } else {
            deferred.resolve(false);
          }
      });
      return deferred.promise;
    },
    logoutUser: function () {
      var deferred = $q.defer();
      $http.post('/logout', {logout: true})
        .then(function (response) {
          mvIdentity.currentUser = undefined;
          deferred.resolve(true);
      });
      return deferred.promise;
    },
    authorizeCurrentUserForRoute: function (role) {      
      if (mvIdentity.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    },
    authorizeAuthenticatedUserForRoute: function () {      
      if (mvIdentity.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    },
    createUser: function(newUserData) {
      var newUser = new mvUser(newUserData);
      var deferred = $q.defer();

      newUser.$save().then(function(arguments) {
        mvIdentity.currentUser = newUser;
        deferred.resolve();
      }, function(response) {
        deferred.reject(response.data.reason);
      });
      
      return deferred.promise;
    },
    updateCurrentUser: function(newUserData) {
      var deferred = $q.defer();
      var clone = angular.copy(mvIdentity.currentUser);
      angular.extend(clone, newUserData);

      clone.$update().then(function() {
        mvIdentity.currentUser = clone;
        deferred.resolve();
      }, function(response) {
        deferred.reject(response.data.reason);
      });
      
      return deferred.promise;
    }
  };
});


appService.factory('mvIdentity', function($window, mvUser) {
  var currentUser;
  if (!!$window.bootstrappedUserObject) {
    currentUser = new mvUser();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !! this.currentUser;
    },
    isAuthorized: function(role) {
      return !! this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  };
});


appService.factory('mvUser', function ($resource) {
  var UserResource = $resource('/api/users/:id', {_id: "@id"}, {
    update: {
      method: 'PUT', isArray: false
    }
  });

  UserResource.prototype.isAdmin = function() {
    return this.roles && this.roles.indexOf('admin') > -1;
  };

  return UserResource;
});


appService.value('mvToastr', toastr);
appService.service('mvNotifier', function(mvToastr) {
  return {
    notifySuccess: function(msg) {
      mvToastr.success(msg);
    },
    notifyError: function(msg) {
      mvToastr.error(msg);
    },
    notifyWarning: function(msg) {
      mvToastr.warning(msg);
    }
  }
});


appService.factory('mvCourse', function($resource){
  var CourseResource = $resource('/api/courses/:_id', {_id: "@id"}, {
    update: {method:'PUT', isArray: false}
  });

  return CourseResource;
});


appService.factory('mvCachedCourses', function(mvCourse){
  var courseList;
  return {
    query: function () {
      courseList = courseList || mvCourse.query();
      return courseList;
    }
  }
});


appService.factory('mvPostService', function ($http) {
      return {
        findAllPublished: function() {
            return $http.get('/article/post');
        },

        findByTag: function(tag) {
            return $http.get('/tag/' + tag);
        },

        adminRead: function(id) {
            return $http.get('/admin/article/post/' + id);
        },

        read: function(id) {
            return $http.get('/article/' + id);
        },
        
        findAll: function() {
            return $http.get('/article/post/all');
        },

        changePublishState: function(id, newPublishState) {
            return $http.put('/article/post', {'post': {_id: id, is_published: newPublishState}});
        },

        delete: function(id) {
            return $http.delete('/article/post/' + id);
        },

        create: function(post) {
            return $http.post('/article/post', {'post': post});
        },

        update: function(post) {
            return $http.put('/article/post', {'post': post});
        }
    };
});





