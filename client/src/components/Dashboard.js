import React from 'react'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'


const Dashboard = ({ id }) => {


    return (

        <div className="d-flex" style={{height:'100vh'}}>
            <Sidebar id={id} />
            <OpenConversation/>
        </div>

    )
}

export default Dashboard