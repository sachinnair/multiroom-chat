module.exports = (req, res, next) => {
  var username = req.body.username || req.session.username;
  
  if (!(username)) {
    res.redirect("/login");
    return;
  }

  var indexTmpl = require('../template/index');
  if (req.session.page_views) {
    req.session.page_views++;
  } else {
    req.session.page_views = 1;
    req.session.username = username;
  }

  res.marko(indexTmpl, {
    name: username,
    count: 30,
    colors: ['red', 'green', 'blue'],
    totalPageViews: req.session.page_views
  });
};