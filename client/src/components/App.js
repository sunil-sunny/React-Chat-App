import React from 'react'
import Login from "./Login"
import useLocalStorage from '../hooks/useLocalStorage'
import Dashboard from "./Dashboard"
import { ContactsProvider } from '../context/ContactsProvider'
import { ConversationProvider } from '../context/ConversationProvider'
import { SocketProvider } from '../context/SocketProvider'

const App = () => {

  const [id, setId] = useLocalStorage('id')

  const dashboard = (

    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationProvider id={id}>
          <Dashboard id={id} />
        </ConversationProvider>
      </ContactsProvider >
    </SocketProvider>

  )

  return (
    <>
      {id ? dashboard : <Login onIdSubmit={setId} />}

    </>
  );
}

export default App;
