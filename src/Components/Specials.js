import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { CartContext } from "../CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import menuimg from "./Assets/pepperoni.jpg"

function SpecialsMenu() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  

  const cart = useContext(CartContext);
  const { specialSelected } = cart;
  //console.log("specialSelected:", specialSelected);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/specials/all");
        if (!response.ok) {
          throw new Error("Failed to fetch specials");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        toast.error("Error getting Specials", {
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

  // Check current time and day
  const now = new Date();
  const currentDay = now.getDay(); 
  const currentTime = now.getHours() * 60 + now.getMinutes();

  // Filter specials based on availability
  // eslint-disable-next-line 
  const availableSpecials = data.filter((special) => {
    if (special.day && special.day !== currentDay) {
      // Special is only available on a specific day 
      return false;
    }

    if (
      special.startTime &&
      special.endTime &&
      (currentTime < special.startTime || currentTime > special.endTime)
    ) {
      // Special is only available during a specific time 
      return false;
    }

    return true;
  });

  return (
    <div className="menu-page">
      <Container className="container">
        <Row xs={1} md={6} className="g-3">
          {data.map((specials, index) => {
            const isAvailable =
              (!specials.day || specials.day === currentDay) &&
              (!specials.startTime ||
                !specials.endTime ||
                (currentTime >= specials.startTime && currentTime <= specials.endTime));

            return (
              <Col key={index} md={5}>
                <Card className={`menu-card ${isAvailable ? "" : "unavailable"}`}>
                  <div>
                    <img className="menu-card-img" src={menuimg} alt={specials.name} />
                  </div>
                  <Card.Body>
                    <div className="title">
                      <h1>{specials.name}</h1>
                      <p>{specials.description && specials.description}</p>
                    </div>
                    <div className="menu-card-order">
                      <h5>${specials.price.toFixed(2)}</h5>
                    </div>
                    {isAvailable ? (
                      cart.getItemQuantity(specials._id) > 0 ? (
                        <>
                          <Button
                            variant="danger"
                            onClick={() => {
                              cart.deleteFromCart(specials._id);
                            }}
                            className="my-2"
                          >
                            Remove from cart
                          </Button>
                        </>
                      ) : (
                        <Button
                          type="button"
                          className={`btn btn-dark ${specialSelected ? "disabled" : ""}`}
                          onClick={() => {
                            cart.addOneToCart(specials._id);
                          }}
                          disabled={specialSelected !== ""}
                        >
                          {specialSelected ? "Unavailable" : "Add To Cart"}
                        </Button>
                      )
                    ) : (
                      <Button type="button" className="btn btn-dark disabled">
                        Unavailable
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default SpecialsMenu;
