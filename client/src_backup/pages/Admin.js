import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';

const Admin = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://143.244.140.159:5000/api/auth/verify-admin', { token })
        .then(res => {
          if (res.data.role === 'admin') setShowLogin(false);
        })
        .catch(() => setShowLogin(true));
    }
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://143.244.140.159:5000/api/auth/login', { email: adminEmail, password: adminPassword });
      if (res.data.user.role === 'admin') {
        localStorage.setItem('token', res.data.token);
        setShowLogin(false);
      } else {
        setError('Admin access denied');
      }
    } catch (err) {
      setError('Invalid admin credentials');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('image', image);

    try {
      await axios.post('http://143.244.140.159:5000/api/products', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Product added successfully!');
      setError('');
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setStock('');
      setImage(null);
    } catch (err) {
      setError('Failed to add product');
      setSuccess('');
      console.error(err);
    }
  };

  if (showLogin) {
    return (
      <Container className="my-5" style={{ maxWidth: '500px' }}>
        <h1 className="header-title">Admin Login</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleAdminLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <h1 className="header-title">DD Admin Panel</h1>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">Add Product</Button>
      </Form>
    </Container>
  );
};

export default Admin;
