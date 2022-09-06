const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.login_page = (req, res) => {
    //render login page
    res.render('login');
};

module.exports.register_page = (req, res) => {
    res.render('register');
};

module.exports.user_login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'User not found' });
        } else if (user) {
            let validPassword = bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    let token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                    //saving token to the cookie for the user and redirecting to student page
                    res.cookie('token', token, { maxAge: 900000, httpOnly: true });
                    //redirect to student HTML page
                    res.redirect('/student.html');
                    //res.json({ success: true, message: 'Success!', token: token, user: { email: user.email } });
                } else {
                    res.json({ success: false, message: 'Invalid password' });
                }
            });
        }
    });
};

module.exports.user_logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

module.exports.user_register = (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        //hash the password
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save((err) => {
        if (err) {
            res.json({ success: false, message: 'Could not save user. Error: ', err });
        } else {
            res.redirect('/');
        }
    });
};