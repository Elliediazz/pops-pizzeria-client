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
  specialSelected: "",
  getSelectedOptions: () => {},
});

function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [specialSelected, setSpecialSelected] = useState(
    localStorage.getItem('specialSelected') || ''
  );

  const [menuData, setMenuData] = useState([]);
  const [specialsData, setSpecialsData] = useState([]);
  const combinedData = [...menuData, ...specialsData];

console.log(cartItems)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuResponse, specialsResponse] = await Promise.all([
          axios.get(process.env.REACT_APP_BACKEND_URL + '/menu/all'),
          axios.get(process.env.REACT_APP_BACKEND_URL + '/specials/all')
        ]);
  
        if (menuResponse.status !== 200 || specialsResponse.status !== 200) {
          throw new Error("Failed to fetch data");
        }
  
        const menuData = menuResponse.data;
        const specialsData = specialsResponse.data;
  
        setMenuData(menuData);
        setSpecialsData(specialsData);
      } catch (error) {
        toast.error("Failed to fetch data", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('specialSelected', specialSelected);
  }, [specialSelected]);  

  function getItemQuantity(_id) {
    const quantity = cartItems.find((item) => item._id === _id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(_id, selectedOptions) {
    const quantity = getItemQuantity(_id);
  
    // Find the item in the combinedData array using the _id
    const item = combinedData.find((item) => item._id === _id);
  
    if (quantity === 0 && item) {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        {
          _id: _id,
          name: item.name,
          quantity: 1,
          price: item.price,
          image: item.img,
          selectedOptions: selectedOptions,
        },
      ]);
  
      if (specialsData.some((special) => special._id === _id)) {
        setSpecialSelected(_id);
      }
    } else if (item) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  }  
  
  const getSelectedOptions = (itemId) => {
    const cartItem = cartItems.find((item) => item._id === itemId);
    return cartItem ? cartItem.selectedOptions : {};
  }; 

  function removeOneFromCart(_id) {
    const quantity = getItemQuantity(_id);

    if (quantity === 1) {
      deleteFromCart(_id);

      if (specialSelected === _id) {
        setSpecialSelected("");
      }
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

    if (specialSelected === _id) {
      setSpecialSelected("");
    }
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
      const combinedData = [...menuData, ...specialsData];
      const item = combinedData.find((item) => item._id === _id);
  
      if (item) {
        console.log(item);
        return item;
      } else {
        const menuResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/menu/${_id}`);
  
        if (menuResponse.status === 200) {
          return menuResponse.data;
        } else if (menuResponse.status === 404) {
          const specialsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/specials/${_id}`);
  
          if (specialsResponse.status === 200) {
            return specialsResponse.data;
          } else {
            throw new Error(`Failed to get specials data for ID ${_id}`);
          }
        } else {
          throw new Error(`Failed to get menu data for ID ${_id}`);
        }
      }
    } catch (error) {
      console.log(error);
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
    specialSelected,
    getSelectedOptions,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;