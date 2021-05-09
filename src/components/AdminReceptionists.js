import React from 'react';
import receptionists from '../shared/receptionists';
import {Table} from 'reactstrap';

function AdminReceptionists() {
    return (
        <>
            <br />
            <Table className="col-md-8 offset-md-2">
                <thead>
                    <tr>
                        <th>receptionists id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {receptionists.map((receptionist) => {
                        return (
                        <tr>
                            <td>{receptionist.id}</td>
                            <td>{receptionist.name}</td>
                            <td>{receptionist.email}</td>
                            <td><span class="fa fa-trash"></span></td>
                        </tr>
                        )
                    })}
                    
                </tbody>
            </Table>
            <br />
        </>
    )
}

export default AdminReceptionists
