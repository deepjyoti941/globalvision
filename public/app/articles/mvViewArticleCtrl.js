angular.module('app').controller('mvViewArticleCtrl', function($scope, $routeParams, $location, $sce, mvPostService) {
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