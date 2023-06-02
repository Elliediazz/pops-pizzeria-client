import './Styling/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import NavBar from './Components/Navbar';
import Home from './Components/Home';
import Menu from './Components/Menu';
import CartProvider  from './CartContext';
import AuthProvider from './AuthContext';
import SpecialsMenu from './Components/Specials';
import CateringMenu from './Components//Catering';
import ShoppingCart from './Components/ShoppingCart';
import Checkout from './Components/Checkout';
import Cancel from './Pages/Cancel'
import Success from './Pages/Success'
import Error from './Components/Error'
import Signup from './Components/Signup';
import Login from './Components/Login';
import ProtectedRoute from './Components/Authorization/ProtectedRoute';
import AuthRoute from './Components/Authorization/AuthRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Router>
            <header>
              <NavBar />
            </header>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/specials" element={<SpecialsMenu />} />
              <Route path="/catering" element={<CateringMenu />} />
              <Route path="/signup" element={<AuthRoute><Signup setToken={setToken} /></AuthRoute>} />
              <Route path="/login" element={<AuthRoute><Login setToken={setToken} /></AuthRoute>} />
              <Route path="/shoppingcart" element={<ShoppingCart />} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<Navigate to="/error" />} />
            </Routes>
          </Router>
        </div>
        <ToastContainer />
      </CartProvider>
    </AuthProvider>
  );
}


export default App;
