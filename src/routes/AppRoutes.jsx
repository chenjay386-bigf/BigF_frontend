import React from "react";
import { Routes, Route } from "react-router-dom";

import BigFApp from "../App";

function AppRoutes() {
  return (
    <Routes>
      {/* Renders BigFApp at the root and for any other path */}
      <Route path="/*" element={<BigFApp />} />
    </Routes>
  );
}

export default AppRoutes;