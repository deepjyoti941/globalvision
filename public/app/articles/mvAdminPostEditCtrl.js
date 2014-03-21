angular.module('app').controller('mvAdminPostEditCtrl', function ($scope, $location, $routeParams, $sce, mvPostService) {

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