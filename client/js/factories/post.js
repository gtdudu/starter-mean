myApp.factory('postFactory', function($http) {

  var _postFactory = {};

  _postFactory.getPosts = function() {
    var url = 'https://localhost:5555/api/v1/posts';
    return $http.get(url);
  };

  _postFactory.getPost = function(id) {
    var url = 'https://localhost:5555/api/v1/post/' + id;
    return $http.get(url);
  };

  _postFactory.deletePost = function(id) {
    var url = 'https://localhost:5555/api/v1/admin/post/' + id;
    return $http.delete(url);
  };

  _postFactory.createPost = function(post) {
    var url = 'https://localhost:5555/api/v1/admin/post/';
    return $http.post(url, { title: post.title, content: post.content });
  };

  _postFactory.updatePost = function(post) {
    var url = 'https://localhost:5555/api/v1/admin/post/' + post._id;
    return $http.put(url, { title: post.title, content: post.content });
  };
  
  return _postFactory;
});