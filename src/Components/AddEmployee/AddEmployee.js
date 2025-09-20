import React from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
const AddEmployee = () => {
  const [formData, setFormData]= React.useState({"name":'',"email":'',"user_name":''})
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");
  const handlechange=(e)=>{
    console.log(e.target.value)
    setFormData((prev)=>{
      return{...prev,[e.target.name]:e.target.value}
    })
}

const baseUrl="https://68ce761d6dc3f350777f0bfa.mockapi.io/crud"

const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    console.log(formData)
     try {
      const response = await axios.post(baseUrl, formData);
      console.log("Response:", response.data);
      setSuccess(true);
      setFormData({ name: "", email: "", user_name: "" });
      setTimeout(()=>{
        setSuccess(false)
      },3000)
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
}

  return (
    <Container style={{maxWidth: "600px"}} className='formContainer d-flex justify-content-center align-items-center'>
      <div className='formBox'>
      <div style={{display:"flex", alignItems:"center",justifyContent:"center",fontSize:"30px"}}>Add Employee Form</div>
      {success && <Alert variant="success">Employee added successfully!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formName'>
          <Form.Label> Name </Form.Label>
          <Form.Control
          name="name"
          type="text"
          placeholder='Name'
          value={formData.name}
          onChange={handlechange}
          required
          />
          <Form.Label> Email </Form.Label>
          <Form.Control
          name="email"
          type="text"
          placeholder='Email'
          value={formData.email}
          onChange={handlechange}
          required
          />
          <Form.Label> UserName </Form.Label>
          <Form.Control
          name="user_name"
          type="text"
          placeholder='UserName'
          value={formData.user_name}
          onChange={handlechange}
          required
          />
        </Form.Group>
        <div className="d-flex justify-content-center">

         <Button className='submitButton' variant="primary" type="submit">
          {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
        </Button>
        </div>
      </Form>
      </div>
    </Container>
  )
}

export default AddEmployee