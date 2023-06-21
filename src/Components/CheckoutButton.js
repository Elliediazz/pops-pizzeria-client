import axios from 'axios'
import { Button } from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from '../AuthContext';



const CheckoutButton = ({ cartItems} ) => {

  const { state } = useContext(AuthContext);
  const { isAuthenticated, user } = state;
  
  //console.log(cartItems);
  
  const handleCheckout = () =>{
    if (isAuthenticated) {
      const User= JSON.parse(user)

      axios.post("http://localhost:8080/stripe/checkout", {
        items: cartItems,
        userId: User._id,
      }).then((response)=>{
        if (response.data.url){
          window.location.href= response.data.url
        }
      }).catch((error) => { 
          console.log(error.message)
      });
    } else {
      // Handle the case when the user is not authenticated
      console.log("not authenticated")
    }
  }

  return (
    <div className="stripe-checkout-button">
      <Button onClick={() => handleCheckout()}>Checkout</Button>
    </div>
  );
};

export default CheckoutButton;