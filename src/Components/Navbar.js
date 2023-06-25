import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Container, Navbar, Nav, Modal } from 'react-bootstrap';
import '../Styling/Components.css';
import logo from '../Components/Assets/PopsLogo.png';
import { IoCartOutline } from 'react-icons/io5';
import { IoArrowBack } from 'react-icons/io5';
import { CartContext } from '../CartContext';
import { AuthContext } from '../AuthContext';
import CartTotal from './CartTotal';
import ModalCartItems from './ModalCartItems';
import CheckoutButton from './CheckoutButton';

function NavBar() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // const userString = localStorage.getItem("user");
  // if (userString) {
  //   const user = JSON.parse(userString);
  //   console.log(user.name); // Accessing the "name" property
  //   console.log(user.email); // Accessing the "email" property
  // }

  // console.log(state.isAuthenticated)
  // console.log(localStorage.getItem('token'))
  // console.log(localStorage.getItem('user'))

  const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => { 
    dispatch({ type: 'LOGOUT' });
    setShow(false);
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
    navigate('/');
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
                <img src={logo} alt="Logo" className="logo" id="mid-display" />
              </Navbar.Brand>
              <Nav.Link className="navbar-brand" href="/catering" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>
                CATERING
              </Nav.Link>
              <Nav.Link className="navbar-brand" href="/#findus" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>
                FIND US
              </Nav.Link>
                <Nav.Link
                  href="/shoppingcart"
                  className="navbar-brand"
                  id="display"
                  style={{ color: '#3f1503', fontFamily: 'Helvetica' }}>
                  CART ({itemsCount})
                </Nav.Link>
                {state.isAuthenticated ? (
                  <div>
                    <Nav.Link className="navbar-brand logout" id="display" onClick={handleLogout} style={{ color: '#3f1503', fontFamily: 'Helvetica' }}
                      >Logout
                    </Nav.Link>
                  </div>
                  ) : (
                  <div >
                    <Nav.Link className="navbar-brand login" id="display" href="/login" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}
                      >Login
                    </Nav.Link>
                    <Nav.Link className="navbar-brand login" id="display" href="/signup" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}
                      >Signup
                    </Nav.Link>
                  </div>
                  )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className="icons" id="cart">
          <Button
            onClick={handleShow}
            style={{ color: '#3f1503', background: 'transparent', border: 'none', padding:'0px' }}>
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
            <div className='auth-btn'>
              <Nav.Link className="navbar-brand login" href="/login" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}
                >Login
              </Nav.Link>
              <Nav.Link className="navbar-brand login" href="/signup" style={{ color: '#3f1503', fontFamily: 'Helvetica' }}
                >Signup
              </Nav.Link>
            </div>
            )}
        </div>
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
                <ModalCartItems key={index} _id={currentItem._id} quantity={currentItem.quantity} />
              ))}
              <h2 className='subtotal'>
                Subtotal: <CartTotal />
              </h2>
              {state.isAuthenticated ? (
                <div className="cart-btn">
                  <Button variant="primary"  href="/shoppingcart">
                    My Cart
                  </Button>
                  <CheckoutButton cartItems = {cart.items}/>
                </div>
              ) : (
                <Button variant="primary" className="logout-btn" href="/login">
                  Login to Checkout
                </Button>
              )}
            </div>
          ) : (
            <div>
              <h5>Your cart is currently empty</h5>
              {state.isAuthenticated ? (
                <div className='empty-cart-btn'>
                  <a href="/menu"><IoArrowBack size="20px" /> Start Shopping</a>
                  <Button variant="primary" className="logout" onClick={handleLogout} >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="primary" href="/login">
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
