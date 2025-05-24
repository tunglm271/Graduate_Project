import { Link } from "react-router-dom";
import NotFoundImg from "../assets/404.png";
import { getUser } from "../utlis/auth";

const NotFound = () => {
  const user = getUser();
  const returnUrl = user?.role === 2 ? "/home" : user?.role === 3 ? "/doctor" : user?.role === 4 ? "/facility/dashboard" : user?.role === 1 ? "/admin" : "/";

  return (
    <div style={{ textAlign: "center", marginTop: "50px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <img src={NotFoundImg} alt="" style={{ maxHeight: "50vh", width: "auto", margin: "auto"}}/>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={returnUrl} style={{
        textDecoration: "none",
        color: "white",
        backgroundColor: "#007bff",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "1rem"
      }}>Go to Home</Link>
    </div>
  );
};

export default NotFound;
