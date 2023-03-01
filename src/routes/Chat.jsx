import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Chat from '../Components/Chat'

function ChatRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Chat />}/>
    </Routes>
  )
}

export default ChatRoutes