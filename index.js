/*jshint esversion: 6*/
const express = require('express');
const server = express();
const port = process.env.PORT || 8080;

//middleware
const logger = require('./middleware/logger');
//router
const weatherRouter = require('./routers/weather.router');

server.use(logger);
server.use(weatherRouter);

server.get('/',(req,resp)=>{
  resp.send('It Works!');
});


server.listen(port,()=>{
  console.log('Listening on port: ', port);
});
