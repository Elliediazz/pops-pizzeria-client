import { useContext, useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import menuimg from './Assets/vodkapasta.jpg';

function Menu() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cart = useContext(CartContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/menu/all");
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        toast.error("Error getting Menu", {
          position: toast.POSITION.TOP_CENTER,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div className='loading'><h1>Loading...</h1></div>;
  }

  if (data.length === 0) {
    return <div className='loading'><h1>No items available</h1></div>;
  }

  return (
    <div className="menu-page">
      <Container className="container">
        <Row xs={1} md={6} className="g-3">
          {data.map((menu, index) => (
            <Col key={index} md={5}>
              <Card className="menu-card">
                <div>
                  <img className="menu-card-img" src={menuimg} alt={menu.name} />
                  {/* {menu.img && <img className="menu-card-img" src={menu.img} alt={menu.name} />} */}
                </div>
                <Card.Body>
                  <div className="title">
                    <h1>{menu.name}</h1>
                    <p>{menu.description && menu.description}</p>
                  </div>
                  <div className="menu-card-order">
                    <h5>${menu.price.toFixed(2)}</h5>
                  </div>
                  { cart.getItemQuantity(menu._id) > 0 ?
                    <>
                        <Form as={Row}>
                          
                            <Form.Label column="true" sm="6">In Cart: {cart.getItemQuantity(menu._id)}</Form.Label>
                            <Col sm="6">
                                <Button sm="6" onClick={() => cart.addOneToCart(menu._id)} className="mx-2 btn-dark">+</Button>
                                <Button sm="6" onClick={() => cart.removeOneFromCart(menu._id)} className="mx-2 btn-dark">-</Button>
                            </Col>
                        </Form>
                        <Button variant="danger" onClick={() => cart.deleteFromCart(menu._id)} className="my-2">Remove from cart</Button>
                    </>
                    :
                    <Button type="button" className="btn btn-dark" onClick={() => cart.addOneToCart(menu._id)}>Add To Cart</Button>
                }
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Menu;
