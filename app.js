//app jwt
const PORT = 3000;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const ioc = require('./socket/IoClient');
const mongoose = require('mongoose');
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
//Initiate our app
const app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "50mb" }));

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

let static = path.join(__dirname, '/client');
app.use(express.static(static));

//connect DB
mongoose .connect('mongodb://localhost:27017/rtcv', { 
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => {
  console.log('DB Connected!');
  require('./models/users'); 
  require('./config/passport');
  app.use(require('./routes'));
  //start schedule jobs
  //require('./data/crone');
  server.listen(PORT, () => {
    console.log('Server running on '+PORT+'/');
    let ioClient = new ioc.IoClient(io);
    ioClient.startClient();
  });
})
.catch(err => {
  console.log("DB connection Error",err.message);
});