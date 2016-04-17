myApp.controller("HomeCtrl", ['$scope', '$window', 
  function($scope, $window) {
    $scope.user = $window.sessionStorage.user;
    $scope.role = $window.sessionStorage.userRole;
    $scope.name = "Home Controller";
  }
]);
