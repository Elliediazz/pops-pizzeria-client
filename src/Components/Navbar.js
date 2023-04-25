import React from "react";
import '../Styling/Components.css';
import logo from "../Components/Assets/PopsLogo.png";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { IoCartOutline } from "react-icons/io5";

function NavBar() {
  return (
    <div className="navbar-container">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" fixed="top">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto navbar-nav">
            <Navbar.Brand className="navbar-brand" href="/" style={{ color: 'black' }}>
                <img src={logo} alt="Logo" className='logo'/>
              </Navbar.Brand>
              <Nav.Link className="navbar-brand" href="/" style={{ color: 'black', fontFamily: 'Helvetica'}}>Home</Nav.Link>
              <Nav.Link className="navbar-brand" href="/menu" style={{ color: 'black', fontFamily: 'Helvetica' }}>Menu</Nav.Link>
              <Nav.Link className="navbar-brand" href="/specials" style={{ color: 'black', fontFamily: 'Helvetica' }}>Specials</Nav.Link>
              <Nav.Link className="navbar-brand" href="/catering" style={{ color: 'black', fontFamily: 'Helvetica' }}>Catering</Nav.Link>
              <Nav.Link className="navbar-brand" href="/#findus" style={{ color: 'black', fontFamily: 'Helvetica' }}>Find Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className='icons'>
          {/* <div><SocialIcon url="https://www.facebook.com/popspizzaRonkonkoma/" target="_blank" network="facebook" className='icon'/></div>	
          <div><SocialIcon url="https://www.instagram.com/popspizzaronkonkoma/" target="_blank" network="instagram" className='icon'/></div>	 */}
          <div>
            <a href="/order" style={{ color: 'black'}}><IoCartOutline size="40px"/></a>   
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;


