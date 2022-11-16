const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

app.get('/',(req,res)=>{

    try{
        let token = jwt.sign({'message':'Hello World!'},'mysecret',{expiresIn: '24h'});
        res.cookie('token',token,{maxAge:'60000',httpOnly: true});
        res.send('token generated. Go to /verify to verify the token');
    }
    catch{
        res.send('Error generating token!');
    }
});

app.get('/verify',(req,res)=>{
    
    jwt.verify(req.cookies.token,'mysecret',(err,decoded)=>{
        if(!err){
            console.log(decoded);
            res.send('Token verification successful!');
        }else{
            res.send('Token verification failed');
        }
    });
});

app.listen(3000);