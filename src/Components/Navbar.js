import { useState, useContext } from 'react';
import { Button, Container, Navbar, Nav, Modal } from "react-bootstrap";
import '../Styling/Components.css';
import logo from "../Components/Assets/PopsLogo.png";
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from '../CartContext';
import CartTotal from './Helpers/CartTotal';

function NavBar() {
  const cart = useContext(CartContext)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

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
                  <span>{itemsCount}</span>
                </span>
              </div>
            </Nav>
          </Navbar.Collapse>
          <div className='icons' id="cart">
            <Button onClick={handleShow} style={{ color: '#3f1503', background: "transparent", border: "none"}}><IoCartOutline size="40px" /></Button>
            <span className="bag-quantity">
              <span>{itemsCount}</span>
            </span>
          </div>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemsCount > 0 ?
            <>
                {cart.items.map((currentItem, index)=> (
                  <h1 key={index}>{currentItem.title}</h1>
                ))}

                <h1><CartTotal /></h1>

                <Button varient="success">
                  Purchuse Items!
                </Button>
            </>
          :
            <h1>Your Cart is Empty</h1>
          }
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NavBar;
