import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import NavBar from './Components/Navbar';
import Home from './Components/Home';
import Menu from './Components/Menu';
import { CartProvider } from './CartContext';

import SpecialsMenu from './Components/Specials';
import CateringMenu from './Components//Catering';
import Checkout from './Components/Checkout';
import Cancel from './Pages/Cancel'
import Success from './Pages/Success'
import Error from './Components/Error'

function App() {
  return (
    <CartProvider>
    <div className="App">
      <Router>
        <header><NavBar /></header>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/menu' element={<Menu />}/>
          <Route path='/specials' element={<SpecialsMenu />}/>
          <Route path='/catering' element={<CateringMenu />}/>
          <Route path='/cart' element={<Checkout />}/>
          <Route path='/success' element={<Success />}/>
          <Route path='/cancel' element={<Cancel/>}/>
          <Route path='/error' element={<Error />}/>
          <Route path='*' element={<Navigate to='/error' />} />
        </Routes>
      </Router>
    </div>
    </CartProvider>
  );
}

export default App;
