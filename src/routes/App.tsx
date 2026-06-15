import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import AppRoutes from "./index";
import Toast from "../components/notifications/Toast";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Toast />
    </BrowserRouter>
  );
}
