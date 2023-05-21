import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../CartContext";

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
    return <div>Loading...</div>;
  }

  // Format total cost as a currency value (assuming USD)
  const formattedTotalCost = `$${totalCost.toFixed(2)}`;

  return <div>Total: {formattedTotalCost}</div>;
}

export default CartTotal;

