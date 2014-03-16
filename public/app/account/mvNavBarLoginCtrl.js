angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, $location, mvIdentity, mvNotifier, mvAuth) {
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
