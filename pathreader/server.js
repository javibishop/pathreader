const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('./src/server/config/config');

let prodserver = true;

if(process.env.NODE_ENV === 'dev'){
   prodserver = false;
}else{
   prodserver = true;
}

app.use(function(req, res, next) {
   var allowedOrigins = ['http://localhost:4200'];
   if(prodserver){
      allowedOrigins = [process.env.URLFront];
   }
   var origin = req.headers.origin;
   if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
   }
   /*https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods*/
   //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   res.header('Access-Control-Allow-Credentials', true);
   return next();
 });
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configuracion global de rutas
app.use(require('./src/server/controllers/index'));


// app.get('/', function (req, res) {
//    res.json('Hello World')
// });

// Create link to Angular build directory solo PROD.
if(prodserver){
   
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

   var distDir = __dirname + "/dist/";
   app.use(express.static(distDir));

   // Catch all other routes and return the index file
   app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
   });
 }
 




mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useCreateIndex: true}, (err, res) => {
   if(err)throw err;
   else console.log('base online')
});


app.listen(process.env.PORT, ()=> console.log(process.env.PORT));
 