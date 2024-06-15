import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const PrivateRoute = (props) => {
  const isLoggedIn = useSelector(state => state.auth?.isLoggedIn)
  return isLoggedIn ? props.children : <Navigate to="/login" />;
};
export default PrivateRoute;