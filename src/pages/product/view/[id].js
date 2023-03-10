import { formatMoney } from 'config/formatMoney';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';

function ProductView(props) {
    const router = useRouter();
    const { id } = router.query;
    //Data
    const Data = useSelector(DataSelector.Data);
    const Productions = Data?.Productions;
    const productRender = Productions?.find(product => product.id === Number(id))

    const Imgs = productRender?.Imgs;

    const frontside = Imgs?.find(item => item.name === "frontside");
    const backside = Imgs?.find(item => item.name === "backside");
    const camera = Imgs?.find(item => item.name === "camera");
    const accessory = Imgs?.find(item => item.name === "accessory");


    const [imgMain, setImgMain] = useState("");
    const [preview, setPreview] = useState("");

    useEffect(() => {
        setPreview(frontside?.url)
    }, [id, Data]);

    const [showForm, setShowForm] = useState(false);

    return (
        <div id='productView' className='txt_black'>
            <Container>
                <div className='view_content d-flex justify-content-start align-items-start'>

                    <Row>
                        <Col xs={12} sm={12} md={12} xl={4}>
                            <div className='product_image'>
                                <div className='product_image_item mt-5'>
                                    <div className='img_main'>
                                        {
                                            preview !== "" ?

                                                <img src={preview} alt={productRender?.id} className='img-fluid' />
                                                :
                                                <img src={imgMain} alt={productRender?.id} className='img-fluid' />
                                        }
                                    </div>

                                    <div className='img_bot d-flex justify-content-start align-items-center mt-4'>

                                        <div className='img_bot_item'>
                                            <img src={frontside?.url} className='img-fluid'
                                                onClick={() => {
                                                    setImgMain(frontside?.url);
                                                    setPreview("")
                                                }}
                                            />
                                        </div>

                                        <div className='img_bot_item'>
                                            <img src={backside?.url} className='img-fluid'
                                                onClick={() => {
                                                    setImgMain(backside?.url);
                                                    setPreview("")
                                                }} />
                                        </div>

                                        <div className='img_bot_item'>
                                            <img src={camera?.url} className='img-fluid'
                                                onClick={() => {
                                                    setImgMain(camera?.url);
                                                    setPreview("")
                                                }}
                                            />
                                        </div>

                                        <div className='img_bot_item'>
                                            <img src={accessory?.url} className='img-fluid'
                                                onClick={() => {
                                                    setImgMain(accessory?.url);
                                                    setPreview("")
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Col>


                        <Col xs={12} sm={12} md={12} xl={8}>
                            <div className='product_intro w-100 p-5'>
                                <div className='product_intro_item'>
                                    <h1>{productRender?.TypePhone?.name} - {productRender?.Memmory?.name}</h1>
                                    <hr />
                                    <p>M??u:<span style={{ backgroundColor: productRender?.Color?.color }}>{productRender?.Color?.name}</span></p>
                                    <hr />
                                    <p>Dung l?????ng:<span> {productRender?.Memmory?.name}</span></p>

                                    <hr />

                                    <div className='product_price d-flex justify-content-around align-items-start'>

                                        <div className='price_item txt_center'>
                                            <span className='txt_center'>Mua ngay</span>
                                            <p >{formatMoney(productRender?.price - productRender?.price * productRender?.discount / 100)}</p>
                                            <s>{formatMoney(productRender?.price)}</s> <span className='ms-3'>-{productRender?.discount}%</span>
                                        </div>

                                        <div className='price_item'>
                                            Ho???c
                                        </div>

                                        <div className='price_item txt_center'>
                                            <span>Tr??? tr?????c t???</span>
                                            <p>{formatMoney(productRender?.price * productRender?.prepay / 100)}</p>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className='product_accessory'>
                                        <div className='product_accessory_item'>
                                            <h6><i className="fa fa-shopping-bag"></i> B??? s???n ph???m</h6>
                                            <p>
                                                <span className='span_shei'>B??? s???n ph???m: </span>
                                                Th??n m??y, H???p, C??p, C??y l???y sim, S??ch h?????ng d???n (T???t c??? l?? m??y t??? th??ng 10/2020, Apple c???t b??? tai nghe, c??? s???c kh???i b??? s???n ph???m b??n k??m).
                                            </p>
                                        </div>
                                        <div className='product_accessory_item'>
                                            <h6><i className="fa fa-shield-alt"></i>B???o h??nh</h6>
                                            <p>
                                                Gi?? ???? bao g???m 10% VAT. B???o h??nh 12 th??ng theo ch??nh s??ch Apple to??n c???u.
                                            </p>
                                            <p>
                                                <span className='span_shei'>B???o h??nh</span> <span className='span_shei text-danger'>1 ?????i 1 trong 10 ng??y </span>
                                                ?????c quy???n t???i <Link href={"/"}>CUAHANG99</Link>.
                                            </p>
                                        </div>

                                    </div>
                                    <hr />
                                    <div className='btn_buy'>
                                        <h4>?????T NGAY</h4><span className='btn_info'>Giao h??ng t???n n??i ho???c nh???n h??ng t???i c???a h??ng.</span>
                                    </div>

                                    <h2 className='txt_center mt-3 mb-3'>Ho???c</h2>
                                    <div className='btn_buy' onClick={() => setShowForm(!showForm)}>
                                        <h4>????? L???I TH??NG TIN</h4> <span>????? ???????c t?? v???n mi???n ph??.</span>
                                    </div>


                                    {
                                        showForm &&
                                        <Form className='mt-3'>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>?????a ch??? email</Form.Label>
                                                <Form.Control type="email" placeholder="?????a ch??? email" />
                                                <Form.Text className="text-muted">
                                                    ?????a ch??? email c???a b???n s??? ???????c b???o m???t.
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Phone number</Form.Label>
                                                <Form.Control type="text" placeholder="??i???n tho???i li??n h???" />
                                            </Form.Group>

                                            <InputGroup>
                                                <InputGroup.Text>Ghi ch??</InputGroup.Text>
                                                <Form.Control as="textarea" rows={3} aria-label="With textarea" />
                                            </InputGroup>
                                            <Button className='mt-4 w-100 p-4' variant="primary" type="button">
                                                Send
                                            </Button>
                                        </Form>
                                    }


                                </div>
                            </div>
                        </Col>
                    </Row>



                </div>
            </Container>
        </div>
    );
}

export default ProductView;