var session = require('./index').session;

var serverSettings = require("./settings");
var MongoStore = require("connect-mongo")(session);

module.exports = session({
  store: new MongoStore(serverSettings.MongoConnection),
  secret: serverSettings.session.password,
  saveUninitialized: true,
  resave: false,
  cookie: {
    path: "/",
    httpOnly: true,
    secure: false, /*should be true*/
    maxAge: 1800000  //30 min
  }
});