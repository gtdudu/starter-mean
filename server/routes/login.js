var jwt = require('jwt-simple');
var Users = require('../models/user.js');

var login = function(req, res) {

  var username = req.body.username || '';
  var password = req.body.password || '';

  if (username == '' || password == '') {
    res.status(401);
    res.json({
      "status": 401,
      "message": "No way, Invalid credentials"
    });
    return;
  }

  Users.findOne({username: username}, '-_id password username role', 
    function(err, user) {
      if(err || user === null) {
        res.status(401);
        res.json({
          "status": 401,
          "message": "invalid credentials"
        });
      } else {
          user.comparePassword(password, function(err, isMatch) {
            if (err) 
              throw err;
            if (isMatch) {
              var tmpUser = { 
                username: user.username, 
                role: user.role 
              };
              res.json(genToken(tmpUser));
            }
            else {
              res.status(401);
              res.json({
                "status": 401,
                "message": "invalid credentials"
              });
            }
        });
      }
    });
}

function genToken(user) {
  var expires = expiresIn(2);
  var token = jwt.encode({
    iss: 'Identity Provider',
    exp: expires,
    sub: user
  }, require('../config/secret')());

  return {
    token: token,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = login;
