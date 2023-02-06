import ModalAddTypePhone from '@/components/modal/AddTypePhone';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';

function DashboardTypePhones(props) {
    const Data = useSelector(DataSelector.Data);
    const ProductLines = Data?.ProductLines;
    const Trademarks = Data?.Trademarks;
    const TypePhones = Data?.TypePhones;

    const [idTrade, setIdTrade] = useState(1);
    const listProductLineRender = ProductLines.filter(line => line.idTradeMark === idTrade);
    const [idProductLine, setIdProductLine] = useState(1);

    //Modal
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        setIdProductLine(listProductLineRender[0].id)
    }, [idTrade]);

    const listTypePhoneRender = TypePhones.filter(typephone => typephone.idProductLine === idProductLine)
   
    return (
        <div id='dashboard_type_phone'>
            <Button onClick={() => setModalShow(true)} variant='outline-primary' className='btn_modal_add_typephone'>+</Button>
            <div className='logo d-flex justify-content-center align-items-center'>
                {
                    Trademarks?.map((trade, index) => {
                        return (
                            <div key={index} className='trade_item me-2 ms-2' onClick={() => setIdTrade(trade.id)}>
                                <img src={trade.logo} className={idTrade === trade.id ? "img-fluid img_active" : "img-fluid"} />
                            </div>

                        )
                    })
                }
            </div>
            <hr />
            <div className='product_line'>
                <ul>
                    {
                        listProductLineRender?.map((line, index) => {
                            return (
                                <li key={index} onClick={() => setIdProductLine(line.id)} className={idProductLine === line.id ? "li_active" : ""}>
                                    {line.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <hr />
            <div className='type_phone_render'>
                <Table striped bordered hover size="sm">
                    <thead className='txt_center'>
                        <tr>
                            <th>#</th>
                            <th>Loại sản phẩm</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='txt_center'>
                        {
                            listTypePhoneRender?.map((typephone, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="">{index + 1}</td>
                                        <td className="">{typephone.name}</td>
                                        <td className="">
                                            <ButtonGroup aria-label="Basic example">
                                                <Button variant="outline-warning">Edit</Button>
                                                <Button variant="outline-danger">Delete</Button>
                                            </ButtonGroup>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <ModalAddTypePhone
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}

export default DashboardTypePhones;