import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import { getData } from "../../api/Employee_api";


import {
  Table,
  Container,
  Button,
} from "react-bootstrap";
import EditEmployeeModal from "../Modals/EditEmployeeModal";
import DeleteEmployeeModal from "../Modals/DeleteEmployeeModal";

const HomePage = () => {
  const [employees, setEmployees] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [currentEmployee, setCurrentEmployee] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    user_name: "",
  });

  React.useEffect(() => {
    getData(setLoading, setEmployees);
  }, []);

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      user_name: employee.user_name,
    });
    setShowModal(true);
  };

   const handleDeleteClick = (employee) => {
    setCurrentEmployee(employee);
    console.log("this is test",employee)
    setShowDeleteModal(true);
  };

  return (
    <Container  className="tableContainer overflow-x-scroll">
      <ToastContainer />
      {loading ? (
        <Table striped bordered hover className="text-center">
    <thead>
      <tr>
        <th>Name</th>
        <th>UserName</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {[...Array(5)].map((_, idx) => (
        <tr key={idx}>
          <td>
            Loading...
          </td>
          <td>
            <div className="placeholder-glow">
              <span className="placeholder col-6"></span>
            </div>
          </td>
          <td>
            <div className="placeholder-glow">
              <span className="placeholder col-8"></span>
            </div>
          </td>
          <td>
            <div className="placeholder-glow d-flex justify-content-center gap-2">
              <span className="placeholder btn btn-secondary col-4"></span>
              <span className="placeholder btn btn-danger col-4"></span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
      ) : (
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees && employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.user_name}</td>
                  <td>
                    {employee.email}
                  </td>
                  <td>
                    <div style={{display:"flex", gap:7, justifyContent:"center"}}>
                    <Button
                      onClick={() => handleEdit(employee)}
                      variant="secondary"
                    >
                      <FaEdit className="d-sm-none" />{" "}
                      <span className="d-none d-sm-inline">Edit</span>
                    </Button>
                    <Button
                      // onClick={() => handleDelete(employee.id, setEmployees,  showDeleteModal, setShowDeleteModal, employee)}
                      onClick={()=>handleDeleteClick(employee)}
                      variant="danger"
                    >
                      <FaTrash className="d-sm-none" />
                      <span className="d-none d-sm-inline">Delete</span>
                    </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No record found!</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
      <EditEmployeeModal showModal={showModal} setShowModal={setShowModal} formData={formData} setFormData={setFormData} currentEmployee={currentEmployee} setEmployees={setEmployees} />
      <DeleteEmployeeModal showDeleteModal={showDeleteModal}  setShowDeleteModal={setShowDeleteModal} currentEmployee={currentEmployee} setEmployees={setEmployees}/>
     
    </Container>
  );
};

export default HomePage;
