var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressLess = require('express-less');
var http = require('http');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/less-css', expressLess(__dirname + '/public/styles/', { compress: true }));

// sections

var home = require('./routes/home');
app.use('/', home);

var news = require('./routes/news');
app.use('/news', news);

var football = require('./routes/football');
app.use('/football', football);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;