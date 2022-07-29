var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.get('/', function(req, res) {
    if (req.session.views) {
        req.session.views++;
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>views: ' + req.session.views + '</p>');
        res.end();
    } else {
        req.session.views = 1;
        res.end('<p>welcome to the session demo. refresh!</p>');
    }
});

app.listen(3000);