import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import { Toaster } from "react-hot-toast";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { PrivateRoute } from "utils/privateRoute";
import Context from "services/context/context";
import { Publicroute } from "utils/publicRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context>
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/admin/*" element={<PrivateRoute><AdminLayout /></PrivateRoute>} />
        <Route path="/auth/*" element={<Publicroute><AuthLayout /></Publicroute>} />
        <Route path="*" element={<Navigate to="/admin/index" replace />} />
      </Routes>
    </BrowserRouter>
  </Context>
);
