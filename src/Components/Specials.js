import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import specialimg from "./Assets/pepperoni.jpg";

function SpecialsMenu() {
  const [specials, setSpecials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});

  const cart = useContext(CartContext);
  const { specialSelected } = cart;

  useEffect(() => {
    async function fetchSpecials() {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/specials/all");
        if (response.status !== 200) {
          throw new Error("Failed to fetch specials");
        }
        const data = response.data;
        setSpecials(data);
      } catch (error) {
        toast.error("Error getting specials", {
          position: toast.POSITION.TOP_CENTER,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchSpecials();
  }, []);

  const handleOptionChange = (specialId, optionName, selectedValue) => {
    // console.log(selectedValue)

    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = {
        ...prevSelectedOptions,
        [specialId]: {
          ...prevSelectedOptions[specialId],
          [optionName]: selectedValue,
        },
      };
  
      // Remove the option if the value is empty
      if (!selectedValue) {
        delete updatedOptions[specialId][optionName];
  
        // Remove the special ID if all options are deselected
        if (Object.keys(updatedOptions[specialId]).length === 0) {
          delete updatedOptions[specialId];
        }
      }
  
      return updatedOptions;
    });
  };

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (specials.length === 0) {
    return (
      <div className="loading">
        <h1>No items available</h1>
      </div>
    );
  }





  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const availableSpecials = specials.filter((special) => {
    if (special.day && special.day !== currentDay) {
      return false;
    }

    if (special.startTime && special.endTime && (currentTime < special.startTime || currentTime > special.endTime)) {
      return false;
    }

    if (special.options && special.options.length > 0) {
      const areAllOptionsSelected = special.options.every((option) => {
        const selectedOption = selectedOptions[special._id] && selectedOptions[special._id][option.name];
        return selectedOption !== undefined && selectedOption !== "";
      });
      return areAllOptionsSelected;
    }

    return true;
  });

  return (
    <div className="specials-menu-page">
      <Container className="specials-container">
        <Row xs={1} sm={2} md={3} className="g-3">
          {specials.map((special) => {
            const isAvailable =
              (!special.day || special.day === currentDay) &&
              (!special.startTime || !special.endTime || (currentTime >= special.startTime && currentTime <= special.endTime));

            const isOptionsSelected = special.options && special.options.length > 0 ? selectedOptions[special._id] !== undefined : true;

            return (
              <Col key={special._id}>
                <Card className={`menu-card ${isAvailable ? "" : "unavailable"}`}>
                  <div className="menu-card-img">
                    <img
                    src={special.img ? special.img : specialimg}
                    alt={special.name}
                  />
                  </div>
                  <Card.Body>
                    <div className="title">
                      <h1>{special.name}</h1>
                      <div className="description">
                        <p>{special.description && special.description}</p>
                      </div>
                    </div>
                    {special.options && special.options.length > 0 && (
                      <div className="options-dropdowns">
                        {special.options.map((option, optionIndex) => (
                          <div className="mb-3" key={optionIndex}>
                            <label className="form-label">{option.name}</label>
                            <select
                              className="form-select"
                              value={selectedOptions[special._id] && selectedOptions[special._id][option.name]}
                              onChange={(e) => handleOptionChange(special._id, option.name, e.target.value)}
                            >
                              <option value="">Select an option</option>
                              {option.choices.map((choice, choiceIndex) => (
                                <option key={choiceIndex} value={choice}>
                                  {choice}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="menu-card-order">
                      <h5>${special.price.toFixed(2)}</h5>
                    </div>
                    {isAvailable ? (
                      cart.getItemQuantity(special._id) > 0 ? (
                        <Button
                          variant="danger"
                          onClick={() => {
                            cart.deleteFromCart(special._id);
                          }}
                          className="my-2"
                        >
                          Remove from cart
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className={`btn btn-dark ${specialSelected || !isOptionsSelected ? "disabled" : ""}`}
                          onClick={() => {
                            if (isOptionsSelected) {
                              cart.addOneToCart(special._id, selectedOptions);
                            }
                          }}
                          disabled={specialSelected !== "" || !isOptionsSelected}
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