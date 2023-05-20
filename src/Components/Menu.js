import { useState, useEffect, useContext } from "react"
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { CartContext } from "../CartContext";
//import { Link } from "react-router-dom"


function Menu() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const cart = useContext(CartContext)

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch("http://localhost:8080/menu/all");
          if (!response.ok) {
            throw new Error("Failed to fetch menu");
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
      return <div>No items available</div>;
    }


    const display = data && (
      <Container>
        <Row xs={1} md={4} className="g-4">
          {data.map((menu, index) => (
            <Col key={index} xs={12} sm={6} md={4} className= "menu">
              <Card className="menu-card">
                <div>
                  {menu.img && <img className="menu-card-img" src={menu.img} alt={menu.name} />}
                </div>
                <Card.Body className="">
                  <div>
                    <h2>{menu.name}</h2>
                  </div>
                  <div>
                    <p>{menu.description && menu.description}</p>
                    <h4>${menu.price.toFixed(2)} USD</h4>
                  </div>
                  <div className="menu-card-order">
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
};

export default Menu;