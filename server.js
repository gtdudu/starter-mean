var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var fs = require('fs');
var favicon = require('serve-favicon');

var hscert = fs.readFileSync('./server/config/hacksparrow-cert.pem');
var hskey = fs.readFileSync('./server/config/hacksparrow-key.pem');

var credentials = {
    key: hskey,
    cert: hscert
};

var app = express();

var mongoStr = 'mongodb://localhost:27017/mean';
mongoose.connect(mongoStr, function(err) {
    if (err) 
      throw err;
    console.log('Successfully connected to MongoDB');
});

var login = require('./server/routes/login.js');
var post = require('./server/routes/post.js');
var user = require('./server/routes/user.js');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/client'));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');

  ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
  console.log(ip);

  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.all('/api/v1/*', [require('./server/middlewares/checkToken')]);


app.post('/login', login);

app.get('/api/v1/posts', post.getAll);
app.get('/api/v1/post/:id', post.getOne);

app.post('/api/v1/admin/post/', post.create);
app.put('/api/v1/admin/post/:id', post.update);
app.delete('/api/v1/admin/post/:id', post.delete);

app.get('/api/v1/admin/users', user.getAll);
app.get('/api/v1/admin/user/:id', user.getOne);
app.post('/api/v1/admin/user/', user.create);
app.put('/api/v1/admin/user/:id', user.update);
app.delete('/api/v1/admin/user/:id', user.delete);

app.use(function(req, res, next) {
  var err = {};
  err.status = 404;
  next(err);
});


var httpsServer = https.createServer(credentials, app);

httpsServer.listen(5555);
console.log('Express server listening on port ' + 5555);
