import express from 'express';
const app = express();
import fetch from 'node-fetch';
import request from 'request';
import axios from 'axios';

//using node-fetch
app.get('/',async(req,res)=>{

    const response = await fetch('https://api.github.com/users/github');
    const data = await response.json();
    res.send(data);
});

//using request
app.get('/request',(req,res)=>{
    
    request('https://api.github.com/users/github',(err,response,body)=>{
        res.send(body);
    }).setHeader('User-Agent','vivekmaniyar');
});

//using axios
app.get('/axios',(req,res)=>{

    axios.get('https://api.github.com/users/github')
    .then(result=>{
        res.send(result.data);
    })
    .catch(err=>{
        res.send(err);
    });
});

app.listen(3000);