import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Signup({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send signup request to the server
      const response = await axios.post("http://localhost:8080/users/signup", {
        name: name,
        email: email,
        password: password
      })

      //Set token from response using useToken hook
      const { token } = response.data;
      setToken(token);

      // Takes user to shopping cart once signed up
      navigate("/shoppingcart");
    } catch (error) {
      //redo - better handle error with toast error
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-page">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="col">
          <a href="#!">Forgot password?</a>
        </div>
        <br />
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Signup
        </Button>
        <div className="text-center">
          <p>
            Already a member? <a href="/login">Login</a>
          </p>
        </div>
      </Form>
    </div>
  );
}

Signup.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Signup;


