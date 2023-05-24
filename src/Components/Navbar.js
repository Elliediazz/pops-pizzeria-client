import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Container, Navbar, Nav, Modal } from 'react-bootstrap';
import '../Styling/Components.css';
import logo from '../Components/Assets/PopsLogo.png';
import { IoCartOutline } from 'react-icons/io5';
import { CartContext } from '../CartContext';
import CartTotal from './CartTotal';
import CartItems from './CartItems';

function NavBar() {
  const cart = useContext(CartContext);

  const [user, setUser] = useState({
    name: '',
    username: '',
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(true);

  const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      console.log("navtoken:", token)
      if (token !== null) {
        try {
          const response = await axios.get('http://localhost:8080/users/authenticate', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("loggedIn?:", response.data);

          localStorage.setItem('token', response.data.token);
          setCurrentUser(response.data);
          setUser({
            name: `${response.data.name}`,
            username: response.data.username,
          });

          setLoading(false);
        } catch (error) {
          //redo: handle error 
          console.log("error", error)
        }
      }
    };
    checkLoginStatus();
  }, []);

  const isLoggedIn = currentUser !== null;
  console.log(currentUser);

  return (
    <div className="navbar-container">
      <Navbar collapseOnSelect expand="lg" className="nav-background" variant="dark" fixed="top">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
            <Nav>
              <Navbar.Brand className="navbar-brand" href="/" style={{ color: '#3f1503' }}>
                <img src={logo} alt="Logo" className="logo" id="display" />
              </Navbar.Brand>
              <Nav.Link className="navbar-brand" href="/menu" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>
                MENU
              </Nav.Link>
              <Nav.Link className="navbar-brand" href="/specials" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>
                SPECIALS
              </Nav.Link>
              <Navbar.Brand className="navbar-brand" href="/" style={{ color: '#3f1503' }}>
                <img src={logo} alt="Logo" className="logo" id="logo" />
              </Navbar.Brand>
              <Nav.Link className="navbar-brand" href="/catering" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>
                CATERING
              </Nav.Link>
              <Nav.Link className="navbar-brand" href="/#findus" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>
                FIND US
              </Nav.Link>
              <div className="icons" id="display">
                <Button onClick={handleShow} style={{ color: '#3f1503' }}>
                  <IoCartOutline size="40px" />
                </Button>
                <span className="bag-quantity">
                  <span>{itemsCount}</span>
                </span>
              </div>
            </Nav>
          </Navbar.Collapse>
          <div className="icons" id="cart">
            <Button
              onClick={handleShow}
              style={{ color: '#3f1503', background: 'transparent', border: 'none' }}
            >
              <IoCartOutline size="40px" />
            </Button>
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
          {itemsCount > 0 ? (
            <div className="align-items-center">
              {cart.items.map((currentItem, index) => (
                <CartItems key={index} _id={currentItem._id} quantity={currentItem.quantity}></CartItems>
              ))}
              <h1>
                <CartTotal />
              </h1>
              {/* <Button variant="success" href="/menu">Add More Items</Button> */}
              {isLoggedIn ? (
                <Button variant="success" href="/checkout">
                  Checkout
                </Button>
              ) : (
                <Button variant="success" href="/login">
                  Login to Checkout
                </Button>
              )}
            </div>
          ) : (
            <div>
              <h5>Your cart is currently empty</h5>
              <Button variant="success" href="/menu">
                Order Now
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NavBar;
