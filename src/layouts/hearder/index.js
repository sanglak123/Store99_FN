import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';
import { StoreSelector } from 'redux/selector/StoreSelector';

function Hearder(props) {

    //Data
    const Data = useSelector(DataSelector.Data);
    const Trademarks = Data?.Trademarks;
    //Back To Top
    const [scrollY, setScrollY] = useState();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const ScrollBar = () => {
            const hearderMain = window.document.getElementById("hearder");
            const btnScroll = window.document.getElementById("btn_scroll");

            if (scrollY > 150) {
                hearderMain?.classList.add("scroll-to-top");
                btnScroll?.classList.add("btnShow");
            } else {
                hearderMain?.classList.remove("scroll-to-top");
                btnScroll?.classList.remove("btnShow");
            }
        };

        ScrollBar();
    }, [scrollY]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    //Store
    const Store = useSelector(StoreSelector.Store);
    return (
        <>
            <div id='hearder' className='bgr_red300'>
                <Container fluid="lg">
                    <Navbar expand="xl">
                        <Navbar.Brand href="/">
                            <div id='logo_cuahang99'>
                                <h1>CUAHANG<span>99</span></h1>
                                <span className='website'>www.cuahang99.com</span>
                            </div>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                {
                                    Trademarks?.map((trade, index) => {
                                        return (
                                            <NavDropdown key={index} title={trade.name.toUpperCase()} id="navbarScrollingDropdown">
                                                {
                                                    trade.ProductLines?.map((line, index) => {
                                                        return (
                                                            <NavDropdown.Item key={index} href={`/product/${trade.href}/${line.href}`}>{line.name}</NavDropdown.Item>
                                                        )
                                                    })
                                                }
                                            </NavDropdown>
                                        )
                                    })
                                }
                                <Nav.Link href="#">
                                    Liên hệ
                                </Nav.Link>
                            </Nav>
                            <div className='nav_right'>

                                <div className='nav_right_item'>
                                    <div className='item_icon'>
                                        <i className="fa fa-headphones"></i>
                                    </div>
                                    <div className='item_text'>
                                        <span>Liên hệ - Mua Hàng</span>
                                        <p>0907.08.99.27</p>
                                    </div>
                                </div>
                              
                                <div className='nav_right_item item_md'>
                                    <div className='item_icon'>
                                        <i className="fa fa-map-marker-alt"></i>
                                    </div>
                                    <div className='item_text'>
                                        <span>Địa chỉ</span>
                                        <p>C9/27 Dương Đình Cúc - Ấp 3 - <br />Tân Kiên - Bình Chánh</p>
                                    </div>

                                    {
                                        Store.length > 0 &&
                                        <div className='nav_right_item' >
                                            <div className='item_icon'>
                                                <Link href={"/store"}><i className="fa fa-shopping-cart"></i></Link>

                                            </div>
                                            <div className='item_text'>
                                                <span>Giỏ hàng</span>
                                                <p>{Store.length} Sản Phẩm</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Navbar.Collapse>

                    </Navbar>
                </Container>


            </div>
            <Button className='btn btn-danger' onClick={() => scrollToTop()} id='btn_scroll'>
                <i className="fa fa-arrow-up"></i>
            </Button>

        </>

    );
}

export default Hearder;