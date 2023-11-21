const Order = require('../models/Order.model');


const createOrder = async (req, res) => {
  try {
    // Assuming req.body contains the necessary data for creating an order
    const { customer, cart, total } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      customer,
      cart,
      total,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const findAllOrders = async (req, res) => {
  try {
    // Retrieve all orders from the database
    const allOrders = await Order.find().populate('customer').populate({
      path: 'cart',
      populate: {
        path: 'product', 
        model: 'Product', 
      }})
    res.status(200).json(allOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const findOneOrder = async (req, res) => {
  try {
    // Assuming req.params.id contains the order ID you want to find
    const orderId = req.params.id;

    // Find the order by ID and populate the 'customer' and 'cart' fields
    const foundOrder = await Order.findById(orderId)
      // .populate('customer')
      // .populate({
      //   path: 'cart',
      //   populate: {
      //     path: 'product',
      //     model: 'Product',
      //   },
      // });

    if (!foundOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(foundOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const deleteOneOrder = async (req, res) => {
  try {
    // Assuming req.params.id contains the order ID you want to delete
    const orderId = req.params.id;

    // Find the order by ID and delete it
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {createOrder,findAllOrders,findOneOrder,deleteOneOrder};
