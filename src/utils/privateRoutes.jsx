import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function privateRoutes() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
}

export default privateRoutes;
