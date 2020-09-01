var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bikesRouter = require('./routes/bikes');
//Rutas de API
var apibikes = require('./routes/api/bikes');
var apiusers = require('./routes/api/users'); 

var app = express();

// Importacion y integracion de mongoose
var mongoose = require('mongoose');
const { error } = require('console');

var mongoDB ='mongodb://localhost/red_bicicletas';
mongoose.connect(mongoDB,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error: '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bicynet', indexRouter);
app.use('/bicynet/users', usersRouter);
app.use('/bicynet/network', bikesRouter);
app.use('/api', apibikes);
app.use('/api/users', apiusers);


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
