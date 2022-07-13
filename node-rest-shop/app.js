const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRouter = require('./api/routes/products');
const OrderRouter = require('./api/routes/orders');
const UserRouter = require('./api/routes/users');

// Connect to MongoDB
mongoose.connect('mongodb+srv://vivekmaniyar:'+ process.env.MONGO_ATLAS_PASSWORD +'@cluster0.dnrmtr3.mongodb.net/?retryWrites=true&w=majority');

// middleware for logging
app.use(morgan('dev'));
// middleware for image upload
app.use('/images', express.static('images'));
// middleware for parsing the body of the request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Header to allow cross-origin requests
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//API Routes
app.use('/products',productRouter);
app.use('/orders',OrderRouter);
app.use('/users',UserRouter);

//Error handling
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;