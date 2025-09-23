import {
  Button,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "https://68ce761d6dc3f350777f0bfa.mockapi.io/crud";

const EditEmployeeModal = ({showModal, setShowModal, formData, setFormData, currentEmployee, setEmployees}) => { 
    const notifyUpdate=()=>toast("User Updated Successfully")
    const [saving, setSaving] = useState(false);
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
    const handleSave = async () => {
        console.log("current Employee", currentEmployee)
    if (!currentEmployee) return;
    setSaving(true);
    try {
      await axios.put(`${baseUrl}/${currentEmployee.id}`, formData);
      console.log("update done")
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === currentEmployee.id ? { ...emp, ...formData } : emp
        )
      );
      notifyUpdate();
      setShowModal(false);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSaving(false);
    }
  };
    

  return (
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
          <Button variant="primary" onClick={()=>handleSave()} disabled={saving}>
            {saving ? <Spinner size="sm" animation="border" /> : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default EditEmployeeModal