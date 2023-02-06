import { ApiAdmins } from '@/callApi/admin';
import { ApiData } from '@/callApi/data';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';
import { LoadDataSuccess } from 'redux/slice/DataSlice';

function ModalShowProductImg({ show, onHide, product }) {

    const dispatch = useDispatch();

    const Imgs = product?.Imgs;
    const frontSide = Imgs?.find(img => img.name === "frontside");
    const backSide = Imgs?.find(img => img.name === "backside");
    const camera = Imgs?.find(img => img.name === "camera");
    const accessory = Imgs?.find(img => img.name === "accessory");

    const ListTypeImgsRender = [
        {
            name: "frontside",
            img: frontSide
        },
        {
            name: "backside",
            img: backSide
        },
        {
            name: "camera",
            img: camera
        },
        {
            name: "accessory",
            img: accessory
        },
    ]

    const [idImg, setIdImg] = useState("");
    const [photo, setPhoto] = useState("");
    const [preview, setPreview] = useState("");

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    //Edit
    const handleEditImgProduct = async (id) => {
        await ApiAdmins.Imgs.Edit(photo, id, setPreview);
        setPhoto("");
        setIdImg("");
        await ApiData.GetData(dispatch, LoadDataSuccess)
    }
    //Add
    const [addImage, setAddImage] = useState("");

    const handleAddImageByIdProduct = async (typeImage) => {
        await ApiAdmins.Productions.AddImageByIdProduct(photo, product.id, typeImage);
        setPhoto("");
        setAddImage("");
        await ApiData.GetData(dispatch, LoadDataSuccess);

    };
    //Delete
    const handleDeleteImage = async (id) => {
        await ApiAdmins.Imgs.Delete(id);
        await ApiData.GetData(dispatch, LoadDataSuccess)
    }

    return (
        <div id='ModalShowProductImg'>
            <Modal
                show={show}
                size="lg"
                centered
                className='txt_black'
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {product.TypePhone?.name} - {product.Memmory?.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='img_render d-flex justify-content-center align-items-center'>
                        {
                            ListTypeImgsRender?.map((typeimg, index) => {
                                return (
                                    <div key={index} className='img_item txt_center'>
                                        <h6>{typeimg?.name.toUpperCase()}</h6>
                                        {
                                            typeimg.img ?
                                                <>
                                                    {
                                                        preview !== "" && idImg === typeimg.img?.id ?
                                                            <img src={preview} alt={"preview"} className="img-fluid w-100" />
                                                            :
                                                            <img src={typeimg.img?.url} alt={`${typeimg.img.name}_${typeimg.img.id}`} className="img-fluid w-100" />
                                                    }

                                                    {
                                                        idImg === typeimg.img?.id ?
                                                            <>
                                                                <Form.Group controlId="formFile" className="mb-3">
                                                                    <Form.Label>Choose image.</Form.Label>
                                                                    <Form.Control type="file" onChange={(e) => onImageChange(e)} />
                                                                    <Button onClick={() => handleEditImgProduct(typeimg.img?.id)}>Save</Button>
                                                                    <Button onClick={() => {
                                                                        setIdImg("");
                                                                        setPreview("")
                                                                        setPhoto("")
                                                                    }}>Cancle</Button>
                                                                </Form.Group>
                                                            </>
                                                            :
                                                            <>
                                                                <Button variant='outline-primary' onClick={() => {
                                                                    setIdImg(typeimg.img?.id)
                                                                }}>Edit</Button>
                                                                <Button onClick={() => handleDeleteImage(typeimg.img?.id)} variant='outline-danger'>Delete</Button>
                                                            </>

                                                    }

                                                </>

                                                :
                                                <>
                                                    {
                                                        addImage === typeimg.name ?
                                                            <>
                                                                {
                                                                    preview !== "" && addImage === typeimg.name &&
                                                                    <img src={preview} alt={"preview"} className="img-fluid w-100" />
                                                                }
                                                                <Form.Group controlId="formFile" className="mb-3">
                                                                    <Form.Label>Choose image.</Form.Label>
                                                                    <Form.Control type="file" onChange={(e) => onImageChange(e)} />
                                                                    <Button onClick={() => handleAddImageByIdProduct(typeimg.name)}>Save</Button>
                                                                    <Button onClick={() => {
                                                                        setIdImg("");
                                                                        setPreview("")
                                                                        setPhoto("")
                                                                    }}>Cancle</Button>
                                                                </Form.Group></>

                                                            :
                                                            <Button onClick={() => setAddImage(typeimg.name)}>+</Button>
                                                    }

                                                </>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* <div className='img_render d-flex justify-content-center align-items-center'>

                        {
                            frontSide ?
                                <div className='img_item txt_center'>
                                    <h6>{frontSide?.name.toUpperCase()}</h6>
                                    {
                                        idImg === frontSide?.id ?
                                            <>
                                                {
                                                    preview !== "" && idImg === frontSide?.id ?
                                                        <img src={preview} alt={`preview_${frontSide.name}_${frontSide.id}`} className="img-fluid w-100" />
                                                        :
                                                        <img src={frontSide?.url} alt={`${frontSide.name}_${frontSide.id}`} className="img-fluid w-100" />
                                                }

                                                <Form.Group controlId="formFile" className="mb-3">
                                                    <Form.Label>Choose image.</Form.Label>
                                                    <Form.Control type="file" onChange={(e) => onImageChange(e)} />
                                                </Form.Group>
                                                <Button className='mt-3 me-2' variant='outline-success'>Save</Button>
                                                <Button onClick={() => {
                                                    setIdImg("");
                                                    setPhoto("");
                                                    setPreview("");
                                                    setTypeImg("")
                                                }} className='mt-3' variant='outline-danger'>Cancle</Button>
                                            </>
                                            :
                                            <>
                                                <img src={frontSide?.url} alt={`${frontSide.name}_${frontSide.id}`} className="img-fluid w-100" />
                                                <Button onClick={() => {
                                                    setIdImg(frontSide?.id);
                                                    setTypeImg(frontSide?.name)
                                                }} className='mt-3' variant='outline-success'><i class="fa fa-edit"></i></Button>
                                            </>
                                    }

                                </div>
                                :
                                <div className='img_item txt_center'>
                                    <h6>FRONTSIDE</h6>
                                    {
                                        addImage === "frontSide" ?
                                            <>
                                                {
                                                    preview !== "" && addImage === "frontSide" &&
                                                    <img src={preview} alt={"Preview_frontSide"} className="img-fluid w-100" />

                                                }

                                                <Form.Group controlId="formFile" className="mb-3">
                                                    <Form.Label>Choose image.</Form.Label>
                                                    <Form.Control type="file" onChange={(e) => onImageChange(e)} />
                                                    <Button onClick={() => handleAddImageByIdProduct("frontside")} className='mt-3 me-2' variant='outline-primary'>Save</Button>
                                                    <Button className='mt-3' variant='outline-danger' onClick={() => {
                                                        setAddImage("");
                                                        setPreview("")
                                                    }}>Cancle</Button>
                                                </Form.Group>
                                            </>
                                            :
                                            <>
                                                <Button onClick={() => setAddImage("frontSide")}>+</Button>
                                            </>
                                    }

                                </div>
                        }



                        <div className='img_item txt_center'>
                            <h6>{backSide?.name.toUpperCase()}</h6>
                            <img src={backSide?.url} alt={`${backSide?.name}_${backSide?.id}`} className="img-fluid w-100" />
                            <Button onClick={() => {
                                setIdImg(backSide?.id);
                                setTypeImg(backSide?.name)
                            }} className='mt-3' variant='outline-success'><i class="fa fa-edit"></i></Button>
                        </div>


                        <div className='img_item txt_center'>
                            <h6>{camera?.name.toUpperCase()}</h6>
                            <img src={camera?.url} alt={`${camera?.name}_${camera?.id}`} className="img-fluid w-100" />
                            <Button onClick={() => {
                                setIdImg(camera?.id);
                                setTypeImg(camera?.name)
                            }} className='mt-3' variant='outline-success'><i class="fa fa-edit"></i></Button>
                        </div>

                  
                        <div className='img_item txt_center'>
                            <h6>{accessory?.name.toUpperCase()}</h6>
                            <img src={accessory?.url} alt={`${accessory?.name}_${accessory?.id}`} className="img-fluid w-100" />
                            <Button onClick={() => {
                                setIdImg(accessory?.id);
                                setTypeImg(accessory?.name)
                            }} className='mt-3' variant='outline-success'><i class="fa fa-edit"></i></Button>
                        </div>
                    </div> */}

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalShowProductImg;