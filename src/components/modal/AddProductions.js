
import { ApiAdmins } from '@/callApi/admin';
import { ApiData } from '@/callApi/data';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';
import { LoadDataSuccess } from 'redux/slice/DataSlice';

function ModalAddProductions({ onHide, show, idTrade, idProductLine }) {
    const dispatch = useDispatch();
    //Data
    const Data = useSelector(DataSelector.Data);
    const Trademarks = Data?.Trademarks;
    const ProductLines = Data?.ProductLines;
    const TypePhones = Data?.TypePhones;

    //Propeties
    const Colors = Data?.Colors;
    const [idColor, setIdColor] = useState("");
    const Memmorys = Data?.Memmorys;
    const [idMem, setIdMem] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [prepay, setPrepay] = useState("");
    const [photo, setPhoto] = useState("");
    const [count, setCount] = useState("");

    const trade = Trademarks?.find(trade => trade.id === idTrade);
    const product_line = ProductLines?.find((line => line.id === idProductLine))
    const TypePhoneRender = TypePhones?.filter(type => type.idProductLine === idProductLine);

    const [idTypePhone, setIdTypePhone] = useState("");

    const handlerAddProduct = async () => {
        await ApiAdmins.Productions.Add(photo, idTypePhone, idMem, idColor, price, prepay, discount, count);
        await ApiData.GetData(dispatch, LoadDataSuccess)
        onHide();
    }

    // console.log(Memmorys)

    return (
        <div>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                className='txt_black'
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {trade?.name.toUpperCase()} - {product_line?.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='type_phone'>
                        <h4>Sản Phẩm</h4>
                        <div className='type_phone_render d-flex justify-content-between align-items-center'>
                            {
                                TypePhoneRender?.map((type, index) => {
                                    return (
                                        <Form.Check
                                            key={index}
                                            type={"checkbox"}
                                            label={type.name}
                                            checked={idTypePhone === type.id}
                                            onChange={() => setIdTypePhone(type.id)}
                                        />

                                    )
                                })
                            }
                        </div>
                    </div>
                    <hr />
                    <div className='propeties'>
                        <h4>Thuộc Tính</h4>
                        <Row>
                            <Col>
                                <div className='propeties_colors'>
                                    <Form.Select onChange={(e) => setIdColor(e.target.value)}>
                                        <option>Choose color</option>
                                        {
                                            Colors?.map((type, index) => {
                                                return (
                                                    <option key={index} value={type.id}>{type.name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>

                                </div>
                            </Col>
                            <Col>
                                <div className='propeties_memmorys d-flex justify-content-between align-items-center'>
                                    {
                                        Memmorys?.map((mem, index) => {
                                            return (
                                                <Form.Check
                                                    key={index}
                                                    type={"checkbox"}
                                                    label={mem.name}
                                                    checked={idMem === mem.id}
                                                    onChange={() => setIdMem(mem.id)}
                                                />

                                            )
                                        })
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup className="mb-3 mt-2">
                                    <Form.Control
                                        placeholder="Giá sản phẩm"
                                        aria-label="price"
                                        aria-describedby="basic-price"
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup className="mb-3 mt-2">
                                    <Form.Control
                                        placeholder="% Giảm giá"
                                        aria-label="discount"
                                        aria-describedby="basic-discount"
                                        onChange={(e) => setDiscount(e.target.value)}
                                        value={discount}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup className="mb-3 mt-2">
                                    <Form.Control
                                        placeholder="% Trả trước"
                                        aria-label="prepay"
                                        aria-describedby="basic-prepay"
                                        onChange={(e) => setPrepay(e.target.value)}
                                        value={prepay}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup className="mb-3 mt-2">
                                    <Form.Control
                                        placeholder="Hàng sẵn có"
                                        aria-label="count"
                                        aria-describedby="basic-count"
                                        onChange={(e) => setCount(e.target.value)}
                                        value={count}
                                    />
                                </InputGroup>
                            </Col>

                            <Col xs={12}>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Choose image.</Form.Label>
                                    <Form.Control type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => handlerAddProduct()}
                        disabled={idTypePhone === "" || idColor === "" || idMem === "" || price === "" || photo === ""}
                    >
                        Add
                    </Button>
                    <Button variant='danger' onClick={() => {
                        onHide();
                        setIdTypePhone("");
                        setIdColor("")
                        setCount("")
                        setDiscount("")
                        setPhoto("")
                        setIdMem("")
                        setPrice("")
                    }}>Cancle</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalAddProductions;