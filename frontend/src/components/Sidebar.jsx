import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import NavLink from "./NavLink";
import logo from "../assets/images/logo.png";
import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import CalendarIcon from "../assets/CalendarIcon";
import MedicalService from "../assets/MedicalService";
import PillIcon from "../assets/PillIcon";

const Sidebar = () => {
  const { collapse } = useContext(UserContext);

  return (
    <div id="sidebar" style={{ width: collapse ? "250px" : "150px" }}>
      <Link
        to="/"
        style={{
          display: "flex",
          flexDirection: collapse ? "row" : "column",
          textDecoration: "none",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <img src={logo} alt="logo" className="logo" />
        <h2 style={{ color: "white", textDecoration: "none" }}>Docify</h2>
      </Link>

      <div id="nav-bar">
        <NavLink
          to="/"
          icon={<HomeIcon />}
          text="Tranh chủ"
          collapse={collapse}
        />
        <NavLink
          to="/appoinments"
          icon={<CalendarIcon size={24} />}
          text="Đặt lịch hẹn"
          collapse={collapse}
        />
        <NavLink
          to="/services"
          icon={<MedicalService size={24} />}
          text="Tìm kiếm dịch vụ"
          collapse={collapse}
        />
        <NavLink
          to="/health-profile"
          icon={<PeopleOutlineIcon />}
          text="Hồ sơ sức khỏe"
          collapse={collapse}
        />
        <NavLink
          to="/medicine"
          icon={<PillIcon size={24} />}
          text="Quản lí thuốc"
          collapse={collapse}
        />
      </div>

      <Button
        sx={{
          color: "#897ee0",
          "&:hover": {
            color: "#f0f0f0",
          },
        }}
      >
        <LogoutIcon />
      </Button>
    </div>
  );
};

export default Sidebar;