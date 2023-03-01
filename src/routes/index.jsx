import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./auth";
import ChatRoutes from "./chat";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/chat/*" element={<ChatRoutes />} />
    </Routes>
  );
}

export default AllRoutes;
