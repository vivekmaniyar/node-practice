const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/gethello',(req,res)=>{
    res.json({
        message: 'Hello NodeJS!!'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});