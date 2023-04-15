import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SetAvatar from 'Components/SetAvatar'
import Error404 from 'Components/Shared/Error404'

function SetAvatarRoutes() {
  return (
    <Routes>
      <Route path='/' element={<SetAvatar />}/>
      <Route path="*" element={<Error404 />}></Route>
    </Routes>
  )
}

export default SetAvatarRoutes