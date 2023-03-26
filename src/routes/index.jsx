import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./auth";
import ChatRoutes from "./chat";
import SetAvatarRoutes from "./setAvatar";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/setAvatar/*" element={<SetAvatarRoutes />} />
      <Route path="/" element={<ChatRoutes />} />
    </Routes>
  );
}

export default AllRoutes;
