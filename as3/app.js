
//la que en el ejemplo llama app
var express = require('express');
//var bodyParser = require('body-parser')
var http = require('http').Server(express);
//var myapp = express();

//var path = require('path');





var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/', function(req, res) {
    res.render('index', { title: 'Ninja Store' });
});


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like bellow.
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/',function(request,response){
   console.log("no se si esto funciona:" + request.body.user); //you will get your data in this as object.
})

app.use(express.static('views'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg );
  });

// socket.on('thumbsup', function(msg){
//     io.emit('thumbsup', msg );
//   });

});

io.on('connection',function(socket){
  socket.on('thumbsup', function(msg){
 io.emit('thumbsup', msg );
});
});




http.listen(7000);







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
