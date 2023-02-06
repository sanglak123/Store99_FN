import { ApiAdmins } from '@/callApi/admin';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Form, InputGroup } from 'react-bootstrap';


function AdminLogin(props) {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [key, setKey] = useState("");

    const handleLogin = async () => {
        await ApiAdmins.Authen.Login(userName, pass, key, router);
    };

    return (
        <div id=' adminLogin'>
            <Container>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter your username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    {
                        userName === "" &&
                        <Form.Text className="text-danger">
                            Username không được để trống.
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                    {
                        pass === "" &&
                        <Form.Text className="text-danger">
                            Password không được để trống.
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Key Admin" value={key} onChange={(e) => setKey(e.target.value)} />
                    {
                        key === "" &&
                        <Form.Text className="text-danger">
                            Key Admin không được để trống.
                        </Form.Text>
                    }
                </Form.Group>
                <Button onClick={() => handleLogin()} className='me-2' variant="outline-primary" type="button">
                    Login
                </Button>
                <Button className='ms-2' variant="outline-danger" type="button">
                    Cancle
                </Button>
            </Container>
        </div>
    );
}

export default AdminLogin;