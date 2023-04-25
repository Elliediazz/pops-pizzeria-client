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
      <Navbar collapseOnSelect expand="lg" className="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto navbar-nav">
              {/* <Nav.Link className="navbar-brand" href="/" style={{ color: 'whitesmoke', fontFamily: 'Helvetica'}}>HOME</Nav.Link> */}
              <Nav.Link className="navbar-brand" href="/menu" style={{ color: 'whitesmoke', fontFamily: 'Helvetica' }}>MENU</Nav.Link>
              <Nav.Link className="navbar-brand" href="/specials" style={{ color: 'whitesmoke', fontFamily: 'Helvetica' }}>SPECIALS</Nav.Link>
              <Navbar.Brand className="navbar-brand" href="/" style={{ color: 'whitesmoke' }}>
                <img src={logo} alt="Logo" className='logo'/>
              </Navbar.Brand>
              <Nav.Link className="navbar-brand" href="/catering" style={{ color: 'whitesmoke', fontFamily: 'Helvetica' }}>CATERING</Nav.Link>
              <Nav.Link className="navbar-brand" href="/#findus" style={{ color: 'whitesmoke', fontFamily: 'Helvetica' }}>FIND US</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className='icons'>
          {/* <div><SocialIcon url="https://www.facebook.com/popspizzaRonkonkoma/" target="_blank" network="facebook" className='icon'/></div>	
          <div><SocialIcon url="https://www.instagram.com/popspizzaronkonkoma/" target="_blank" network="instagram" className='icon'/></div>	 */}
          <div>
            <a href="/order" style={{ color: 'whitesmoke'}}><IoCartOutline size="40px"/></a>   
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;


