import { Button, Modal } from "react-bootstrap";
import { handleDelete } from "../../api/Employee_api";

const DeleteEmployeeModal = ({showDeleteModal, setShowDeleteModal, currentEmployee, setEmployees}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <>Are you sure to want to delete ??</>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={()=>handleDelete(currentEmployee.id, setEmployees, setShowDeleteModal )}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEmployeeModal;
