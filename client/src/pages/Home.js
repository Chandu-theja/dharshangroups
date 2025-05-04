import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Navbar, Nav, Link } from 'react-bootstrap';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API (for future use)
    axios.get('http://143.244.140.159:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    // Fallback to dummy data for 12 clothing items
    if (products.length === 0) {
      const dummyProducts = [
        { _id: 1, name: 'Suit 1', price: 5000, image: '/placeholder_suit1.jpg' },
        { _id: 2, name: 'Suit 2', price: 5200, image: '/placeholder_suit2.jpg' },
        { _id: 3, name: 'Suit 3', price: 4800, image: '/placeholder_suit3.jpg' },
        { _id: 4, name: 'Suit 4', price: 5500, image: '/placeholder_suit4.jpg' },
        { _id: 5, name: 'Pants 1', price: 1200, image: '/placeholder_pants1.jpg' },
        { _id: 6, name: 'Pants 2', price: 1300, image: '/placeholder_pants2.jpg' },
        { _id: 7, name: 'Pants 3', price: 1150, image: '/placeholder_pants3.jpg' },
        { _id: 8, name: 'Pants 4', price: 1400, image: '/placeholder_pants4.jpg' },
        { _id: 9, name: 'Suit 5', price: 6000, image: '/placeholder_suit5.jpg' },
        { _id: 10, name: 'Suit 6', price: 5800, image: '/placeholder_suit6.jpg' },
        { _id: 11, name: 'Pants 5', price: 1250, image: '/placeholder_pants5.jpg' },
        { _id: 12, name: 'Pants 6', price: 1350, image: '/placeholder_pants6.jpg' },
      ];
      setProducts(dummyProducts);
    }
  }, []);

  return (
    <Container className="my-5">
      <h1 className="header-title">Dharshan Groups</h1>
      <Row>
        {products.map(product => (
          <Col md={3} key={product._id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => (e.target.src = '/placeholder.jpg')}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-success">₹{product.price}</Card.Text>
                <Button variant="primary" href="/checkout">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="link" href="/tailoring">Visit Tailoring Section</Button>
    </Container>
  );
};

export default Home;
