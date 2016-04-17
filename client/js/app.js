var myApp = angular.module('ngclient', ['ngRoute']);
 
myApp.config(function($routeProvider, $httpProvider) {
 
  $httpProvider.interceptors.push('TokenInterceptor');
 
  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      requiredLogin: false
    })
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      requiredLogin: true
    })
    .when('/posts', {
      templateUrl: 'partials/posts-list.html',
      controller: 'postController',
      requiredLogin: true
    })
    .when('/post/create', {
      templateUrl: 'partials/post-create.html',
      controller: 'postController',
      requiredLogin: true
    })
    .when('/post/:id', {
      templateUrl: 'partials/post-view.html',
      controller: 'postController',
      requiredLogin: true
    })
    .when('/post/:id/edit', {
      templateUrl: 'partials/post-edit.html',
      controller: 'postController',
      requiredLogin: true
    })
    .when('/users', {
      templateUrl: 'partials/users-list.html',
      controller: 'userController',
      requiredLogin: true,
      requiredAdmin: true
    })
    .when('/nop', {
      templateUrl: 'partials/unauthorized.html',
      requiredLogin: false
    })
    .otherwise({
      templateUrl: 'partials/404.html'
    });
});

myApp.run(function($rootScope, $window, $location, LoggedFactory) {

  LoggedFactory.check();
 
  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if (nextRoute.requiredLogin && !LoggedFactory.isLogged) {
      $location.path("/login");
     }
    if (nextRoute.requiredAdmin && LoggedFactory.userRole !== 'admin') {
      $location.path("/nop");
     }  
  });
 
  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = LoggedFactory.isLogged;

    if (LoggedFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});