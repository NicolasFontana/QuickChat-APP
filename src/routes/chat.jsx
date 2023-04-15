import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Chat from '../Components/Chat'
import Error404 from 'Components/Shared/Error404'

function ChatRoutes() {
  return (
    <Routes>
      <Route exact path='/' element={<Chat />}/>
      <Route path="*" element={<Error404 />}></Route>
    </Routes>
  )
}

export default ChatRoutes
