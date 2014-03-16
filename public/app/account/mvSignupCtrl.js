angular.module('app').controller('mvSignupCtrl', function($scope, $location, mvAuth, mvNotifier) {
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