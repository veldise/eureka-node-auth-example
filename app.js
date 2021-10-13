/**
 *
 */
const path = require('path');
const express = require('express');
const oauthserver = require('oauth2-server');

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
var memorystore = require('./model');

app.oauth = oauthserver({
  model: memorystore,
  grants: ['password','refresh_token'],
  debug: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/dump', function (req, res) {
  res.send(memorystore.dumpJSON());
});
app.all('/oauth/token', app.oauth.grant());
app.get('/test', function (req, res) {
  res.send('No secret area: test');
});
app.get('/test2', app.oauth.authorise(), function (req, res) {
  res.send('Secret area: test2');
});
app.use(app.oauth.errorHandler());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
