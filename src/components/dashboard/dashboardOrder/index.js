import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AdminSelecor } from 'redux/selector/AdminSelector';

function DashboardOrders(props) {
    //Data
    const Orders = useSelector(AdminSelecor.Orders);
   
    return (
        <div id='dashboardOrders'>
            <div className='hearder_99'>
                <h1>Danh sách đơn hàng</h1>
            </div>
            <div className='table_orders'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default DashboardOrders;