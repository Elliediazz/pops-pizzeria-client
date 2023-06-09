import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartTotal() {
  const { getTotalCost } = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    async function fetchTotalCost() {
      try {
        const cost = await getTotalCost();
        setTotalCost(cost);
      } catch (error) {
        toast.error("Error getting total cost", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }

    fetchTotalCost();
  }, [getTotalCost]);

  if (totalCost === null) {
    return <div className='loading'><p>Loading...</p></div>;
  }
  
  const formattedTotalCost = `$${totalCost.toFixed(2)}`;

  return <div className="formatted-total"> {formattedTotalCost} </div>;
}

export default CartTotal;