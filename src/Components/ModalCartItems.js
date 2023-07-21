import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { CartContext } from '../CartContext';

import menuimg from './Assets/CBRpizza.jpg';

function ModalCartItems (props) {
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
    <div className='modal-cart-items'>
      <div>
        <img
          className="modal-cart-img"
          src={itemData.img ? itemData.img : menuimg}
          alt={itemData.name}
        />
      </div>
      <Form as={Row} className="justify-content-center modal-form" >                  
        <Form.Label column="true" sm="6" className="modal-lable"><h3>{itemData.name}</h3></Form.Label>
        <Row sm="6" className="justify-content-center">
          <Button sm="3" onClick={() => cart.removeOneFromCart(_id)} variant="transparent" className="mx-2 btn-sm"><strong>-</strong></Button>
          <h3 className="text-center">{quantity}</h3>
          <Button sm="3" onClick={() => cart.addOneToCart(_id)} variant="transparent" className="mx-2 btn-sm"><strong>+</strong></Button>
        </Row>
        {/* <p>${(itemData.price).toFixed(2)}</p> */}
        <p>${(quantity * itemData.price).toFixed(2)}</p>
        <Button size="sm" variant='danger' onClick={() => cart.deleteFromCart(_id)}>Remove</Button>
      </Form> 
    </div>
  );
}

export default ModalCartItems;