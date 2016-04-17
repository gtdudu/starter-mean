var User = require('../models/user.js');

User.count({}, function(err, result) {
  if (result == 0)
  {
    var admin = new User();
    admin.username = 'admin';
    admin.password = 'admin';
    admin.role = 'admin';
    admin.save(function (err) {
      if (err)
        throw err;
    });

    var user = new User();
    user.username = 'dummy';
    user.password = 'dummy';
    user.role = 'user';
    user.save(function (err) {
      if (err)
        throw err;
    });  
  }
});


var users = {

  getAll: function(req, res) {
    User.find({}, '-password', function(err, results) {
      if (err)
        res.send(err);
      res.json(results);
    })
  },

  getOne: function(req, res) {
    User.findById({ _id: req.params.id }, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  },

  create: function(req, res) {
      var user = new User();
      user.username = req.body.username;
      user.password = req.body.password;
      user.role = 'user';
      user.save(function(err, result) {
        if (err)
          res.send(err);
        res.json(user);
      }); 
  },

  update: function(req, res) {
    User.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name, role: req.body.role }, function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
      });
  },

  delete: function(req, res) {
    User.findByIdAndRemove({ _id: req.params.id }, function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Article removed!' });
   });
  }
};

module.exports = users;
