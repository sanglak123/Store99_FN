import { ApiAdmins } from '@/callApi/admin';
import { ApiData } from '@/callApi/data';
import ModalAddProductions from '@/components/modal/AddProductions';
import ModalShowProductImg from '@/components/modal/ShowProductImg';
import { formatMoney } from 'config/formatMoney';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';
import { LoadDataSuccess } from 'redux/slice/DataSlice';

function DashboardAddProductions(props) {
    const dispatch = useDispatch();
    //Data
    const Data = useSelector(DataSelector.Data);
    const Trademarks = Data?.Trademarks;
    const ProductLines = Data?.ProductLines;
    const Productions = Data?.Productions;

    const [idTrade, setIdTrade] = useState(1);
    const ProductLineRender = ProductLines.filter(line => line.idTradeMark === idTrade);
    const [idProductLine, setIdProductLine] = useState(1);

    useEffect(() => {
        setIdProductLine(ProductLineRender[0].id)
    }, [idTrade]);

    const ProductionRender = Productions.filter(product => product.TypePhone?.ProductLine?.id === idProductLine)

    //Modal add product
    const [modalShow, setModalShow] = useState(false);
    //Modal Show product
    const [modalShowProduct, setModalShowProduct] = useState(false);
    const [product, setProduct] = useState("");

    // console.log(ProductionRender)

    //Edit
    const [idProduct, setIdProduct] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [prepay, setPrepay] = useState("");
    const [count, setCount] = useState("");
    const [hot, setHot] = useState(false);

    const handleEditProduct = async (id) => {
        await ApiAdmins.Productions.Edit(id, price, discount, prepay, count, hot)
        setIdProduct("");
        setPrice("");
        setCount("");
        setDiscount("");
        setPrepay("");
        await ApiData.GetData(dispatch, LoadDataSuccess)
    };

    //Delete
    const handleDeleteProduct = async (id) => {
        alert(id)
    }

    return (
        <div id='DashboardAddProductions'>
            <div className='addproduct_trademark d-flex justify-content-center align-items-center'>
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
                        ProductLineRender?.map((line, index) => {
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
            <div className='product_render'>
                <Button variant='outline-primary' className='mb-3' onClick={() => setModalShow(true)}>Thêm mới sản phẩm</Button>
                <Table striped bordered hover size="sm">
                    <thead className='txt_center'>
                        <tr >
                            <th>#</th>
                            <th>Tên sản phẩm</th>
                            <th>Dung lượng</th>
                            <th>Màu sắc</th>
                            <th>Giá gốc</th>
                            <th>Giảm giá(%)</th>
                            <th>Trả trước(%)</th>
                            <th>Hàng có sẵn</th>
                            <th>Sản phẩm hot</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='txt_center'>
                        {
                            ProductionRender?.map((product, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td >{index + 1}</td>
                                            <td >{product.TypePhone?.name}</td>
                                            <td >{product.Memmory?.name}</td>
                                            <td >{product.Color?.name}</td>

                                            <td >
                                                {
                                                    idProduct === product.id ?
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                placeholder="Giá gốc"
                                                                aria-label="price"
                                                                aria-describedby="basic-price"
                                                                value={price}
                                                                onChange={(e) => setPrice(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                        :
                                                        formatMoney(product.price)
                                                }

                                            </td>
                                            <td >
                                                {
                                                    idProduct === product.id ?
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                placeholder="% Giảm giá"
                                                                aria-label="discount"
                                                                aria-describedby="basic-discount"
                                                                value={discount}
                                                                onChange={(e) => setDiscount(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                        :
                                                        product.discount
                                                }
                                            </td>
                                            <td >
                                                {
                                                    idProduct === product.id ?
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                placeholder="% Trả trước"
                                                                aria-label="prepay"
                                                                aria-describedby="basic-prepay"
                                                                value={prepay}
                                                                onChange={(e) => setPrepay(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                        :
                                                        product.prepay
                                                }
                                            </td>
                                            <td>
                                                {
                                                    idProduct === product.id ?
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                placeholder="Hàng có sẵn"
                                                                aria-label="count"
                                                                aria-describedby="basic-count"
                                                                value={count}
                                                                onChange={(e) => setCount(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                        :
                                                        product?.count
                                                }
                                            </td>
                                            <td>
                                                {
                                                    idProduct === product.id ?
                                                        <Form.Check
                                                            checked={hot}
                                                            type="switch"
                                                            id="disabled-custom-switch"
                                                            onChange={() => setHot(!hot)}
                                                        />
                                                        :
                                                        <Form.Check
                                                            checked={product.hot}
                                                            type="switch"
                                                        />
                                                }

                                            </td>
                                            <td >
                                                {
                                                    idProduct === product.id ?
                                                        <ButtonGroup aria-label="Basic example">
                                                            <Button onClick={() => handleEditProduct(product.id)} variant="outline-success">Save</Button>

                                                            <Button onClick={() => {
                                                                setIdProduct("")
                                                            }} variant="outline-danger">Cancle</Button>
                                                        </ButtonGroup>
                                                        :
                                                        <ButtonGroup aria-label="Basic example">
                                                            <Button onClick={() => {
                                                                setIdProduct(product.id);
                                                                setPrice(product?.price);
                                                                setCount(product?.count);
                                                                setDiscount(product?.discount);
                                                                setPrepay(product?.prepay);
                                                                setHot(product.hot)
                                                            }} variant="outline-success">Edit</Button>
                                                            <Button onClick={() => {
                                                                setModalShowProduct(true);
                                                                setProduct(product)
                                                            }} variant="outline-info">Show</Button>
                                                            <Button onClick={() => handleDeleteProduct(product.id)} variant="outline-danger">Delete</Button>
                                                        </ButtonGroup>
                                                }

                                            </td>

                                        </tr>
                                    </>
                                )
                            })

                        }
                    </tbody>
                </Table>
                <ModalShowProductImg
                    show={modalShowProduct}
                    onHide={() => setModalShowProduct(false)}
                    product={product}
                />
                <ModalAddProductions
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    idTrade={idTrade}
                    idProductLine={idProductLine}
                />
            </div>
        </div>
    );
}

export default DashboardAddProductions;