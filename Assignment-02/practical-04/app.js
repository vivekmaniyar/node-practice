//JWT login with express
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const config = require('./config');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(config.database, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/register', (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save((err) => {
        if (err) {
            res.json({ success: false, message: 'Could not save user. Error: ', err });
        } else {
            res.json({ success: true, message: 'User saved!' });
        }
    });
});

app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'User not found' });
        } else if (user) {
            let validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({ success: false, message: 'Wrong password' });
            } else {
                let token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                res.json({ success: true, message: 'Success!', token: token, user: { name: user.name } });
            }
        }
    });
});

app.get('/profile', (req, res) => {
    res.send('Profile');
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});