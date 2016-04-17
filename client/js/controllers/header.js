myApp.controller("HeaderCtrl", ['$scope', '$location', 'AuthFactory', 'LoggedFactory',
  function($scope, $location, AuthFactory, LoggedFactory) {

    $scope.isActive = function(route) {
      return route === $location.path();
    }

    $scope.isAdmin = function() {
      return LoggedFactory.userRole === 'admin';
    }

    $scope.logout = function () {
      AuthFactory.logout();
    }
  }
]);