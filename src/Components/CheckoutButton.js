import axios from 'axios'
import { Button } from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from '../AuthContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CheckoutButton = ({ cartItems} ) => {

  const { state: { isAuthenticated, user } } = useContext(AuthContext);
  
  //console.log(cartItems);
  
  const handleCheckout = () =>{
    if (isAuthenticated) {

      axios.post(process.env.REACT_APP_BACKEND_URL + '/stripe/checkout', {
        items: cartItems,
        userId: user._id,
      }).then((response)=>{
        if (response.data.url){
          window.location.href= response.data.url
        }
      }).catch((error) => { 
        toast.error("Unable to Checkout, Please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    } else {
      toast.error("Not Authenticated, Please Login.", {
        position: toast.POSITION.TOP_CENTER,
      });
      window.location.href = '/login'
    }
  }

  return (
    <div className="stripe-checkout-button">
      <Button onClick={() => handleCheckout()}>Checkout</Button>
    </div>
  );
};

export default CheckoutButton;