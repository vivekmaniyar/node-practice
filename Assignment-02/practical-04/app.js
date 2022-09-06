const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const Usercontroller = require('./Controllers/Usercontroller');
const Studentcontroller = require('./Controllers/Studentcontroller');
const cookieParser = require('cookie-parser');
const config = require('./config');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.set('view engine', 'ejs');

mongoose.connect(config.database, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

//Users
app.get('/', Usercontroller.login_page);
app.post('/login', Usercontroller.user_login);
app.get('/logout', Usercontroller.user_logout);
app.get('/register', Usercontroller.register_page);
app.post('/register', Usercontroller.user_register);

//allow CRUD operations on students only if the user is logged in
app.use((req, res, next) => {
    let token = req.cookies.token;
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: 'Token is not valid' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({ success: false, message: 'Auth token is not supplied' });
    }
});

//Students
app.get('/students', Studentcontroller.get_all_students);
app.get('/students/:id', Studentcontroller.get_student_details);
app.get('/addstudent', Studentcontroller.add_student_page);
app.post('/students', Studentcontroller.add_student);
app.get('/updatestudent/:id', Studentcontroller.update_student_page);
app.put('/students/:id', Studentcontroller.update_student);
app.get('/deletestudent/:id', Studentcontroller.delete_student_page);
app.delete('/students/:id', Studentcontroller.delete_student);

app.listen(port, () => {
    console.log('Server started on port ' + port);
});