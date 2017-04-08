var users = [];

module.exports = function (req, res, next) {
    var username = req.body.username || req.session.username;

    if (users.indexOf(username) === -1) {
        req.session.regenerate(function (err) {
            req.session.username = username;
            req.session.page_views = 0;
            users.push(username);          
            next();  
        });        
    }else {
        next();
    }
}