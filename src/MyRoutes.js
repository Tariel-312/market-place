import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminProvider from "./contexts/AdminProvider";
import AuthProvider from "./contexts/AuthProvider";
import ClientProvider from "./contexts/ClientProvider";
import AddProduct from "./pages/AddProduct";
import AdminPanel from "./pages/AdminPanel";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";

const MyRoutes = () => {
  return (
    <AuthProvider>
    <AdminProvider>
      <ClientProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/add" element={<AddProduct />}/>
          <Route path='/admin' element={<AdminPanel/>}/>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/product/:id' element={<ProductDetail/>} />
          <Route path='/cart' element = {<CartPage/>} />
        </Routes>
      </BrowserRouter>
      </ClientProvider>
    </AdminProvider>
    </AuthProvider>
  );
};

export default MyRoutes;
