import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'

export default function NewContact({ closeModal }) {

    const idRef = useRef()
    const nameRef = useRef()
    const { createContact } = useContacts()


    const handleSubmit = () => {

        createContact(idRef.current.value, nameRef.current.value)
        closeModal()

    }
    return (
        <>
            <Modal.Header closeButton>Create Contact</Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit} className="m-3">

                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>

                    <Button type="submit" className="mt-2">Create</Button>
                </Form>
            </Modal.Body>

        </>
    )
}
