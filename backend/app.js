//this is node js server app, but made easier with express
const express = require('express')
//const path = require('path')
const bodyParser = require('body-parser');
//mongoose for connecting to database
const youtubeRoutes = require('./routes/youtube');
const vimeoRoutes = require('./routes/vimeo');


//import routes



const app = express();


//
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));





app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      'Access-Control-Allow-Credentials', 'true'
    )
    next();
})



app.use('/api/vimeo',vimeoRoutes);
app.use('/api/youtube',youtubeRoutes);


//export to server
module.exports = app;