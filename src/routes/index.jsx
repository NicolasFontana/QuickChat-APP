import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./auth";
import ChatRoutes from "./chat";
import SetAvatarRoutes from "./setAvatar";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/chat/*" element={<ChatRoutes />} />
      <Route path="/setAvatar/*" element={<SetAvatarRoutes />} />
    </Routes>
  );
}

export default AllRoutes;
