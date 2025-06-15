import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ role, element, requireAuth = true }) => {
  const location = useLocation();
  const authToken = Cookies.get("token");
  const userRole = Cookies.get("role");

  // If authentication is not required, just return the element
  if (!requireAuth) {
    return element;
  }

  const isAuthenticated = !!authToken && userRole == role;

  if (!isAuthenticated) {
    // Lưu intended route và role yêu cầu vào cookies
    Cookies.set("intendedRoute", location.pathname, { expires: 0.02 }); // Hết hạn sau 30 phút
    Cookies.set("intendedRole", role, { expires: 0.02 }); // Hết hạn sau 30 phút
    return <Navigate to="/auth/login" />;
  }

  return element;
};

export default ProtectedRoute;
