import { createContext, useState, useEffect } from "react";

const CartContext = createContext({
  items: [],
  getItemQuantity: () => {},
  addOneToCart: () => {},
  removeOneToCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {}
});

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState([]);

// Need to find a way to incorperate backend to Minute 47:51 in video

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/menu/all");
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error(error);}
    }
    fetchData();
  }, []);

  function getItemData(id) {
    return fetch(`"http://localhost:8080/menu/all"/${id}`)
      .then(response => response.json())
      .catch(error => {
        console.error(`Failed to fetch item data for ID ${id}:`, error);
        return null;
      });
  }

  function getItemQuantity(id) {
    const quantity = cartItems.find(item => item.id === id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getItemQuantity(id);

    if (quantity === 0) {
      setCartItems([
        ...cartItems,
        {
          id: id,
          quantity: 1
        }
      ]);
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  }

  function removeOneToCart(id) {
    const quantity = getItemQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartItems(cartItems =>
      cartItems.filter(currentItem => currentItem.id !== id)
    );
  }

  async function getTotalCost() {
    let totalCost = 0;
    for (const cartContent of cartItems) {
      const itemData = await getItemData(cartContent.id);
      if (itemData) {
        totalCost += itemData.price * cartContent.quantity;
      }
    }
    return totalCost;
  }

  const contextValue = {
    items: cartItems,
    getItemQuantity,
    addOneToCart,
    removeOneToCart,
    deleteFromCart,
    getTotalCost
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider, CartContext };
