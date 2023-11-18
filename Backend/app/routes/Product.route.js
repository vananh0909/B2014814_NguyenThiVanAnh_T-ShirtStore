const express = require('express');
const router = express.Router();
const productController = require('../controllers/Product.controller');
const {
    uploadImages
} = require("../middlewares/uploads/upload-img");

router.route('/')
    // .post(productController.createProduct)
    .post(uploadImages("images"), productController.createProduct)
    .get(productController.findAllProducts)
    .delete(productController.deleteAllProducts)
router.route('/:id')
    .get(productController.findOneProduct)
    .put(uploadImages("images"), productController.update)
    .delete(productController.deleteOneProduct)

module.exports = router;