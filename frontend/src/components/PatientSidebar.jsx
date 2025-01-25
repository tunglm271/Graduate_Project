import { Link } from "react-router-dom";
import HomeIcon from "@icon/HomeIcon";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import NavLink from "./NavLink";
import logo from "../assets/logo.png";
import { Button } from "@mui/material";
import CalendarIcon from "@icon/CalendarIcon";
import MedicalService from "@icon/MedicalService";
import PillIcon from "@icon/PillIcon";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { PatientLayoutContext } from "../context/PateintLayoutProvider";
const PatientSidebar = () => {
  const { t } = useTranslation();
  const { sidebarCollapse } = useContext(PatientLayoutContext);

  return (
    <div
      id="sidebar"
      style={{
        width: sidebarCollapse ? "220px" : "120px",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          flexDirection: sidebarCollapse ? "row" : "column",
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
          to="/home"
          icon={<HomeIcon size={26} />}
          text={t("homepage")}
          collapse={sidebarCollapse}
        />
        <NavLink
          to="/appointments"
          icon={<CalendarIcon size={24} />}
          text={t("booking")}
          collapse={sidebarCollapse}
        />
        <NavLink
          to="/services"
          icon={<MedicalService size={24} />}
          text={t("service-search")}
          collapse={sidebarCollapse}
        />
        <NavLink
          to="/health-profile"
          icon={<PeopleOutlineIcon />}
          text={t("health-profile")}
          collapse={sidebarCollapse}
        />
        <NavLink
          to="/medicine"
          icon={<PillIcon size={24} />}
          text={t("medicine-management")}
          collapse={sidebarCollapse}
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

export default PatientSidebar;
