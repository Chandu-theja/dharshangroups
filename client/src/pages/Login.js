import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://143.244.140.159:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);
      if (res.data.user.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/home';
      }
    } catch (err) {
      setError(`Login failed: ${err.response?.data?.msg || err.message}`);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: '500px', background: 'linear-gradient(to bottom right, #3498db, #f1c40f)', padding: '2rem', borderRadius: '10px' }}>
      <h1 className="header-title text-white">Login to Dharshan Groups</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: '#3498db', borderColor: '#3498db' }}>Login</Button>
      </Form>
      <Button variant="link" href="/register" className="d-block mt-3 text-white">Need an account? Signup</Button>
    </Container>
  );
};

export default Login;
