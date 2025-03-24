import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const { token } = useSelector((state) => state.auth);
    
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
