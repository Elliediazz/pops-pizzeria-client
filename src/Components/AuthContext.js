import React, { createContext, useReducer } from "react";
import axios from "axios";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
  showCartModal: false,
};

const reducer = async (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { email, password } = action.payload;

      try {
        const response = await axios.post("http://localhost:8080/users/login", {
          email,
          password,
        },
        { withCredentials: true });

        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));

        return {
          ...state,
          isAuthenticated: true,
          user,
          token,
        };
      } catch (error) {
        console.error("Login error:", error);
        return state;
      }

    case "LOGOUT":
      try {
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:8080/users/logout", null, { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true });
        
      } catch (error) {
        console.error("Logout error:", error);
      }

      // Clear the user and token from local storage or state
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    default:
      return state;
  }
};


function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
