import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Form, Button, Alert } from 'react-bootstrap';

const Tailoring = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [pantHeight, setPantHeight] = useState('');
  const [pantWidth, setPantWidth] = useState('');
  const [measurements, setMeasurements] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Fetch shops near Tirupati (dummy data for now)
    const tirupatiShops = [
      { id: 'shop1', name: 'Sri Tailors', address: 'Rly Kodur, Tirupati, AP', distance: '1km' },
      { id: 'shop2', name: 'Venkat Tailoring', address: 'TP Area, Tirupati, AP', distance: '2km' },
      { id: 'shop3', name: 'Lakshmi Stitch', address: 'Balaji Colony, Tirupati, AP', distance: '3km' },
    ];
    setShops(tirupatiShops);
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please log in to request tailoring');
      return;
    }
    try {
      const measurementText = `Waist: ${waist}, Neck: ${neck}, Pant Height: ${pantHeight}, Pant Width: ${pantWidth}`;
      await axios.post('http://143.244.140.159:5000/api/tailoring/request', {
        userId: localStorage.getItem('userId') || 'guest',
        shopId,
        measurements: measurementText,
      });
      setSuccess('Tailoring request sent!');
      setError('');
      setShopId('');
      setWaist('');
      setNeck('');
      setPantHeight('');
      setPantWidth('');
    } catch (err) {
      setError('Failed to send request');
      setSuccess('');
      console.error(err);
    }
  };

  if (!isAuthenticated) return null; // Redirect handled by useEffect

  return (
    <Container className="my-5">
      <h1 className="header-title">DD Tailoring Services</h1>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <h3 className="mb-4">Tailoring Shops near Tirupati</h3>
      <ListGroup className="mb-4">
        {shops.map(shop => (
          <ListGroup.Item
            key={shop.id}
            active={shopId === shop.id}
            onClick={() => setShopId(shop.id)}
            style={{ cursor: 'pointer' }}
          >
            <h5>{shop.name}</h5>
            <p className="mb-0">{shop.address} ({shop.distance})</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Waist (in inches)</Form.Label>
          <Form.Control
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Neck (in inches)</Form.Label>
          <Form.Control
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pant Height (in inches)</Form.Label>
          <Form.Control
            type="number"
            value={pantHeight}
            onChange={(e) => setPantHeight(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pant Width (in inches)</Form.Label>
          <Form.Control
            type="number"
            value={pantWidth}
            onChange={(e) => setPantWidth(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!shopId}>Request Tailoring</Button>
      </Form>
    </Container>
  );
};

export default Tailoring;
