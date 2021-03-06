import React, { useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'

const SockerContext = React.createContext()
export const useSocket = () => {
    return useContext(SockerContext)
}

export function SocketProvider({ id, children }) {


    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io('http://localhost:5000', { query: { id } })

        setSocket(newSocket)

        return () => newSocket.close()
    }, [id])

    return (
        <SockerContext.Provider value={socket}>
            {children}
        </SockerContext.Provider>
    )
}
