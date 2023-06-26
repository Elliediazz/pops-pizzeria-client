import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + 'users/login', {
        email,
        password,
      });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });

      navigate("/shoppingcart");
    } catch (error) {
      toast.error("Incorrect username or password", {
        position: toast.POSITION.TOP_CENTER,
      });

      dispatch({ 
        type: 'LOGIN_FAILURE',
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
        <Button block='true' size="lg" type="submit" disabled={!validateForm()}>
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
};

export default Login;

