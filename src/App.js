import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NavBar from './Components/Navbar';
import Home from './Components/Home';
import Menu from './Components/Menu';
import SpecialsMenu from './Components/Specials';
import CateringMenu from './Components//Catering';

function App() {
  return (
    <div className="App">
      <Router>
        <header><NavBar /></header>
        <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/specials' element={<SpecialsMenu />}/>
        <Route path='/catering' element={<CateringMenu />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
