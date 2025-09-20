import React from "react";
import axios from "axios";
import { Table, Container, Button, Spinner, Alert, Modal, Form } from "react-bootstrap";

const baseUrl = "https://68ce761d6dc3f350777f0bfa.mockapi.io/crud";

const HomePage = () => {
  const [employees, setEmployees] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);
  const [currentEmployee, setCurrentEmployee] = React.useState(null);
  const [formData, setFormData] = React.useState({ name: "", email: "", user_name: "" });
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true)
    axios
      .get(baseUrl)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete=async(id)=>{
     try{
      await axios.delete(`${baseUrl}/${id}`)
      setSuccess(true)
      setTimeout(()=>{
        setSuccess(false)
      },3000)
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
     }catch (err){
        console.log("Deletion Not Done:" ,err)
     }
  }

    const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      user_name: employee.user_name,
    });
    setShowModal(true);
  };

    const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

    const handleSave = async () => {
    if (!currentEmployee) return;
    setSaving(true);
    try {
      await axios.put(`${baseUrl}/${currentEmployee.id}`, formData);
      // Update state locally without refetching
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === currentEmployee.id ? { ...emp, ...formData } : emp
        )
      );
      setShowModal(false);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSaving(false);
    }
  };


  return (
    <Container className="tableContainer">
      {success && <Alert variant="success">Record Deleted Successfully</Alert>}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "300px" }}
        >
          <Spinner animation="border" role="status" variant="primary" size="lg">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees && employees.length > 0?
               employees.map((employee) =>(
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.user_name}</td>
                    <td>{employee.email}</td>
                    <td>
                      <Button onClick={()=>handleEdit(employee)} variant="secondary">Edit</Button>
                    </td>
                    <td>
                      <Button onClick={()=>handleDelete(employee.id)} variant="danger">Delete</Button>
                    </td>
                  </tr>
                )
              )
            : (
               <tr>
                <td colSpan="5">No record found!</td>
              </tr>
            )
          }
          </tbody>
        </Table>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? <Spinner size="sm" animation="border" /> : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HomePage;
