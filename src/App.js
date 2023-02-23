import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Chat from './routes/Chat'
import Login from './routes/Login'
import Register from './routes/Register'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}