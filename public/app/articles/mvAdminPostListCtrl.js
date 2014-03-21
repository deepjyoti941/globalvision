angular.module('app').controller('mvAdminPostListCtrl', function ($scope, mvPostService) {
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