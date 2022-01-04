import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import ApplicationBar from "./components/app-bar";
import PersonForm from "./components/product/form";
import PeopleMainPage from "./components/product/pages/main-page";
import ProductDetail from "./components/product/pages/product-details";
import EditProduct from "./components/product/pages/edit-product";
// import Clock from "./components/clock";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ApplicationBar />

      {/*  <Clock timezone="America/Bogota" />
      <Clock timezone="Africa/Abidjan" />
      <Clock timezone="Asia/Dubai" /> */}

      <Routes>
        <Route path="/" element={<PeopleMainPage />} />
        <Route path="create" element={<PersonForm />} />
        <Route path=":productId/details" element={<ProductDetail />} />
        <Route path=":productId/edit" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
