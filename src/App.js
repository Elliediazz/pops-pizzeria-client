import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NavBar from './Components/Navbar';
import Home from './Components/Home';
import SpecialsMenu from './Components/Specials';

function App() {
  return (
    <div className="App">
      <Router>
        <header><NavBar /></header>
        <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/specials' element={<SpecialsMenu />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
