//List product and records and insert new records with image upload
const Product = require('../Models/product');
const mongoose = require('mongoose');

module.exports.addProduct = function (req, res) {
    var product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.file.originalname;
    product.category = req.body.category;
    product.save(function (err, doc) {
        if (!err) {
            //redirect to list of products
            res.redirect('/');
        }
        else {
            if (err.name == 'ValidationError') {
                res.render("addproduct", {
                    viewTitle: "Insert Product",
                    product: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

module.exports.showProduct = function (req, res) {
    Product.find(function (err, docs) {
        if (!err) {
            res.render("showproducts", {
                products: docs
            });
        }
        else {
            console.log('Error in retrieving product list :' + err);
        }
    });
}
