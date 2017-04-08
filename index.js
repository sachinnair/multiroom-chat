var express = require('express'),
  path = require('path');

var bodyParser = require('body-parser'),
  multer = require('multer');

var session = require("express-session");

var app = express();
var http = require('http').Server(app);

module.exports = {
  app: app,
  session: session,
  http: http
};

var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Marko is used for server side templating 
require('marko/node-require');
var markoExpress = require('marko/express');

app.use(markoExpress()); //enables res.marko(template, data)

// currently Mongo is being used for session storage
const sessionMiddleware = require('./sessionMiddleware');
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, 'chat-front/app')));

// Initializing all routes
require('./routes');

// Initializing all socket listeners and emitters
require('./sockets');

http.listen(3000, () => {
  console.log('listening on *:3000');
});

