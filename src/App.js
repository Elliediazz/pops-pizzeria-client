import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NavBar from './Components/Navbar';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <header><NavBar /></header>
        <Routes>
        <Route exact path='/' element={<Home />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
