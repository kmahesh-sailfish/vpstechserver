var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mysql=require('mysql');
var jwt = require('express-jwt');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pool=mysql.createPool({
  host: 'nj5rh9gto1v5n05t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'ayedra8wyrzbk136',
  password: 'xjmpll55ycvz1mmc',
  database: 'rrywvyxe9mhors94',
  ConnectionLimit: 20
});
/*var routes = require('./routes/index');*/
var users = require('./routes/users')(pool);

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {

  // Website you wish to allow to connect

  res.setHeader('Access-Control-Allow-Origin','*');


  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  res.setHeader('Access-Control-Expose-Headers', 'Authorization, header-a');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
/*app.use('/', routes);*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var authenticate = jwt({
  secret: new Buffer('MIvWGWzF4Dsvi12-GlUIBd8XBn47hxIVl9feZT7M-MJB9Y7m7BXQ83q4sdqQLVQD', 'base64'),
  audience: 'tT8knUJcg3m2amqT0FEaHBkbjFKCEOEI'
});
app.get('/', function (req, res) {
  res.send("welcome to api..")
});
app.use('/api',authenticate);
app.use('/api/users', users);


app.use(bodyParser.json());
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
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
