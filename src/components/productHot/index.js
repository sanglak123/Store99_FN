import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DataSelector } from 'redux/selector/DataSelector';
import CardPhone from '../cardPhone';


function ProductionHot({ trademark }) {

    const Data = useSelector(DataSelector.Data);
    const Productions = Data?.Productions;
    const ProductionLines = Data.ProductLines;

    const ProductionLineRender = ProductionLines?.filter(productLine => productLine.idTradeMark === trademark.id)
    const ProductionRender = Productions?.filter(product => product.TypePhone?.ProductLine?.Trademark?.name === trademark.name)


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 940,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div id='productions_hot'>
            <div className='txt_black produc_hot_content'>
                <div className='produc_hot_hearder  d-flex justify-content-between align-items-center'>
                    <h5>Điện thoại <span>{trademark.name}</span> nổi bật</h5>
                    <ul className=' d-flex justify-content-between align-items-center'>
                        {
                            ProductionLineRender.map((line, index) => {
                                return (
                                    <li key={index}>
                                        {line.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <Slider {...settings}>
                    {
                        ProductionRender?.map((product, index) => {
                            return (
                                <div key={index}>
                                    <CardPhone
                                        phone={product}
                                    />
                                </div>
                            )
                        })
                    }

                </Slider>
            </div>
        </div>

    );
}

export default ProductionHot;

