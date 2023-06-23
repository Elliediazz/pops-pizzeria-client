import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      localStorage.setItem("token", token);

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`Key: ${key}, Value: ${value}`);
      }
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
      axios.post(process.env.REACT_APP_BACKEND_URL + 'users/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("specialSelected");
      
      })
      .catch(error => {
        toast.error("Unable to Logout, please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
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

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await axios.get(process.env.REACT_APP_BACKEND_URL + 'users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          //Invalid token
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        //Token not found
        return {
          ...state,
          isAuthenticated: false,
          token: null,
          user: null,
        };
      }
    };

    checkTokenValidity();
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
