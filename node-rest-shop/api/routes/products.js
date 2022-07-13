const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/products');
const multer = require('multer');
const CheckAuth = require('../Middleware/check-auth');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./images/');
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

router.get('/',ProductController.products_get_all);

router.get('/:productId',ProductController.products_get_product);

router.post('/',CheckAuth,upload.single('productImage'),ProductController.products_create_product);

router.patch('/:productId',CheckAuth,ProductController.products_update_product);

router.delete('/:productId',CheckAuth,ProductController.products_delete_product);

module.exports = router;