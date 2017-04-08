module.exports = (req, res) => {
  if (req.query.q) {
    req.session.destroy();
  }
  if (req.session && req.session.username) {
    res.redirect("/chatroom");
    return;
  }
  var loginTmpl = require('../template/login')
  res.marko(loginTmpl, {});
}