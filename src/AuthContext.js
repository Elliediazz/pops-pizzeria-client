import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
  showCartModal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const { user, token } = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      return {
        ...state,
        isAuthenticated: true,
        token: token,
        user: user,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

