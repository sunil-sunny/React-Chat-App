import React from 'react'
import { ListGroup } from 'react-bootstrap'
import {useConversations} from '../context/ConversationProvider'

export default function Conversations() {

    const {conversations,selectedConversationIndex }=useConversations()

    return (
        <ListGroup variant="flush">
            {conversations.map((conversation, index) => (

                <ListGroup.Item key={index}
                action
                onClick={()=> selectedConversationIndex(index)}
                active={conversation.selected}>
                    {conversation.members.map(member=>member.name).join(', ')}
                </ListGroup.Item>
            ))}
        </ ListGroup>
    )
}
