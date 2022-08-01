const express = require('express');
const app = express();
const connection = require('./connection');
const promise = require('util');
const path = require('path');

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Database connected!');
});

const promisequery = promise.promisify(connection.query).bind(connection);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/getdata', (req, res) => {
    const result = promisequery('SELECT * FROM employee');
    result.then(function(rows) {
        res.json(rows);
    }
    ).catch(function(err) {
        console.log('Error: ', err);
    }
    );
});

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/addemployee',(req,res)=>{
    const {Name, Designation, Salary} = req.body;
    const result = promisequery('INSERT INTO employee (Name,Designation,Salary) VALUES (?,?,?)',[Name,Designation,Salary]);
    result.then(function(rows) {
        res.redirect('/');
    }
    ).catch(function(err) {
        console.log('Error: ', err);
    }
    );
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});