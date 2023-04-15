import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./auth";
import ChatRoutes from "./chat";
import SetAvatarRoutes from "./setAvatar";
import PrivateRoutes from 'utils/privateRoutes';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/*" element={<ChatRoutes />} />
        <Route path="/setAvatar/*" element={<SetAvatarRoutes />} />
      </Route>
      <Route path="/*" element={<h1>Error</h1>}></Route>
    </Routes>
  );
}

export default AllRoutes;

