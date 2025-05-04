import React from 'react';
import axios from 'axios';
import { Container, Button, Alert } from 'react-bootstrap';

const Checkout = () => {
  const [error, setError] = React.useState('');

  const handlePayment = async () => {
    try {
      const { data } = await axios.post('http://143.244.140.159:5000/api/orders', {
        userId: localStorage.getItem('userId') || 'guest',
        products: [{ productId: 'sample_product', quantity: 1 }],
        totalAmount: 1000,
      });

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        const options = {
          key: data.key,
          amount: 1000 * 100,
          currency: 'INR',
          order_id: data.orderId,
          handler: function (response) {
            alert('Payment successful!');
            console.log(response);
          },
          prefill: {
            name: 'Test User',
            email: 'test@example.com',
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (err) {
      setError('Failed to initiate payment');
      console.error(err);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: '500px' }}>
      <h1 className="header-title">DD Checkout</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={handlePayment} className="w-100">Pay Now</Button>
    </Container>
  );
};

export default Checkout;
