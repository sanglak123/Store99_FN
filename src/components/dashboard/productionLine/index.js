import { ApiAdmins } from '@/callApi/admin';
import { ApiData } from '@/callApi/data';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';
import { LoadDataSuccess } from 'redux/slice/DataSlice';

function DashboardProductionLines(props) {
    const dispatch = useDispatch();
    //Data
    const Data = useSelector(DataSelector.Data);

    const Trademarks = Data?.Trademarks;

    const ProductLines = Data?.ProductLines;


    const [idTrade, setIdTrade] = useState(1);
    const [ProductionLineRender, setProductionLineRender] = useState([]);
    useEffect(() => {
        const list = ProductLines?.filter((line) => line.idTradeMark === idTrade);
        setProductionLineRender(list);
    }, [idTrade, Data]);

    //Add
    const [nameProductiontLine, setNameProductionLine] = useState("");
    const [linkProductionLine, setLinkProductionLine] = useState("");

    const handleAddProductionLine = async () => {
        await ApiAdmins.ProductionLines.Add(nameProductiontLine, idTrade, linkProductionLine);
        setLinkProductionLine("");
        setNameProductionLine("");
        await ApiData.GetData(dispatch, LoadDataSuccess);
    }
    //Delete
    const handleDeleteProductLine = async (id) => {
        await ApiAdmins.ProductionLines.Delete(id);
        await ApiData.GetData(dispatch, LoadDataSuccess);
    }
    //Edit
    const [edit, setEdit] = useState("");
    const [name, setName] = useState("");
    const [href, setHref] = useState("");

    const handlerEditProductLine = async (id) => {
        await ApiAdmins.ProductionLines.Edit(id, name, href);
        await ApiData.GetData(dispatch, LoadDataSuccess);
    };

    return (
        <div id='dashboard_production_line'>

            <div className='production_line_trademarks d-flex justify-content-center align-items-center'>
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

            <div className='add_product_line mt-5 mb-5'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Dòng Sản Phẩm</Form.Label>
                        <Form.Control type="text" placeholder="Dòng sản phẩm" onChange={(e) => setNameProductionLine(e.target.value)} value={nameProductiontLine} />
                        {
                            nameProductiontLine === "" &&
                            <Form.Text className="text-danger">
                                Dòng sản phẩm không được để trống.
                            </Form.Text>
                        }

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Link Sản Phẩm</Form.Label>
                        <Form.Control type="text" placeholder="Link sản phẩm" onChange={(e) => setLinkProductionLine(e.target.value)} value={linkProductionLine} />

                        {
                            linkProductionLine === "" &&
                            <Form.Text className="text-danger">
                                Link sản phẩm không được để trống.
                            </Form.Text>
                        }
                    </Form.Group>

                    <Button variant="primary" type="button" disabled={nameProductiontLine === "" && linkProductionLine === ""} onClick={() => handleAddProductionLine()}>
                        Add
                    </Button>
                </Form>
            </div>

            <div className='productions_render'>
                <Table striped bordered hover size="sm">
                    <thead className='txt_center'>
                        <tr className='txt_white'>
                            <th>#</th>
                            <th>Dòng Sản Phẩm</th>
                            <th>Link</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody className='txt_center'>
                        {
                            ProductionLineRender?.map((line, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='txt_white'>{index + 1}</td>
                                        <td className='txt_white'>
                                            {
                                                edit === line.name ?
                                                    <InputGroup className="mb-3">
                                                        <Form.Control
                                                            placeholder="Dòng sản phẩm"
                                                            aria-label="name"
                                                            aria-describedby="basic-name"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            autoFocus
                                                        />
                                                    </InputGroup>
                                                    :
                                                    line.name
                                            }
                                        </td>
                                        <td className='txt_white'>
                                            {
                                                edit === line.name ?
                                                    <InputGroup className="mb-3">
                                                        <Form.Control
                                                            placeholder="Link sản phẩm"
                                                            aria-label="link"
                                                            aria-describedby="basic-link"
                                                            value={href}
                                                            onChange={(e) => setHref(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                    :
                                                    line.href
                                            }
                                        </td>
                                        <td>
                                            {
                                                edit === line.name ?
                                                    <ButtonGroup aria-label="Basic example">
                                                        <Button onClick={() => handlerEditProductLine(line.id)} variant="outline-success">Save</Button>
                                                        <Button onClick={() => setEdit("")} variant="outline-danger">Cancle</Button>
                                                    </ButtonGroup>
                                                    :
                                                    <ButtonGroup aria-label="Basic example">
                                                        <Button onClick={() => {
                                                            setEdit(line.name);
                                                            setName(line.name);
                                                            setHref(line.href);
                                                        }} variant="outline-warning">Edit</Button>
                                                        <Button onClick={() => handleDeleteProductLine(line.id)} variant="outline-danger">Delete</Button>
                                                    </ButtonGroup>
                                            }

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default DashboardProductionLines;