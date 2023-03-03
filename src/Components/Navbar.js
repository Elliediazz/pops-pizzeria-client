import React from "react"
import '../Styling/Components.css'
import logo from "../Assets/PopsLogo.png"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { SocialIcon } from 'react-social-icons';

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
      <Container>
        <Navbar.Brand href="/">< img src={logo} alt="Logo" className='logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/menu">Menu</Nav.Link>
            <Nav.Link href="/specials">Specials</Nav.Link>
            <Nav.Link href="/#findus">Find Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
        <div className='icons'>
            <SocialIcon url="https://www.facebook.com/popspizzaRonkonkoma/" network="facebook" className='icon'/>	
            <SocialIcon url="https://www.instagram.com/popspizzaronkonkoma/" network="instagram" className='icon'/>	
        </div>
    </Navbar>
  );
}

export default NavBar;