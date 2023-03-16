import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SetAvatar from 'Components/SetAvatar'

function SetAvatarRoutes() {
  return (
    <Routes>
      <Route path='/' element={<SetAvatar />}/>
    </Routes>
  )
}

export default SetAvatarRoutes