const express = require('express');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/', async (req, res) => {
  const { userId, products, totalAmount } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      razorpayOrderId: order.id,
    });
    await newOrder.save();
    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
