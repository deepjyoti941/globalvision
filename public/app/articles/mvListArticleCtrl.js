angular.module('app').controller('mvListArticleCtrl', function ($scope,$sce, mvPostService) {
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