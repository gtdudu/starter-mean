myApp.factory('userFactory', function($http) {
  var _userFactory = {};

  _userFactory.getUsers = function() {
    var url = 'https://localhost:5555/api/v1/admin/users';
    return $http.get(url);
  }; 

  _userFactory.deleteUser = function(id) {
    var url = 'https://localhost:5555/api/v1/admin/user/' + id;
    return $http.delete(url);
  };

  return _userFactory;
});