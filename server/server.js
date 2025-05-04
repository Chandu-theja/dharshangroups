const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const tailoringRoutes = require('./routes/tailoring');
const orderRoutes = require('./routes/orders');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());

// Database connection with detailed logging
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
      console.error('MongoDB connection failed:', err.message);
      setTimeout(connectWithRetry, 5000); // Retry every 5 seconds
    });
};

connectWithRetry();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tailoring', tailoringRoutes);
app.use('/api/orders', orderRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
