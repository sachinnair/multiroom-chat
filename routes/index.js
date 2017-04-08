var app = require('../index.js').app;

var manageSession = require("../helpers/manageSession");

var loginHelper = require('./loginHelper');
var chatroomHelper = require('./chatroomHelper');

app.all('/chatroom', manageSession, chatroomHelper)
  .get('/login', loginHelper)
  .get('/', loginHelper);

module.exports = app;