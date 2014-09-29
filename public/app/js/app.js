angular.module('app', ['ngResource', 'ngRoute',   'ngProgress'])
  .config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
      admin: { auth: function (mvAuth) {
       return mvAuth.authorizeCurrentUserForRoute('admin');
      }},
      user: { auth: function (mvAuth) {
       return mvAuth.authorizeAuthenticatedUserForRoute();
      }}
    };

    // $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/partials/main/main',
        controller: 'mvMainCtrl'
      }).when('/admin/users', {
        templateUrl: '/partials/admin/users-list',
        controller: 'mvUserListCtrl',
        resolve: routeRoleChecks.admin
      }).when('/signup', {
        templateUrl: '/partials/account/signup',
        controller: 'mvSignupCtrl'
      }).when('/profile', {
        templateUrl: '/partials/account/profile',
        controller: 'mvProfileCtrl',
        resolve: routeRoleChecks.user
      }).when('/courses', {
        templateUrl: '/partials/courses/course-list',
        controller: 'mvCourseListCtrl'
      }).when('/courses/:id', {
        templateUrl: '/partials/courses/course-details',
        controller: 'mvCourseDetailCtrl'
      }).when('/articles', {
        templateUrl: '/partials/articles/list-article',
        controller: 'mvListArticleCtrl'
      }).when('/articles/tag/:tagName', {
        templateUrl: '/partials/articles/list-article',
        controller: 'mvListTagArticleCtrl'
      }).when('/articles/:id', {
        templateUrl: '/partials/articles/view-article',
        controller: 'mvViewArticleCtrl'
      }).when('/admin/articles/create', {
        templateUrl: '/partials/articles/admin-post-create',
        controller: 'mvAdminPostCreateCtrl'
      }).when('/admin/articles/list', {
        templateUrl: '/partials/articles/admin-post-list',
        controller: 'mvAdminPostListCtrl',
        resolve: routeRoleChecks.admin
      }).when('/admin/articles/edit/:id', {
        templateUrl: '/partials/articles/admin-post-edit',
        controller: 'mvAdminPostEditCtrl',
        resolve: routeRoleChecks.admin
      });
  });

  angular.module('app').run(function ($rootScope, $location, ngProgress) {

    $rootScope.$on('$routeChangeStart', function() {
      ngProgress.start();
    });

    $rootScope.$on('$routeChangeSuccess', function() {
      ngProgress.complete();
    });

    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
      if (rejection === 'not authorized') {
        $location.path('/');
      }
    });
  });
 