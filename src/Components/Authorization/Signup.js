import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const { state, dispatch } = useContext(AuthContext);
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
        password: password,
      },{
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({ 
        type: 'LOGIN', 
        payload: {
          email: email,
          password: password,
          user: response.data.user,
          token: response.data.token,
        } 
      });

      navigate("/shoppingcart");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Incorrect username or password", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    const isAuthenticated = state.isAuthenticated;
  
    if (isAuthenticated) {
      navigate("/shoppingcart");
    } else {
      console.log("User is not authenticated");
    }
  }, [navigate, state.isAuthenticated]);

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
        <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
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



