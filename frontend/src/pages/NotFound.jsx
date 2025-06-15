import { Link } from "react-router-dom";
import NotFoundImg from "../assets/404.png";
import { getUser } from "../utlis/auth";

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
      return "/auth/login"; // If no role or not logged in, go to login
  }
};

const NotFound = () => {
  const user = getUser();
  const returnUrl = getDefaultRouteByRole(user?.role);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={NotFoundImg}
        alt=""
        style={{ maxHeight: "50vh", width: "auto", margin: "auto" }}
      />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link
        to={returnUrl}
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "#007bff",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        {user ? "Go to Dashboard" : "Go to Login"}
      </Link>
    </div>
  );
};

export default NotFound;
