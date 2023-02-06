import { ApiOrders } from '@/callApi/orders';
import { formatMoney } from 'config/formatMoney';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { StoreSelector } from 'redux/selector/StoreSelector';
import { AddPhoneSuccess, SubtractionPhoneSuccess } from 'redux/slice/StoreSlice';
import { v4 } from 'uuid';


function StoreShop(props) {
    const dispatch = useDispatch();
    const shoping = useSelector(StoreSelector.Store);

    const handleAddStore = (product) => {
        dispatch(AddPhoneSuccess(product))
    };

    const handleSubtractionStore = (product) => {
        dispatch(SubtractionPhoneSuccess(product))
    };

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total_price = () => {
            let total = 0;
            shoping.map((product) => {
                total = total + ((Number(product.phone.price) - (Number(product.phone.price) * Number(product.phone.discount)) / 100)) * Number(product.count);
            });
            setTotalPrice(total);
        };
        total_price();
    }, [shoping]);

    //Orders
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [adress, setAdress] = useState("");
    const [note, setNote] = useState("");

    const handleCreateOrder = async () => {
        const keyOrder = v4({ email: email, phone: phone }).replace(/\-/g, '').toString();
        shoping.map(async (item) => {
            await ApiOrders.Create(item.phone.id, item.count, email, phone, keyOrder, note, adress);
        });
        toast.success("Create success!");
    }


    return (
        <div id='storeShop'>
            <Container>
                <div className='store_container txt_black mt-4 mb-4'>
                    <div className='store_content'>
                        <Row>
                            <Col xs={12} md={12} lg={6}>
                                <div className='store_product'>
                                    <div className='store_hearder'>
                                        <h5>GIỎ HÀNG</h5>
                                    </div>
                                    <hr />
                                    <div className='store_render'>
                                        {
                                            shoping.map((product, index) => {
                                                return (
                                                    <div key={index} className='store_item d-flex justify-content-between align-items-center'>

                                                        <div className='phone_info d-flex justify-content-around align-items-start txt_center'>

                                                            <div className='phone_logo'>
                                                                <img src={product.phone.Imgs[0].url} className='img-fluid' />
                                                            </div>

                                                            <div className='ms-3 phone_title'>
                                                                <h5>{product.phone.TypePhone.name}</h5>
                                                                <span>Màu: {product.phone.Color.name}</span>
                                                            </div>

                                                        </div>

                                                        <div className='phone_price'>
                                                            <h4>{formatMoney(product.phone.price - product.phone.price * product.phone.discount / 100)}</h4>
                                                            <InputGroup className="mb-3 product_count">
                                                                <Button onClick={() => handleAddStore(product)} variant='outline-danger'>+</Button>
                                                                <Form.Control
                                                                    value={product.count}
                                                                    className='txt_center'
                                                                />
                                                                <Button onClick={() => handleSubtractionStore(product)} variant='outline-danger'>-</Button>
                                                            </InputGroup>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                            </Col>

                            <Col xs={12} md={12} lg={6}>
                                <div className='store_payment'>
                                    <div className='store_hearder'>
                                        <h5>TẠM TÍNH</h5>
                                    </div>
                                    <hr />
                                    <div className='payments'>
                                        <p>Tiền Hàng: {formatMoney(totalPrice)}</p>
                                        <p>Giảm giá: 0đ</p>
                                        <p>Vận chuyển: 0đ</p>
                                    </div>
                                    <div className='discount'>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                type={"text"}
                                                placeholder={"Vui lòng nhập mã giảm giá"}
                                            />
                                            <Button className='ms-2'>Áp Dụng</Button>
                                        </InputGroup>
                                    </div>
                                    <hr />
                                    <div className='total_price'>
                                        <p>Tạm tính: </p>
                                        <h2>{formatMoney(totalPrice)}</h2>
                                    </div>
                                    <div className='info_user'>
                                        <Form className='mt-3'>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Địa chỉ email</Form.Label>
                                                <Form.Control type="email" placeholder="Địa chỉ email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <Form.Text className="text-muted">
                                                    Địa chỉ email của bạn sẽ được bảo mật.
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Số điện thoại liên hệ</Form.Label>
                                                <Form.Control type="text" placeholder="Điện thoại liên hệ" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="adress">
                                                <Form.Label>Địa chỉ nhận hàng.</Form.Label>
                                                <Form.Control type="text" placeholder="Địa chỉ nhận hàng" value={adress} onChange={(e) => setAdress(e.target.value)} />
                                            </Form.Group>

                                            <InputGroup>
                                                <InputGroup.Text>Ghi chú</InputGroup.Text>
                                                <Form.Control as="textarea" rows={3} aria-label="With textarea" value={note} onChange={(e) => setNote(e.target.value)} />
                                            </InputGroup>
                                        </Form>
                                    </div>
                                    <div className='payment_btn mt-3'>
                                        <Button className='me-2' variant='outline-primary'>
                                            <Link href={"/"}>Tiếp tục mua hàng</Link>
                                        </Button>
                                        <Button onClick={() => handleCreateOrder()} disabled={email === "" || phone === "" || shoping.length < 1} variant='outline-primary'>Tiến hành đặt hàng</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </div>

                </div>
            </Container>
        </div>
    );
}

export default StoreShop;