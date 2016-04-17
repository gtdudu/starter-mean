myApp.controller("postController", ['$scope', 'postFactory', '$location', '$routeParams', 'LoggedFactory',
  function($scope, postFactory, $location, $routeParams, LoggedFactory) {
    $scope.posts = [];

    $scope.init = function() {
      postFactory.getPosts().then(function(data) {
        $scope.posts = data.data;
      });
    };

    $scope.remove = function(post) {
      postFactory.deletePost(post._id);
      var index = $scope.posts.indexOf(post);
      $scope.posts.splice(index, 1);     
    };

    $scope.edit = function(post) {
      console.log(post);
    };

    $scope.goToView = function(post) {
      $location.path('/post/' + post._id);
    };

    $scope.goToCreate = function() {
      $location.path('/post/create');
    };

    $scope.goToEdit = function(post) {
      $location.path('/post/' + post._id + '/edit');
    };

    $scope.create = function() {
      var post = {};
      post.title = $scope.postTitle;
      post.content = $scope.postContent;
      postFactory.createPost(post);
      $location.path('/posts');
    };

    $scope.update = function(post) {
      postFactory.updatePost(post);
      $location.path('/posts');
    };

    $scope.findOne = function() {
      postFactory.getPost($routeParams.id).then(function(data) {
        $scope.post = data.data;
      });
    };

    $scope.isAdmin = function() {
      return LoggedFactory.userRole === 'admin';
    };

  }
]);