import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Billing from "./pages/Billing";

import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";

import Login from "./pages/Login";

function Layout({ children }) {
  const location = useLocation();

  // ❌ hide header/footer on login page
  const hideLayout = location.pathname === "/";

  return (
    <>
      {!hideLayout && <Header />}

      {children}

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 🔐 LOGIN */}
          <Route path="/" element={<Login />} />

          {/* 🏠 USER PAGES */}
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/billing" element={<Billing />} />

          {/* 🛠 ADMIN PAGES */}
          {/* 🛠 ADMIN PAGES */}
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/products" element={<AdminProducts />} />
<Route path="/admin/users" element={<AdminUsers />} />
<Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;