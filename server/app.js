// mongoose config
require('./models/flashcards.js');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
// var methodOverride = require('method-override');
var mongoose = require('mongoose');

//seed database
var databaseSeed = require('../seed');
databaseSeed();

var routes = require('./routes/index.js');
var users = require('./routes/users.js');
var api = require('./routes/api.js');

var app = express();

// *** config file *** //
var config = require('./_config');

// *** mongoose *** ///
mongoose.connect(config.mongoURI[app.settings.env], function(err, res){
if(err) {
console.log('Error connecting to the database. ' + err);
} else {
console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// *** config middleware *** //
// app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
