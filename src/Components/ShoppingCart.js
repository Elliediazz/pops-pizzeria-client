import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import CartItems from './CartItems';
import CartTotal from './CartTotal';

function ShoppingCart() {
  const cart = useContext(CartContext);
  const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="shopping-cart">
      {itemsCount > 0 && (
        <div className="cart-items">
          {cart.items.map((currentItem, index) => (
            <CartItems key={index} _id={currentItem._id} quantity={currentItem.quantity} />
          ))}
          <div className="total-checkout-container">
          <h1>
            <CartTotal />
          </h1>
          <div className="checkout-btn">
            <Button variant="outline-dark" href="/checkout">
              Checkout Cart
            </Button>
          </div>
          </div>
        </div>
      )}
      {itemsCount === 0 && (
        <div className="empty-cart">
          <h5>Your cart is currently empty</h5>
          <Button variant="success" href="/menu">
            Order Now
          </Button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
