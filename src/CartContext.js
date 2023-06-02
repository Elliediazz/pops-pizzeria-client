import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  items: [],
  getItemQuantity: () => {},
  addOneToCart: () => {},
  removeOneToCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  getCartItems: () => {},
  getItemData: () => {}
});

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/menu/all");
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error(error);
      }
    }
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

    if (quantity === 0) {
      setCartItems([
        ...cartItems,
        {
          _id: _id,
          quantity: 1,
        },
      ]);
    } else {
      setCartItems(
        cartItems.map((item) =>
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
  
    for (const cartContent of cartItems) {
      const itemData = await getItemData(cartContent._id);
      if (itemData !== null) {
        totalCost += itemData.price * cartContent.quantity;
      }
    }
  
    return totalCost;
  }  

  async function getCartItems() {
    let cartItems = [];

    for (const cartContent of cartItems) {
      const itemData = await getItemData(cartContent._id);
      if (itemData !== null) {
        cartItems.push(itemData.name)
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
        const response = await fetch(`http://localhost:8080/menu/${_id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch item data for ID ${_id}`);
        }
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error getting menu items', error);
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
    getItemData
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
