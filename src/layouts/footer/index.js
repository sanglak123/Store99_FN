import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

function Footer(props) {
    return (
        <div id='footer' className='bgr_red400'>
            <div id='footer_main'>
                <Container>
                    <Row>
                        <Col >
                            <div className='footer_item'>
                                <div id='logo_cuahang99'>
                                    <h1>CUAHANG<span>99</span></h1>
                                    <span className='website'>www.cuahang99.com</span>
                                </div>
                                <div className='footer_intro'>
                                    <p className='txt_center txt_dark'>Đem đến cho bạn những sản phẩm thời thượng, những trải nghiệm mua sắm đẳng cấp xứng tầm phong cách sống thượng lưu.</p>
                                </div>
                            </div>
                        </Col>

                        <Col >
                            <div className='footer_item'>
                                <div className='footer_hearder'>
                                    <h4>Lối Tắt</h4>
                                </div>
                                <div className='item quick_link'>
                                    <ul>
                                        <li>
                                            <a href={"/product/apple/ip14"}>
                                                <i className="fa fa-angle-double-right"></i>
                                                Apple
                                            </a>
                                        </li>
                                        <li>
                                            <a href={"/product/samsung/galaxy_s"}>
                                                <i className="fa fa-angle-double-right"></i>
                                                Samsung
                                            </a>
                                        </li>
                                        <li>
                                            <a href={"/product/oppo/oppo_a_series"}>
                                                <i className="fa fa-angle-double-right"></i>
                                                Oppo
                                            </a>
                                        </li>
                                        <li>
                                            <a href={"/product/nokia/nokia"}>
                                                <i className="fa fa-angle-double-right"></i>
                                                Nokia
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>

                        <Col >
                            <div className='footer_item'>
                                <div className='footer_hearder'>
                                    <h4>Liên hệ</h4>
                                </div>
                                <div className='item'>
                                    <ul>
                                        <li>
                                            <a href={"tel:0907089927"}>
                                                <i className="fa fa-phone"></i>0907.08.99.27
                                            </a>
                                        </li>
                                        <li>
                                            <a href={"mailto:cuahang99dt@gmail.com"}>
                                                <i className="fa fa-envelope"></i>cuahang99dt@gmail.com
                                            </a>
                                        </li>
                                        <li>
                                            <div className='icon ps-3 mt-2'>
                                                <i className="fab fa-cc-paypal me-1 ms-1"></i>
                                                <i className="fab fa-cc-mastercard me-1 ms-1"></i>
                                                <i className="fab fa-cc-jcb me-1 ms-1"></i>
                                                <i className="fab fa-cc-visa me-1 ms-1"></i>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>

                        <Col >
                            <div className='footer_item'>
                                <div className='footer_hearder'>
                                    <h4>Phản hồi</h4>
                                </div>
                                <div className='item'>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                                            <Form.Control as="textarea" rows={2} />
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
            <div id='footer_bottom' className='bgr_black'>
                <Container>
                    <p className='txt_center m-0 p-0 txt_dark'>CỬA HÀNG 99 - C9/27 đường Dương Đình Cúc - Ấp 3 - Xã Tân Kiên - Huyện Bình Chánh - TP.HCM</p>
                    <p className='txt_center m-0 p-0 txt_dark'>Chủ sở hữu: CUAHANG99 - Điện thoại: 0907089927 - Email: cuahang99dt@gmail.com - Bản quyền thuộc về www.cuahang99.com</p>
                </Container>
            </div>
        </div>
    );
}

export default Footer;