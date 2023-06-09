import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../AuthContext';
import { CartContext } from '../CartContext';
import CartItems from './CartItems';
import CartTotal from './CartTotal';

function ShoppingCart() {
  const { state } = useContext(AuthContext);
  const cart = useContext(CartContext);
  const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="shopping-cart-container">
      {itemsCount > 0 && (
        <div className='shopping-cart'>
          <div className='shopping-cart-body'>
            <div className='card-container'>
              <div className="card-header">
                <h2>Total Items In Cart: {itemsCount}</h2>
              </div>
              {cart.items.map((currentItem, index) => (
                <CartItems key={index} _id={currentItem._id} quantity={currentItem.quantity} />
              ))}
            </div>
            <div className='summary-container'>
              <div>
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 >Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span><CartTotal /></span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Tax
                        <span>???</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total:</strong>
                        </div>
                        <span><strong><CartTotal /></strong></span>
                      </li>
                    </ul>
                    <h6 className='taxes'>Taxes calculated at checkout</h6>
                    <div className="checkout-btn">
                      {state.isAuthenticated ? (
                        <div>
                          <Button variant="primary" className="cart-btn" href="/checkout">
                            Checkout Cart
                          </Button>
                        </div>
                      ) : (
                        <Button variant="primary" className="logout-btn" href="/login">
                          Login to Checkout
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="credit-card-container">
                <div className="credit-card-body">
                  <p><strong>We accept</strong></p>
                  <div className="card-img">
                    <img className="me-2" width="45px"
                      src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                      alt="Visa" />
                    <img className="me-2" width="45px"
                      src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                      alt="American Express" />
                    <img className="me-2" width="45px"
                      src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                      alt="Mastercard" />
                  </div>
                </div>
              </div>
            </div>
          </div>        
        </div>
      )}
      {itemsCount === 0 && (
        <div className="empty-cart">
          <h5>Your cart is currently empty</h5>
          <Button variant="success" href="/menu">
            Start Shoppng 
          </Button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
