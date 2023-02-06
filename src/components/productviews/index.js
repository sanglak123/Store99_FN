import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';
import CardPhone from '../cardPhone';

function ProductViews({ productline, price }) {
    //Data
    const Data = useSelector(DataSelector.Data);
    const Productions = Data.Productions;
    const ProductionsView = Productions?.filter(product => product.TypePhone?.ProductLine?.href === `/${productline}` && product.price >= price.min && product.price <= price.max)
    console.log(ProductionsView)
    return (
        <div id='productions_views'>
            {
                ProductionsView.length > 0 ?
                    <Row>
                        {
                            ProductionsView?.map((product, index) => {
                                return (
                                    <Col xs={12} sm={6} md={6} xl={4} xxl={4} key={index}>
                                        <CardPhone
                                            phone={product}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    :
                    <h2 className='text-danger'>Không tìm thấy sản phẩm.</h2>
            }

        </div>
    );
}

export default ProductViews;