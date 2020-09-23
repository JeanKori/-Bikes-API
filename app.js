var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// passport y Session
const passport = require('./config/passport');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bikesRouter = require('./routes/bikes');
var tokenRouter = require('./routes/token');

//Rutas de API
//const jwt = require('jsonwebtoken'); //npm install jsonwebtoken --save
var verificarUsuer = require('./controllers/api/auth').verificarLogged;//LoggedIn para API
var apiauth = require('./routes/api/auth');
var apibikes = require('./routes/api/bikes');
var apiusers = require('./routes/api/users');
//Acceso
var loginuser = require('./routes/login'); 
const storage = new session.MemoryStore;//guardamos sesion en memoria

var app = express();

app.set('SecretKey','jwt*_/!·$#~€japdbnftg..+1458d96f74d');

app.use(session({//configuracion de cockies
    cookie:{ maxAge: 120 * 60 * 60 * 1000 },
    store: storage,
    saveUninitialized: true,
    resave: 'true',
    secret: 'network_bicycle***/*-+/..test$%&&/@new_port7856250'
}));

// Importacion y integracion de mongoose
var mongoose = require('mongoose');
const { error } = require('console');
// const passport = require('passport');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login',loginuser);

app.use('/bicynet',indexRouter);
app.use('/bicynet/users', usersRouter);
app.use('/bicynet/network', bikesRouter);
app.use('/token', tokenRouter);
app.use('/api/auth', apiauth);
app.use('/api',verificarUsuer, apibikes);
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
