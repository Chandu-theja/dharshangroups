const express = require('express');
const Tailoring = require('../models/Tailoring');
const router = express.Router();

const tailoringShops = [
  { id: 'shop1', name: 'Shop 1', address: '123 Street, City', distance: '2km' },
  { id: 'shop2', name: 'Shop 2', address: '456 Road, City', distance: '3km' },
];

router.get('/shops', (req, res) => {
  res.json(tailoringShops);
});

router.post('/request', async (req, res) => {
  const { userId, shopId, measurements } = req.body;
  try {
    const tailoring = new Tailoring({ userId, shopId, measurements });
    await tailoring.save();
    res.json(tailoring);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
