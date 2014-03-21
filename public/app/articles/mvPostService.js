angular.module('app').factory('mvPostService', function ($http) {
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