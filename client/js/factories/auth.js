myApp.factory('AuthFactory', function($window, $location, $http, LoggedFactory) {
  return {
    login: function(username, password) {
      return $http.post('https://localhost:5555/login', {
        username: username,
        password: password
      });
    },
    logout: function() {
 
      if (LoggedFactory.isLogged) {
 
        LoggedFactory.isLogged = false;
        delete LoggedFactory.user;
        delete LoggedFactory.userRole;
 
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;
        delete $window.sessionStorage.userRole;
 
        $location.path("/login");
      }
    }
  }
});