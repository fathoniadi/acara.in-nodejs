'use strict';
var app = require('./vendor/autoload.js');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var route = require('./vendor/routing/route.js');
var expressSession = require('express-session');
var expressValidator = require('express-validator');



// view engine setup
app.set('views', path.join(__dirname, 'resources/views/'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(expressValidator());
app.use(logger('dev'));
app.use(cookieParser());
app.use(expressSession({resave: true, saveUninitialized: true, secret: 'tahutek', cookie: { maxAge: 3600000 }}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// routing
require(path.join(__dirname, "./routes/web.js"))(route);
require(path.join(__dirname, "./routes/api.js"))(route);
route.routing();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.LISTEN_PORT, function(){
  console.log(process.env.NODE_ENV+' mode');
	console.log('Listening on port '+ process.env.LISTEN_PORT);
});

module.exports = app;