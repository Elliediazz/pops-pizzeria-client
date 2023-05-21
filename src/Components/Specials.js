import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { CartContext } from "../CartContext";

import menuimg from "./Assets/pepperoni.jpg"

function SpecialsMenu() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/specials/all");
        if (!response.ok) {
          throw new Error("Failed to fetch specials");
        }
        const data = await response.json();
        console.log(data);
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
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No specials available</div>;
  }

  const display = data && (
    <Container className="container">
      <Row xs={1} md={6} className="g-3 ">
        {data.map((specials, index) => (
          <Col key={index} md={5}>
            <Card className="menu-card">
              <div>
                { <img className="menu-card-img" src={menuimg} alt={specials.name} />}
                {/* {specials.img && <img className="specials-card-img" src={specials.img} alt={specials.name} />} */}
              </div>
              <Card.Body>
                <div className="title">
                  <h1>{specials.name}</h1>
                  <p>{specials.description && specials.description}</p>
                </div>
                <div className="menu-card-order">
                  <h5>${specials.price.toFixed(2)}</h5>
                  <Button type="button" className="btn btn-dark">
                    Order Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );

  return (
    <div className="menu-page">
      {display}
    </div>
  );
}

export default SpecialsMenu;
