import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';
import { ApiAdmins } from "@/callApi/admin";

//Reacte-Tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ApiData } from '@/callApi/data';
import { LoadDataSuccess } from 'redux/slice/DataSlice';
import DashboardProductionLines from '@/components/dashboard/productionLine';
import DashboardTypePhones from '@/components/dashboard/typhones';
import DashboardAddProductions from '@/components/dashboard/addProductions';
import MemmoryColors from '@/components/dashboard/memorycolor';
import { AdminSelecor } from 'redux/selector/AdminSelector';
import { LoadOrdersSuccess } from 'redux/slice/AdminSlice';
import DashboardOrders from '@/components/dashboard/dashboardOrder';

function AdminDashboard(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        const LoadOrders = async () => {
            await ApiAdmins.Orders.LoadOrders(dispatch, LoadOrdersSuccess)
        };
        LoadOrders();
    }, [])
    //Data
    const Data = useSelector(DataSelector.Data);  

    const Trademarks = Data?.Trademarks;

    //Maintance
    const Maintance = Data?.Maintance;
    const [check, setCheck] = useState(false);
    useEffect(() => {
        setCheck(Maintance?.active)
    }, [Data]);
    const handleTogleMaintance = async () => {
        await ApiAdmins.MaintanceSystem.Edit(setCheck)
    };

    //Add Trademarks
    const [nameTrade, setNameTrade] = useState("");
    const [photo, setPhoto] = useState("");
    const [preview, setPreview] = useState("");

    const onImageChange = (e, item) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleAddTradeMark = async () => {
        await ApiAdmins.TradeMarks.Add(nameTrade, photo);
        setNameTrade("");
        setPhoto("");
        setPreview("");
        await ApiData.GetData(dispatch, LoadDataSuccess);
    }

    //Delete TradeMarks
    const handleDeleteTradeMark = async (id) => {
        await ApiAdmins.TradeMarks.Delete(id);
        await ApiData.GetData(dispatch, LoadDataSuccess);
    };

    //Edit Trademark
    const [editTrade, setEditTrade] = useState("");
    const [nameTradeEdit, setNameTradeEdit] = useState("");
    const handleEditTradeMark = async (trade) => {
        await ApiAdmins.TradeMarks.Edit(trade.id, nameTradeEdit, photo);
        setPhoto("");
        setEditTrade("");
        await ApiData.GetData(dispatch, LoadDataSuccess);

    }
    return (
        <div id='admin_dasboard' className='bgr_dark100 p-5'>
            <Container>
                <div className='maintance'>
                    <div className='hearder_99'>
                        <h1>BẢO TRÌ HỆ THỐNG</h1>
                    </div>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Bảo trì web"
                            checked={check}
                            onChange={() => handleTogleMaintance()}
                            className='mb-0'
                        />
                    </Form>
                </div>
                <hr />
                <div className='add_product'>
                    <div className='hearder_99'>
                        <h1>Thêm mới</h1>
                    </div>
                    <div className='add_product_content'>
                        <Tabs>
                            <TabList>
                                <Tab>Thương hiệu</Tab>
                                <Tab>Dòng sản phẩm</Tab>
                                <Tab>Loại sản phẩm</Tab>
                                <Tab>Dung lượng - Màu Sắc</Tab>
                                <Tab>Sản phẩm</Tab>
                                <Tab>Đơn hàng</Tab>
                            </TabList>

                            {/* //Trademarks */}
                            <TabPanel>
                                <div className='add_product_item'>
                                    <div className='item_controller mt-2 me-2'>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Tên thương hiệu</Form.Label>
                                                <Form.Control type="text" placeholder="Nhập tên thương hiệu" value={nameTrade} onChange={(e) => setNameTrade(e.target.value)} />
                                                {
                                                    nameTrade !== "" ?
                                                        ""
                                                        :
                                                        <Form.Text className="text-danger">
                                                            Tên thương hiệu không được để trống.
                                                        </Form.Text>
                                                }

                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Logo thương hiệu</Form.Label>
                                                {
                                                    preview !== "" &&
                                                    <div className='photo_preview'>
                                                        <img src={preview} className='img-fluid w-100' />
                                                    </div>
                                                }

                                                <Form.Control
                                                    type="file"
                                                    onChange={(e) => onImageChange(e)}
                                                />
                                                {
                                                    preview !== "" ?
                                                        ""
                                                        :
                                                        <Form.Text className="text-danger">
                                                            Logo thương hiệu không được để trống.
                                                        </Form.Text>
                                                }
                                            </Form.Group>

                                            <ButtonGroup aria-label="Basic example">
                                                <Button
                                                    variant="primary"
                                                    disabled={preview === "" || nameTrade === ""}
                                                    onClick={(e) => handleAddTradeMark()}
                                                >
                                                    Save
                                                </Button>
                                                {
                                                    preview !== "" && nameTrade !== "" &&
                                                    <Button onClick={() => {
                                                        setPreview("");
                                                        setNameTrade("")
                                                    }} variant="danger">Cancle</Button>
                                                }

                                            </ButtonGroup>
                                        </Form>
                                    </div>

                                    <div className='item_table mt-2 me-2'>
                                        <h5>Thương hiệu đang kinh doanh</h5>
                                        <Table bordered className='txt_white'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Thương hiệu</th>
                                                    <th>Link</th>
                                                    <th>Logo</th>
                                                    <th>FileName</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Trademarks?.map((trade, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    {
                                                                        editTrade.id === trade.id ?
                                                                            <InputGroup className="mb-3">
                                                                                <Form.Control
                                                                                    autoFocus
                                                                                    placeholder="Tên thương hiệu"
                                                                                    aria-label="trademark"
                                                                                    aria-describedby="basic-trademark"
                                                                                    value={nameTradeEdit}
                                                                                    onChange={(e) => setNameTradeEdit(e.target.value)}
                                                                                />
                                                                            </InputGroup>
                                                                            :
                                                                            trade.name.toUpperCase()

                                                                    }
                                                                </td>
                                                                <td>
                                                                    {trade.href}

                                                                </td>
                                                                <td>
                                                                    {
                                                                        editTrade.id === trade.id ?
                                                                            <InputGroup className="mb-3">
                                                                                <Form.Control
                                                                                    type='file'
                                                                                    placeholder="Username"
                                                                                    aria-label="Username"
                                                                                    aria-describedby="basic-addon1"
                                                                                    onChange={(e) => setPhoto(e.target.files[0])}
                                                                                />
                                                                            </InputGroup>
                                                                            :
                                                                            <img src={trade.logo} />

                                                                    }
                                                                </td>
                                                                <td>{trade.fileName}</td>
                                                                <td>
                                                                    {
                                                                        editTrade.id === trade.id ?
                                                                            <ButtonGroup aria-label="Basic example">
                                                                                <Button onClick={() => handleEditTradeMark(trade)} variant="success">Save</Button>
                                                                                <Button onClick={() => setEditTrade("")} variant="danger">Cancle</Button>
                                                                            </ButtonGroup>
                                                                            :
                                                                            <ButtonGroup aria-label="Basic example">
                                                                                <Button onClick={() => {
                                                                                    setEditTrade(trade);
                                                                                    setNameTradeEdit(trade.name)
                                                                                }} variant="warning">Edit</Button>
                                                                                <Button onClick={() => handleDeleteTradeMark(trade.id)} variant="danger">Delete</Button>
                                                                            </ButtonGroup>
                                                                    }

                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </div>

                                </div>
                            </TabPanel>

                            {/* //Product Line */}
                            <TabPanel>
                                <DashboardProductionLines />
                            </TabPanel>

                            {/* //Type Phone*/}
                            <TabPanel>
                                <DashboardTypePhones />
                            </TabPanel>
                            {/* Memmory + Color */}
                            <TabPanel>
                                <MemmoryColors />
                            </TabPanel>
                            {/* Productions */}
                            <TabPanel>
                                <DashboardAddProductions />
                            </TabPanel>
                            {/* Orders */}
                            <TabPanel>
                                <DashboardOrders />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default AdminDashboard;