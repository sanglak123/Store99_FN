import ProductViews from '@/components/productviews';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';

function Productions(props) {
    const router = useRouter();
    const { trademark, productline } = router.query;

    const Data = useSelector(DataSelector.Data);
    const Trademarks = Data?.Trademarks;
    const ProductLines = Data.ProductLines;
    const ProductLinesActive = ProductLines.filter(line => line.Trademark.name === trademark);

    //Filter Product
    const [price, setPrice] = useState({
        min: 0,
        max: 1000000000
    });

    return (
        <div id='productions'>
            <Container>
                <div className='hearder_produc_content'>
                    <div className='product_hearder'>
                        <div className='product_logo d-flex justify-content-center align-items-center logo_item'>
                            {
                                Trademarks.map((item, index) => {
                                    return (
                                        <div key={index} className={trademark === item.name ? "logo_item type_active" : "logo_item"}>
                                            <img src={item.logo} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <hr className='txt_dark' />
                    <div className='product_filter'>
                        <div className='filter_item txt_black'>
                            <ul>
                                {
                                    ProductLinesActive.map((line, index) => {
                                        return (
                                            <li key={index} className={line.href === `/${productline}` ? "li_active" : ""
                                            }>
                                                <Link href={`/product/${trademark}/${line.href}`}>{line.name}</Link>

                                            </li>
                                        )
                                    })
                                }
                            </ul>

                        </div>
                        <hr className='txt_dark' />
                        <div className='filter_item '>
                            <ul>
                                <li className='li_disaple'>
                                    Mức giá:
                                </li>
                                <li onClick={() => setPrice({ min: 1, max: 4999999 })} className={price.min === 1 && price.max === 4999999 ? "li_active" : ""}>
                                    Dưới 4 triệu
                                </li>
                                <li onClick={() => setPrice({ min: 4999999, max: 8999999 })} className={price.min === 4999999 && price.max === 8999999 ? "li_active" : ""}>
                                    Từ 4 triệu đến 8 triệu
                                </li>
                                <li onClick={() => setPrice({ min: 8999999, max: 11999999 })} className={price.min === 8999999 && price.max === 11999999 ? "li_active" : ""}>
                                    Từ 8 triệu đến 11 triệu
                                </li>
                                <li onClick={() => setPrice({ min: 12000000, max: 1000000000 })} className={price.min === 12000000 && price.max === 1000000000 ? "li_active" : ""}>
                                    Trên 12 triệu
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='product_views'>
                    <ProductViews
                        productline={productline}
                        price={price}
                    />
                </div>
            </Container >



        </div >
    );
}

export default Productions;