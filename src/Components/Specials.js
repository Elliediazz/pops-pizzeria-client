import { useState, useEffect, useContext } from "react";
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';
import { CartContext } from "../CartContext";

import menuimg from "./Assets/pepperoni.jpg"

function SpecialsMenu() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cart = useContext(CartContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/specials/all");
        if (!response.ok) {
          throw new Error("Failed to fetch specials");
        }
        const data = await response.json();
        //console.log(data);
        setData(data);
      } catch (error) {
        console.error(error);
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
          {data.map((specials, index) => (
            <Col key={index} md={5}>
              <Card className="menu-card">
                <div>
                  <img className="menu-card-img" src={menuimg} alt={specials.name} />
                  {/* {menu.img && <img className="menu-card-img" src={menu.img} alt={menu.name} />} */}
                </div>
                <Card.Body>
                  <div className="title">
                    <h1>{specials.name}</h1>
                    <p>{specials.description && specials.description}</p>
                  </div>
                  <div className="menu-card-order">
                    <h5>${specials.price.toFixed(2)}</h5>
                  </div>
                  { cart.getItemQuantity(specials._id) > 0 ?
                    <>
                        <Form as={Row}>
                          
                            <Form.Label column="true" sm="6">Items In Cart: {cart.getItemQuantity(specials._id)}</Form.Label>
                            <Col sm="6">
                                <Button sm="6" onClick={() => cart.addOneToCart(specials._id)} className="mx-2 btn-dark">+</Button>
                                <Button sm="6" onClick={() => cart.removeOneFromCart(specials._id)} className="mx-2 btn-dark">-</Button>
                            </Col>
                        </Form>
                        <Button variant="danger" onClick={() => cart.deleteFromCart(specials._id)} className="my-2">Remove from cart</Button>
                    </>
                    :
                    <Button type="button" className="btn btn-dark" onClick={() => cart.addOneToCart(specials._id)}>Add To Cart</Button>
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

export default SpecialsMenu;


