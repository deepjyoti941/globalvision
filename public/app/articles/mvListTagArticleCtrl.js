angular.module('app').controller('mvListTagArticleCtrl', function ($scope, $routeParams, $sce, mvPostService) {
    
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