import React from 'react';
import { Carousel } from 'react-bootstrap';

function Carousel99(props) {
    return (
        <div id='carousel99' className='txt_black mt-3 mb-3'>
            <Carousel>

                <Carousel.Item>
                    <div className='carousel_img2'>
                        <img
                            className="d-block w-100"
                            src="/img/banner/2.jpg"
                            alt="First slide"
                        />
                        <div className='carousel_text'>
                            <div className='carousel_logo'>
                                <h1>CUAHANG99</h1>
                                <span className='website'>www.cuahang99.com</span>
                            </div>
                            <ul className='carousel_text_item'>
                                <li>
                                    Đến trực tiếp cửa hàng để được tư vấn miễn phí.
                                </li>
                                <li>
                                    Hoặc vui lòng liên hệ Hotline <span>0907.08.99.27</span>
                                </li>
                            </ul>
                            <div className='carousel_contact'>
                                <div className='hotline'>
                                    <i className="fa fa-phone-volume"></i>
                                    <h1>0907.08.99.27</h1>
                                </div>
                            </div>
                        </div>
                        <div className='adress'>
                            <i className="fa fa-map-marker-alt"></i>
                            <h2>C9/27 đường Dương Đình Cúc Ấp 3 Xã Tân Kiên - Huyện Bình Chánh - Tp.HCM</h2>

                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className='carousel_img1'>
                        <img
                            className="d-block w-100"
                            src="/img/banner/1.jpg"
                            alt="First slide"
                        />
                        <div className='carousel_text'>
                            <div className='carousel_logo'>
                                <h1>CUAHANG99</h1>
                                <span className='website'>www.cuahang99.com</span>
                            </div>
                            <ul className='carousel_text_item'>
                                <li>
                                    Đem đến cho bạn những sản phẩm thời thượng.
                                </li>
                                <li>
                                    Những trải nghiệm mua sắm đẳng cấp xứng tầm phong cách sống thượng lưu.
                                </li>
                            </ul>
                        </div>
                    </div>

                </Carousel.Item>

            </Carousel>
        </div>
    );
}

export default Carousel99;