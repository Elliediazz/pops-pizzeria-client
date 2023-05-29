import React, { useState, useContext } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, Navbar, Nav, Modal } from 'react-bootstrap';
import { toast } from "react-toastify";
import '../Styling/Components.css';
import logo from '../Components/Assets/PopsLogo.png';
import { IoCartOutline } from 'react-icons/io5';
import { CartContext } from '../CartContext';
import { AuthContext } from './AuthContext';
import CartTotal from './CartTotal';
import CartItems from './CartItems';

function NavBar() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(state.isAuthenticated)
  console.log(localStorage.getItem("token"))

  const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Send logout request to the server
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/users/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Handle the response
      console.log(response.data);
  
      // Dispatch the LOGOUT action asynchronously
      dispatchLogout();
  
      navigate("/shoppingcart");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  
  // Define a separate dispatch function to handle the logout action asynchronously
  const dispatchLogout = async () => {
    try {
      await dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (error) {
      console.error("Dispatch logout error:", error);
    }
  };
  

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
            </Nav>
          </Navbar.Collapse>
          <div className="icons" id="cart">
            <Button
              onClick={handleShow}
              style={{ color: '#3f1503', background: 'transparent', border: 'none' }}>
              <IoCartOutline size="40px" />
            </Button>
            <span className="bag-quantity">
              <span>{itemsCount}</span>
            </span>
            {state.isAuthenticated ? (
              <div>
                <Nav.Link className="navbar-brand logout" onClick={handleLogout} style={{ color: '#3f1503', fontFamily: 'Helvetica' }}
                  >Logout
                </Nav.Link>
              </div>
              ) : (
                <Nav.Link className="navbar-brand logout" href="/login" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}
                  >Login
                </Nav.Link>
              )}
          </div>
        </Container>
      </Navbar>

      {/* Modal Cart */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemsCount > 0 ? (
            <div className="align-items-center">
              {cart.items.map((currentItem, index) => (
                <CartItems key={index} _id={currentItem._id} quantity={currentItem.quantity} />
              ))}
              <h1>
                <CartTotal />
              </h1>
              {state.isAuthenticated ? (
                <div>
                  <Button variant="success" className="logout-btn" href="/checkout">
                    Checkout
                  </Button>
                  <Button className="logout-btn" onClick={handleLogout} variant="success">
                    Logout
                  </Button>
              </div>
              ) : (
                <Button variant="success" className="logout-btn" href="/login">
                  Login to Checkout
                </Button>
              )}
            </div>
          ) : (
            <div>
              <h5>Your cart is currently empty</h5>
              {state.isAuthenticated ? (
                <div>
                  <Button variant="success" href="/menu">
                    Order Now
                  </Button>
                  <Button className="navbar-brand logout" onClick={handleLogout} variant="success">
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="success" href="/login">
                  Login to Order
                </Button>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NavBar;

