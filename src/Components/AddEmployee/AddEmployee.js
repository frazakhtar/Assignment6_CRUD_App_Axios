import React from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
   const navigate = useNavigate();
  const notify =()=>toast("User Added Successfully")
  const [formData, setFormData] = React.useState({ name: '', email: '', user_name: '' });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const baseUrl = 'https://68ce761d6dc3f350777f0bfa.mockapi.io/crud';

  const handlechange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(baseUrl, formData);
      notify();
      setFormData({ name: '', email: '', user_name: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
      navigate("/")
    }
  };

  return (
    <Container
      className="p-3 d-flex justify-content-center align-items-center"
    >
       <ToastContainer />
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Add Employee</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handlechange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handlechange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formUserName">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              name="user_name"
              type="text"
              placeholder="UserName"
              value={formData.user_name}
              onChange={handlechange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="w-100">
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddEmployee;
