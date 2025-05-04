import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://143.244.140.159:5000/api/auth/register', {
        name, email, password, role: 'user',
      });
      setShowSuccess(true);
    } catch (err) {
      setError(`Registration failed: ${err.response?.data?.msg || err.message}`);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    window.location.href = '/login';
  };

  return (
    <Container className="my-5" style={{ maxWidth: '500px', background: 'linear-gradient(to bottom right, #3498db, #f1c40f)', padding: '2rem', borderRadius: '10px' }}>
      <h1 className="header-title text-white">Join Dharshan Groups</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: '#3498db', borderColor: '#3498db' }}>Register</Button>
      </Form>
      <Button variant="link" href="/login" className="d-block mt-3 text-white">Already have an account? Login</Button>

      <Modal show={showSuccess} onHide={handleCloseSuccess} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Registration completed! Redirecting to login...</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccess}>OK</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Register;
