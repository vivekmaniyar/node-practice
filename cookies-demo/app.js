var express = require('express');
var cookies = require('cookie-parser');
var app = express();

app.use(cookies());

app.get('/createcookie',function(req,res){
    res.cookie('name','vivek');
    res.send('cookie created');
});

app.get('/readcookie',function(req,res){
    res.status(200).send(req.cookies);
});

app.listen(3000);