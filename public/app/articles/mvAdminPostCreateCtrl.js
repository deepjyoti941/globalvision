angular.module('app').controller('mvAdminPostCreateCtrl', function($scope, $location, mvPostService) {
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