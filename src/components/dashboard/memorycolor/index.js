import { ApiAdmins } from '@/callApi/admin';
import { ApiData } from '@/callApi/data';
import React, { useState } from 'react';
import { Button, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';
import { LoadDataSuccess } from 'redux/slice/DataSlice';

function MemmoryColors(props) {
    const dispatch = useDispatch();
    //Data
    const Data = useSelector(DataSelector.Data);
    const Memmorys = Data?.Memmorys;
    const Colors = Data?.Colors;
    const [showAddMem, setShowAddMem] = useState(false);
    const [memory, setMemmory] = useState("");

    const handlerAddMemmory = async () => {
        await ApiAdmins.Memmorys.Add(memory);
        setMemmory("")
        await ApiData.GetData(dispatch, LoadDataSuccess);
    }

    console.log(Memmorys)
    return (
        <div id='memmory_color' className='bgr_white txt_black'>
            <div className='memmorys'>
                <div className='hearder_99'>
                    <h1>Memmorys</h1>
                </div>
                <ul>
                    {
                        Memmorys?.map((mem, index) => {
                            return (
                                <li key={index}>{mem.name}</li>
                            )
                        })
                    }
                </ul>
                {
                    showAddMem ?
                        <>
                            <hr />
                            <div className='add_memmory'>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Dung lượng"
                                        aria-label="memmory"
                                        aria-describedby="basic-memmory"
                                        value={memory}
                                        onChange={(e) => setMemmory(e.target.value)}
                                    />
                                    <Button onClick={() => handlerAddMemmory()} disabled={memory === ""}>Add</Button>
                                </InputGroup>
                            </div>
                            <Button onClick={() => setShowAddMem(false)} variant='outline-danger' className='btn_add'>-</Button>
                        </>
                        :
                        <Button onClick={() => setShowAddMem(true)} variant='outline-primary' className='btn_add'>+</Button>

                }


            </div>
            <hr />
        </div>
    );
}

export default MemmoryColors;