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
              {/* <Nav.Link className="navbar-brand" href="/" style={{ color: '#3f1503', fontFamily: 'Helvetica'}}>HOME</Nav.Link> */}
              <Nav.Link className="navbar-brand" href="/menu" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>MENU</Nav.Link>
              <Nav.Link className="navbar-brand" href="/specials" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>SPECIALS</Nav.Link>
              <Navbar.Brand className="navbar-brand" href="/" style={{ color: '#3f1503' }}>
                <img src={logo} alt="Logo" className='logo'/>
              </Navbar.Brand>
              <Nav.Link className="navbar-brand" href="/catering" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>CATERING</Nav.Link>
              <Nav.Link className="navbar-brand" href="/#findus" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>FIND US</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className='icons'>
          <div>
            <a href="/order" style={{ color: '#3f1503'}}><IoCartOutline size="40px"/></a>   
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;


