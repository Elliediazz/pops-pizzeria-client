import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import NavBar from './Components/Navbar';
import Home from './Components/Home';
import Menu from './Components/Menu';
import CartProvider  from './CartContext';
import SpecialsMenu from './Components/Specials';
import CateringMenu from './Components//Catering';
import ShoppingCart from './Components/Shopping Cart';
import Cancel from './Pages/Cancel'
import Success from './Pages/Success'
import Error from './Components/Error'
import Signup from './Components/Authorization/Signup';
import Login from './Components/Authorization/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const [token, setToken] = useState("");

  return (
    <CartProvider>
    <div className="App">
      <Router>
        <header><NavBar setToken={setToken}/></header>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/menu' element={<Menu />}/>
          <Route path='/specials' element={<SpecialsMenu />}/>
          <Route path='/catering' element={<CateringMenu />}/>
          <Route path='/signup' element={<Signup setToken={setToken}/>}/>
          <Route path='/login' element={<Login setToken={setToken} />}/>
          <Route path='/shoppingcart' element={<ShoppingCart />}/>
          <Route path='/success' element={<Success />}/>
          <Route path='/cancel' element={<Cancel/>}/>
          <Route path='/error' element={<Error />}/>
          <Route path='*' element={<Navigate to='/error' />} />
        </Routes>
      </Router>
    </div>
    <ToastContainer />
    </CartProvider>
  );
}

export default App;
