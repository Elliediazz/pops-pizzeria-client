import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const { dispatch } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function validateForm() {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/; // Regular expression to match letters and spaces
  
    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length >= 8 &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      nameRegex.test(name)
    );
  }   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/users/signup', {
        name: name,
        email: email,
        password: password,
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
      console.error("Signup error:", error);
      toast.error("Failed to sign up. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });

      dispatch({
        type: "LOGIN_FAILURE",
      });
    }
  };
  
  const renderError = (field) => {
    if (
      !validateForm() &&
      (errors[field] || document.activeElement.id === field)
    ) {
      if (field === "name") {
        return (
          <div className="error">Please enter a valid name (only letters and spaces allowed)</div>
        );
      }
      if (field === "password") {
        return (
          <div className="error">
            Password must be at least 8 characters and contain at least one letter and one number.
          </div>
        );
      }
      if (field === "email") {
        return <div className="error">Please enter a valid email address</div>;
      }
    }
  
    return null;
  };  
  
  const handleFieldChange = (e) => {
    const { id, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    if (id === "name") {
      const sanitizedValue = value.replace(/[^A-Za-z\s]/g, ""); // Remove characters other than letters and spaces
      setName(sanitizedValue);
      if (errors.name) {
        setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
      }
    } else if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
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
            onChange={handleFieldChange}
          />
          {renderError("name")}
        </Form.Group>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={handleFieldChange}
          />
          {renderError("email")}
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handleFieldChange}
          />
          {renderError("password")}
        </Form.Group>
        <br />
        <Button
          block="true"
          size="lg"
          type="submit"
          disabled={!validateForm()}
        >
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

export default Signup;