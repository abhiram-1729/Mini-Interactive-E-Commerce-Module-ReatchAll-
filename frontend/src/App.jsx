import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import UploadProduct from './pages/UploadProduct';
import ProductDetails from './pages/ProductDetails';
import MainLayout from './components/layout/MainLayout';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <MainLayout onSearch={setSearchTerm}>
              <Routes>
                <Route path="/" element={<Home searchTerm={searchTerm} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/upload"
                  element={
                    <ProtectedAdminRoute>
                      <UploadProduct />
                    </ProtectedAdminRoute>
                  }
                />
              </Routes>
            </MainLayout>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

// Simple Protected Route Component
const ProtectedAdminRoute = ({ children }) => {
  const { userInfo } = useAuth();
  if (!userInfo) return <Navigate to="/login" />;
  if (!userInfo.isAdmin) return <Navigate to="/" />;
  return children;
};

export default App;
