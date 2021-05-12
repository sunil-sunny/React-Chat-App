import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactContext = React.createContext()

export const useContacts=()=>{
    return useContext(ContactContext)
}

export function ContactsProvider({ children }) {

    const [contacts, setcontacts] = useLocalStorage('contacts', [])

    const createContact = (id, name) => {
        setcontacts((prevContact) => {
            return [...prevContact, { id, name }]
        })
    }

    return (
        <ContactContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactContext.Provider>
    )
}
