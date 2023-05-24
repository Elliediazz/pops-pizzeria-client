import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToken from '../../Hooks/useToken';



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token, setToken } = useToken();


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the server
      const response = await axios.post("http://localhost:8080/users/login", {
        email: email,
        password: password
      });
      console.log(response)

      // Set token from response using useToken hook
      setToken(response.data.token);
      //console.log(response.data.token)
      setIsLoggedIn(true);

      navigate("/shoppingcart");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Incorrect username or password", {
        position: toast.POSITION.TOP_CENTER
      });
      
    }
  };

  return (
    <div className="login-page">
      <Form onSubmit={handleSubmit}>
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
          Login
        </Button>

        <div className="text-center">
          <p>
            Not a member? <a href="/signup">Signup</a>
          </p>
        </div>
      </Form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
