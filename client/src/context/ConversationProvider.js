import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from '../context/ContactsProvider'
import { useSocket } from '../context/SocketProvider'

const ConversationContext = React.createContext()

const arrayEquals = (a, b) => {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}

export const useConversations = () => {
    return useContext(ConversationContext)

}

export function ConversationProvider({ id, children }) {

    const [conversations, setConversations] = useLocalStorage('conversations', [])

    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const { contacts } = useContacts()
    const  socket  = useSocket()

    
    const formattedConversations = conversations.map((conversation, index) => {
        const members = conversation.members.map(member => {
            const contact = contacts.find(contact => {
                return contact.id === member
            })
            const name = (contact && contact.name) || member
            return { id: member, name }
        })

        const selected = index === selectedConversationIndex
        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe }
        })
        return { ...conversations, messages, members, selected }
    })

    const addMessagestoConversations = useCallback(({ members, text, sender }) => {

        setConversations(prevConversation => {
            let madeChange = false;
            const newMessage = { sender, text }
            const newConversation = prevConversation.map(conversation => {

                if (arrayEquals(conversation.members, members)) {
                    madeChange = true;
                    return {
                        ...conversation,
                        messages: [
                            ...conversation.messages, newMessage

                        ]
                    }
                }

                return conversation
            })

            if (madeChange) {

                return newConversation
            } else {
                return [...prevConversation,
                { members, messages: [newMessage] }]
            }
        })
    },[setConversations])

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-message', addMessagestoConversations)

        return () => socket.off('receive-message')
    }, [socket, addMessagestoConversations])


    const sendMessage = (members, text) => {

        socket.emit('send-message', { members, text })

        addMessagestoConversations({ members, text, sender: id })
    }
    const createConversation = (members) => {
        setConversations((prevConversation) => {
            return [...prevConversation, { members, messages: [] }]
        })
    }

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        createConversation,
        sendMessage,
        selectedConversationIndex: setSelectedConversationIndex
    }
    return (

        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    )
}
