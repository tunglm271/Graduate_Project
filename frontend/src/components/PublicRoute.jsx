import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ element }) => {
  const location = useLocation();
  const authToken = Cookies.get("token");
  const userRole = Cookies.get("role");

  // If user is authenticated, redirect to their dashboard
  if (authToken && userRole) {
    const getDefaultRouteByRole = (role) => {
      switch (role) {
        case "1":
          return "/admin";
        case "2":
          return "/home";
        case "3":
          return "/doctor";
        case "4":
          return "/facility/dashboard";
        default:
          return "/";
      }
    };
    return <Navigate to={getDefaultRouteByRole(userRole)} />;
  }

  return element;
};

export default PublicRoute;
