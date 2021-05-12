import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'

export default function Login({ onIdSubmit }) {

    const idRef = useRef()

    let handleSubmit = (e) => {
        e.preventDefault();
        onIdSubmit(idRef.current.value);
    }

    let createNewId=()=>{
       onIdSubmit(uuidv4());
    }
    return (
        <Container className="align-items-center d-flex"
            style={{ height: '100vh' }}
        >

            <Form onSubmit={handleSubmit} className="w-100">

                <Form.Group>
                    <Form.Label>Enter the user id</Form.Label>
                    <Form.Control type="text" ref={idRef} required />
                </Form.Group>

                <div className="mt-2">
                <Button type="submit" style={{marginRight:'10px'}}>Login</Button>
                <Button onClick={createNewId} variant="secondary">Create a new ID</Button>
                </div>


            </Form>

        </Container>
    )
}
