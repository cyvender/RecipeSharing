import { Navigate } from "react-router-dom";
import { useAuth } from "../Context";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    return user ? children : <Navigate to='/login' replace />;
}

export default PrivateRoute;