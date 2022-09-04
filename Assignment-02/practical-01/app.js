const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const options = multer.diskStorage({
    destination: (req,file,cb) => {
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            cb(new Error('Only JPEGs and PNGs are allowed'),false);
        }
        else{
            cb(null,'./uploads');
        }
    },
    filename: (req,file,cb) => {
        cb(null,(Math.random().toString(30)).split(5,10) + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: options});


app.set('view engine','ejs');
app.set('views','./');
app.get('/',(req,res) => {
    res.render('file-form');
});

app.post('/fileupload',upload.single('file'),(req,res) => {
    res.send('File uploaded successfully');
});

app.post('/multifileupload',upload.array('file[]',2),(req,res) => {
    res.send('Files uploaded successfully');
});

app.listen(3000);