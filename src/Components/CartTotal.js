import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

function CartTotal() {
  const { getTotalCost } = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    async function fetchTotalCost() {
      try {
        const cost = await getTotalCost();
        setTotalCost(cost);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTotalCost();
  }, [getTotalCost]);

  if (totalCost === null) {
    return <div className='loading'><p>Loading...</p></div>;
  }
  
  const formattedTotalCost = `$${totalCost.toFixed(2)}`;

  return <div>Total: {formattedTotalCost}</div>;
}

export default CartTotal;

