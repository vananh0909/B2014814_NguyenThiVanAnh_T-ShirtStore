const express = require('express');
const Order = require('../controllers/Order.controller');
const router = express.Router();

router.route('/')
    .post(Order.createOrder)
    .get(Order.findAllOrders)
router.route('/:id')
    .get(Order.findOneOrder)
    .delete(Order.deleteOneOrder)

module.exports = router;