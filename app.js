var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var jwt = require('./until/jwt')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var medicRouter = require('./routes/medic');
var fileRouter = require('./routes/files');
var chatRouter = require('./routes/chat');
var articleRouter = require('./routes/articles');

var app = express();



//socket.io
var server = app.listen(8082);
// var io = require('socket.io')(server, { cors: true });
var io = require('socket.io').listen(server);
require('./until/socket')(io);

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", "3.2.1");
  next();
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/',express.static('./public/'))


//登陆拦截
// app.use(function (req,res,next) {
//   if(req.cookie.userId){
//     next()
//   }else {
//     if(req.originalUrl=='/users/login' || req.originalUrl=='/users/logout' || req.path == '/medic'){
//         next()
//     }else {
//       res.json({
//         status:'10001',
//         msg:"当前未登陆",
//         result:''
//       })
//     }
//   }
// })

//token判断
app.use(function (req,res,next) {
  if(typeof(req.body.token || req.query.token ) !== 'undefined'){
    //处理token匹配
    let token = req.body.token || req.query.token
    let tokenMatch = jwt.verifyToken(token);
    // console.log(tokenMatch,token)
    if (tokenMatch == 1 ){
      //通过验证
      next()
    }else {
      //验证不通过
      res.json({
        status:'300',
        msg:'token无效'
      })
    }
  }else {
    next()
  }
})

app.use('/', indexRouter);
app.use('/medic', medicRouter);
app.use('/users', usersRouter);
app.use('/files', fileRouter);
app.use('/chat', chatRouter);
app.use('/articles', articleRouter);

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
