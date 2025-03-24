import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ role, element }) => {
    const location = useLocation();
    const authToken = Cookies.get("token");
    const userRole = Cookies.get("role");

    const isAuthenticated = !!authToken && userRole == role;

    if (!isAuthenticated) {
        // Lưu intended route vào cookies
        Cookies.set("intendedRoute", location.pathname, { expires: 0.02 }); // Hết hạn sau 30 phút
        return <Navigate to="/auth/login" />;
    }

    return element;
};

export default ProtectedRoute;
