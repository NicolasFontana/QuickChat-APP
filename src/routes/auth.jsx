import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Components/Auth/Register";
import Login from '../Components/Auth/Login'
import Error404 from "Components/Shared/Error404";

function AuthRoutes() {
  return (
    <Routes>
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/login' element={<Login />}/>
      <Route path="*" element={<Error404 />}></Route>
    </Routes>
  );
}

export default AuthRoutes;
