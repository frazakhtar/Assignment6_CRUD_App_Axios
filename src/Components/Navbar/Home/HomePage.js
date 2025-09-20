import React from 'react'
import {Table, Container} from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className='tableContainer'>
        <Table striped bordered hover>
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
                <tr>
                    <td>Akhtar</td>
                    <td>Akt</td>
                    <td>akhtar12@gmail.com</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            </tbody>
        </Table>
    </Container>
  )
}

export default HomePage