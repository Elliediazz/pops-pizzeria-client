import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import menuimg from './Assets/vodkapasta.jpg';

function CartItems(props) {
  const cart = useContext(CartContext);
  const { _id, quantity } = props;
  const selectedOptions = cart.getSelectedOptions(_id);

  const [itemData, setItemData] = useState();

  useEffect(() => {
    async function fetchItemData() {
      try {
        const data = await cart.getItemData(_id);
        setItemData(data);
      } catch (error) {
        toast.error("Error getting item data", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }

    fetchItemData();
  }, [cart, _id]);


  if (!itemData) {
    return <div>Loading...</div>;
  }

  return (
  <div>
    <Form as={Col} className="justify-content-center items-form" style={{ height: '200px' }}>
      <Col sm={3} className="cart-img-div" >
        <img className="cart-img" src={menuimg} alt={itemData.name} />
      </Col>
      <Col sm={3} className="align-items-center">
        <div>
          <h3>{itemData.name}</h3>
          {itemData.options && itemData.options.length > 0 && (
            <>
              {selectedOptions && Object.entries(selectedOptions).length > 0 ? (
                <ul>
                  {Object.entries(selectedOptions).map(([key, value], index, arr) => {
                    if (index === arr.length - 1 && typeof value === 'object') {
                      const optionValue = value['Choice of:'];
                      return (
                        <li key={key}>
                          {optionValue}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              ) : (
                <p>No options selected</p>
              )}
            </>
          )}
          <Button size="sm" variant='danger' onClick={() => cart.deleteFromCart(_id)}>Remove</Button>
        </div>
      </Col>
      <Col sm={2} className="align-items-center">
        <p>${(itemData.price).toFixed(2)}</p>
      </Col>
      <Col sm={2} className="align-items-center">
        <div className='cart-quantity'>
          <Button onClick={() => cart.removeOneFromCart(_id)} variant="transparent">-</Button>
          <h3>{quantity}</h3>
          <Button onClick={() => cart.addOneToCart(_id)} variant="transparent" >+</Button>
        </div>
      </Col>
      <Col sm={2} className="align-items-center">
        <p>${(quantity * itemData.price).toFixed(2)}</p>
      </Col>
    </Form> 
  </div>
  );
}

export default CartItems;
