import { formatMoney } from 'config/formatMoney';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { StoreSelector } from 'redux/selector/StoreSelector';
import { ChoosePhoneSuccess } from 'redux/slice/StoreSlice';

function CardPhone({ phone }) {
    const avatar = phone.Imgs?.find((item) => item.name === "frontside");
    const dispatch = useDispatch();

    const store = useSelector(StoreSelector.Store);
    console.log(store)


    const handleAddStore = (product) => {
        const index = store.findIndex(phone => phone.id === product.id);
        if (index === -1) {
            const newPhone = {
                phone: product,
                count: 1
            }
            dispatch(ChoosePhoneSuccess(newPhone));
            toast.success("Thêm vào giỏ hàng thành công!")
        } else {
            {
                toast.error("Sản phẩm đã tồn tại!")
            }
        }
    }
    return (
        <div id='card_product' className='me-1 ms-1 mt-1 mb-1'>
            <Card>
                <div className='card_image'>
                    <img src={avatar?.url} className='img-fluid w-100' />
                    <div className='card_discount'>
                        -{phone?.discount}%
                    </div>
                    <div className='card_memory'>
                        {phone?.Memmory?.name}
                    </div>
                    <div className='card_color'>
                        Color: {phone?.Color?.name}
                    </div>
                </div>

                <Card.Body>
                    <Card.Title>{phone?.TypePhone?.name}</Card.Title>
                    <Card.Text>
                        <div className='txt_content d-flex justify-content-around align-items-start'>

                            <div className='txt_item'>

                                {
                                    phone.discount > 0 ?
                                        <>
                                            <p>{formatMoney(phone.price - phone.price * phone.discount / 100)}</p>
                                            <s>{formatMoney(phone.price)}</s>
                                        </>
                                        :
                                        <p>{formatMoney(phone.price)}</p>
                                }

                            </div>

                            <div className='txt_item'>
                                {
                                    phone.prepay > 0 ?
                                        <>
                                            <span>Hoặc trả trước</span>
                                            <p>{formatMoney(phone.price * phone.prepay / 100)}</p>
                                        </>
                                        :
                                        ""
                                }
                            </div>
                        </div>
                        <div className='card_count d-flex justify-content-around align-items-center'>
                            {phone.count > 0 ?
                                <p>Còn {phone.count} máy</p>
                                :
                                <p className='text-danger'>Hết hàng</p>
                            }
                            <div className='card_star'>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                        </div>

                    </Card.Text>
                    <Button variant='success' className='me-3'>
                        <a href={`/product/view/${phone.id}`}>Mua Ngay</a>
                    </Button>
                    <Button onClick={() => handleAddStore(phone)} variant='outline-primary'><i className="fa fa-cart-plus"></i></Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardPhone;