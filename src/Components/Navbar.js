import React from "react";
import '../Styling/Components.css';
import logo from "../Components/Assets/PopsLogo.png";
import { useState } from 'react';
import { Button, Container, Navbar, Nav, Modal } from "react-bootstrap";
import { IoCartOutline } from "react-icons/io5";

function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="navbar-container">
      <Navbar collapseOnSelect expand="lg" className="nav-background" variant="dark" fixed="top">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
            <Nav>
              <Navbar.Brand className="navbar-brand" href="/" style={{ color: '#3f1503' }}>
                <img src={logo} alt="Logo" className='logo' id="display" />
              </Navbar.Brand>
              <Nav.Link className="navbar-brand" href="/menu" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>MENU</Nav.Link>
              <Nav.Link className="navbar-brand" href="/specials" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>SPECIALS</Nav.Link>
              <Navbar.Brand className="navbar-brand" href="/" style={{ color: '#3f1503' }}>
                <img src={logo} alt="Logo" className='logo' id="logo" />
              </Navbar.Brand>
              <Nav.Link className="navbar-brand" href="/catering" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>CATERING</Nav.Link>
              <Nav.Link className="navbar-brand" href="/#findus" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>FIND US</Nav.Link>
              <div className='icons' id="display">
                <Button onClick={handleShow} style={{ color: '#3f1503' }}><IoCartOutline size="40px" /></Button>
                <span className="bag-quantity">
                  <span>3</span>
                </span>
              </div>
            </Nav>
          </Navbar.Collapse>
          <div className='icons' id="cart">
            <Button onClick={handleShow} style={{ color: '#3f1503', background: "transparent", border: "none"}}><IoCartOutline size="40px" /></Button>
            <span className="bag-quantity">
              <span>3</span>
            </span>
          </div>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>This is the modal body</h1>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NavBar;
