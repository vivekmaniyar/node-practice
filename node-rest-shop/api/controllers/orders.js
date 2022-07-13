const mongoose = require('mongoose');
const order = require("../Models/order");
const Order = require('../Models/order');
const Product = require('../Models/product');

exports.orders_get_all = (req,res,next) => {
    Order.find()
    .select('product quantity _id')
    .populate('product','_id name price')
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
};

exports.orders_get_order = (req,res,next) => {
    order.findById(req.params.OrderId)
    .populate('product','_id name price')
    .select('product quantity _id')
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                order: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            });
        }else{
            res.status(404).json({message: 'Order not found'});
        }
    }
    ).catch(err =>{
        res.status(500).json({error: err});
    }
    );
};

exports.orders_create_order = (req,res,next) => {
    Product.findById(req.body.productId)
    .then(product => {
        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            });
        }
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });
        return order.save();
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Order stored',
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' + result._id
            }
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
};

exports.orders_delete_order = (req,res,next) => {
    order.remove({_id: req.params.OrderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/orders',
                body: {productId: 'ID', quantity: 'Number'}
            }
        });
    }
    ).catch(err =>{
        res.status(500).json({error: err});
    }
    );
};