myApp.factory('TokenInterceptor', function($q, $window) {
  return {
    'request': function(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['x-Access-Token'] = $window.sessionStorage.token;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },
 
    'response': function(response) {
      return response || $q.when(response);
    }
  };
});