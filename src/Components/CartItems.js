import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { CartContext } from '../CartContext';

import menuimg from './Assets/vodkapasta.jpg';

function CartItems(props) {
  const cart = useContext(CartContext);
  const { _id, quantity } = props;
  const [itemData, setItemData] = useState();

  useEffect(() => {
    async function fetchItemData() {
      try {
        const data = await cart.getItemData(_id);
        setItemData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchItemData();
  }, [cart, _id]);


  if (!itemData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='cart-items'>
      {/* <img src={itemData.img}></img> */}
      <img className="cart-img" src={menuimg} alt={itemData.name} />
      <Form as={Row}>                  
        <Form.Label column="true" sm="6"><h3>{itemData.name}</h3></Form.Label>
        <Row sm="6" className="align-items-center">
          <Button sm="3" onClick={() => cart.addOneToCart(_id)} variant="outline-dark" className="mx-2 btn-sm">+</Button>
          <h3 className="text-center">{quantity}</h3>
          <Button sm="3" onClick={() => cart.removeOneFromCart(_id)} variant="outline-dark" className="mx-2 btn-sm">-</Button>
        </Row>
        <p>${(itemData.price).toFixed(2)}</p>
        {/* <p>${(quantity * itemData.price).toFixed(2)}</p> */}
        <Button size="sm" variant='danger' onClick={() => cart.deleteFromCart(_id)}>Remove</Button>
      </Form> 
    </div>
  );
}

export default CartItems;
