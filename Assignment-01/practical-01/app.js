const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('name');
});

app.post('/', (req, res) => {
    res.render('static', { name: req.body.name });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
