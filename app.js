const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const multer = require("multer");
const upload = multer();
const mongoose = require("mongoose");

const dbuser = require("./miscbin/dbuser");
const indexRouter = require('./routes/index');
const thingsRouter = require("./routes/things");
const usersRouter = require('./routes/users');
const testsRouter = require("./routes/assess");

const app = express();
mongoose.connect(dbuser, { useNewUrlParser: true, useUnifiedTopology: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.locals.gheading = "Express Server"; 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(upload.array());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/things', thingsRouter);
app.use('/users', usersRouter);
app.use('/assess', testsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;