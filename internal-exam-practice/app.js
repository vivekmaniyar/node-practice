const express = require('express');
const app = express();
const multer = require('multer');
//allow only images
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};
const upload = multer({storage: storage, fileFilter: fileFilter});
const ProductController = require('./Controllers/productscontroller');
const mongoose = require('mongoose');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/ProductsDB', (err) => {
    if (!err) {
        console.log('MongoDB connection succeeded.');
    }
    else {
        console.log('Error in DB connection : ' + err);
    }
});

app.set('view engine', 'ejs');

app.use(express.static('uploads'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', ProductController.showProduct);

app.get('/addproduct', function (req, res) {
    res.render('addproduct');
});

app.post('/addproduct', upload.single('productImage'), ProductController.addProduct);

app.listen(3000, function () {
    console.log('Server started at port 3000');
});

