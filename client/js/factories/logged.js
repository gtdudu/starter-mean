myApp.factory('LoggedFactory', function($window) {
  return {
    'isLogged': false,
    'check': function() {
      if ($window.sessionStorage.token && $window.sessionStorage.user && $window.sessionStorage.userRole) {
        this.isLogged = true;
        if (!this.user) 
          this.user = $window.sessionStorage.user;
        if (!this.userRole) 
          this.userRole = $window.sessionStorage.userRole;
      } else {
        this.isLogged = false;
        delete this.user;
        delete this.userRole;
      }
    }
  }
});