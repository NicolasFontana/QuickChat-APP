import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Components/Auth/Register";
import Login from '../Components/Auth/Login'

function AuthRoutes() {
  return (
    <Routes>
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />}/>
    </Routes>
  );
}

export default AuthRoutes;
