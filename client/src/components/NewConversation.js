import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'
import { useConversations } from '../context/ConversationProvider'


export default function NewConversation({ closeModal }) {

    const [selectContactIds, setSelectContactIds] = useState([])

    const { contacts } = useContacts()
    const { createConversation } = useConversations()


    const handleCheckBoxChange = (contactId) => {

        setSelectContactIds(prevSelectedContacts => {

            if (prevSelectedContacts.includes(contactId)) {
                return prevSelectedContacts.filter((prevId) => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelectedContacts, contactId]
            }

        })

    }

    const handleSubmit = (e) => {

        e.preventDefault()

        createConversation(selectContactIds)

        closeModal()


    }
    return (
        <>
            <Modal.Header closeButton>Create Contact</Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit} className="m-3">

                    {
                        contacts.map(contact => (

                            <Form.Group controlId={contact.id} key={contact.id}>
                                <Form.Check type="checkbox"
                                    label={contact.name}
                                    value={selectContactIds.includes(contact.id)}
                                    onChange={() => handleCheckBoxChange(contact.id)} />
                            </Form.Group>

                        ))
                    }

                    <Button type="submit" className="mt-2">Create</Button>
                </Form>
            </Modal.Body>

        </>
    )
}
