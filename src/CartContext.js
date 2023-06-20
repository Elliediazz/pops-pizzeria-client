import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext({
  items: [],
  getItemQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  getCartItems: () => {},
  getItemData: () => {},
});

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/menu/all");
        if (response.status !== 200) {
          throw new Error("Failed to fetch menu");
        }
        const data = response.data;
        setMenuData(data);
      } catch (error) {
        toast.error("Failed to fetch menu", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function getItemQuantity(_id) {
    const quantity = cartItems.find((item) => item._id === _id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(_id) {
    const quantity = getItemQuantity(_id);
    
    // Find the item in the menuData array using the _id
    const item = menuData.find((item) => item._id === _id);
    console.log(item)
    if (quantity === 0 && item) {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        {
          _id: _id,
          name: item.name,
          quantity: 1,
          price: item.price,
          image: item.img
        },
      ]);
    } else if (item) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  }
  

  function removeOneFromCart(_id) {
    const quantity = getItemQuantity(_id);

    if (quantity === 1) {
      deleteFromCart(_id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === _id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  }

  function deleteFromCart(_id) {
    setCartItems((cartItems) =>
      cartItems.filter((currentItem) => currentItem._id !== _id)
    );
  }

  async function getTotalCost() {
    let totalCost = 0;
  
    const itemDataPromises = cartItems.map((cartContent) =>
      getItemData(cartContent._id)
    );
  
    const itemDataArray = await Promise.all(itemDataPromises);
  
    for (let i = 0; i < itemDataArray.length; i++) {
      const itemData = itemDataArray[i];
      if (itemData !== null) {
        totalCost += itemData.price * cartItems[i].quantity;
      }
    }
  
    return totalCost;
  }  

  async function getCartItems() {
    let cartItems = [];

    for (const cartContent of cartItems) {
      const itemData = await getItemData(cartContent._id);
      if (itemData !== null) {
        cartItems.push(itemData.name);
      }
    }

    return cartItems;
  }

  async function getItemData(_id) {
    try {
      const item = menuData.find((item) => item._id === _id);
      if (item) {
        return item;
      } else {
        const response = await axios.get(`http://localhost:8080/menu/${_id}`);
        if (response.status !== 200) {
          throw new Error(`Failed to fetch item data for ID ${_id}`);
        }
        const data = response.data;
        return data;
      }
    } catch (error) {
      toast.error(`Failed to fetch item data for ID ${_id}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return null;
    }
  }

  const contextValue = {
    items: cartItems,
    getItemQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    getCartItems,
    getItemData,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;