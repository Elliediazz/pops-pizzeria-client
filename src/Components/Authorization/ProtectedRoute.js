import { Navigate } from "react-router-dom"

//Wrapper component to protect routes from unauthorized access - in this case: checkout(Child component)
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    return children;
};

export default ProtectedRoute