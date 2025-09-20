import React from "react";
import axios from "axios";
import { Table, Container, Button, Spinner, Alert } from "react-bootstrap";

const baseUrl = "https://68ce761d6dc3f350777f0bfa.mockapi.io/crud";

const HomePage = () => {
  const [employees, setEmployees] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

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
                      <Button variant="secondary">Edit</Button>
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
    </Container>
  );
};

export default HomePage;
