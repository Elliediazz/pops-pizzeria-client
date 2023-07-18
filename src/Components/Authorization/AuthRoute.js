import { Navigate } from "react-router-dom"

//Wrapper component to stop logged in users from acessing the login and sign up pages(Child components)
const AuthRoute = ({ children }) => {
    const token = localStorage.getItem("token");
  
    if (token) {
      return <Navigate to="/shoppingcart" />;
    }
    // If the user is not logged in , the component renders the content or nested components passed between the <AuthRoute> tags
    return children;
};

export default AuthRoute