const express = require('express');
const Category = require('../controllers/Category.controller');
const router = express.Router();

router.route('/')
    .post(Category.createCategory)
    .get(Category.findAllCategories)
    .delete(Category.deleteAllCategories)
router.route('/:id')
    .get(Category.findOneCategory)
    .put(Category.updateCategory)
    .delete(Category.deleteOneCategory)

module.exports = router;