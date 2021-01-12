const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParse= require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser');
const http = require('http')
const socketio = require('socket.io');
//const model = require("../models/user")
//const User = mongoose.model('user', model)


const url = require('./config/index')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter =  require('./routes/login');
const registerRouter =  require('./routes/register');
//const adminRouter = require('./routes/admin')

const app = express();




mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', ()=>{
  console.log('connected')
});


const server = http.createServer(app);
const io = socketio(server);


io.on('connection', async (socket) => {
  console.log(activeUsers)
  console.log('a user connected');
  //let user = await User.find().select('-__v, -password -email,').then(result=>{
   
    //activeUsers.add(results)
    socket.emit('message', 'hy my dear')

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  
    // Listen for message from input
     socket.on('ChatMsg', (msg)=>{
     io.emit('message', msg)
    })
    // Get activeUsers 
  
  //});
    
  })

  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({name:'sessionName', secret:'Hasmik Davtyan'}))







app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

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

module.exports = {app: app, server: server};
