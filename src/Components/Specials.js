import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import menuimg from "./Assets/pepperoni.jpg";

function SpecialsMenu() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cart = useContext(CartContext);
  const { specialSelected } = cart;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/specials/all");
        if (response.status !== 200) {
          throw new Error("Failed to fetch specials");
        }
        const data = await response.data;
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
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="loading">
        <h1>No items available</h1>
      </div>
    );
  }

  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const availableSpecials = data.filter((special) => {
    if (special.day && special.day !== currentDay) {
      return false;
    }

    if (special.startTime && special.endTime && (currentTime < special.startTime || currentTime > special.endTime)) {
      return false;
    }

    return true;
  });

  return (
    <div className="menu-page">
      <Container className="container">
        <Row xs={1} sm={2} md={3} className="g-3">
          {data.map((specials, index) => {
            const isAvailable =
              (!specials.day || specials.day === currentDay) &&
              (!specials.startTime || !specials.endTime || (currentTime >= specials.startTime && currentTime <= specials.endTime));

            return (
              <Col key={index}>
                <Card className={`menu-card ${isAvailable ? "" : "unavailable"}`}>
                  <div>
                    <img className="menu-card-img" src={menuimg} alt={specials.name} />
                  </div>
                  <Card.Body>
                    <div className="title">
                      <h1>{specials.name}</h1>
                      <div className="description">
                        <p>{specials.description && specials.description}</p>
                      </div>
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
                      <Button 
                      type="button" 
                      className="btn btn-dark disabled"
                      >
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

