const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');

exports.users_login = (req,res,next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'Authentication failed'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) => {
            if(err){
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },process.env.JWT_SECRET,{
                    expiresIn: '1h'
                });
                return res.status(200).json({
                    message: 'Authentication successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Authentication failed'
            });
        }
        );
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
    );
};

exports.users_signup = (req,res,next) => {
    bcrypt.hash(req.body.password,10,(err,hash) => {
        if(err){
            return res.status(500).json({
                error: err
            });
        }else{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
                });
            user.save().then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'User created',
                    createdUser: {
                        _id: result._id,
                        email: result.email,
                        password: result.password
                    }
                });
            }
            ).catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            }
            );
        }
    });
};