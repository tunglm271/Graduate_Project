import { Link } from "react-router-dom";
import HomeIcon from "@icon/HomeIcon";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import NavLink from "./NavLink";
import logo from "../assets/logo.png";
import {
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CalendarIcon from "@icon/CalendarIcon";
import MedicalService from "@icon/MedicalService";
import PillIcon from "@icon/PillIcon";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { Newspaper } from "lucide-react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MenuIcon from "@mui/icons-material/Menu";
import { PatientLayoutContext } from "../context/PateintLayoutProvider";

const PatientSidebar = () => {
  const { t } = useTranslation();
  const { sidebarCollapse, setSidebarCollapse } =
    useContext(PatientLayoutContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const sidebarContent = (
    <>
      <Link
        to="/home"
        style={{
          display: "flex",
          flexDirection: sidebarCollapse ? "row" : "column",
          textDecoration: "none",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "1rem",
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
          to="/medicines"
          icon={<PillIcon size={24} />}
          text={t("medicine-management")}
          collapse={sidebarCollapse}
        />
        <NavLink
          to="/news"
          icon={<Newspaper size={20} />}
          text={t("news.news")}
          collapse={sidebarCollapse}
        />
        <NavLink
          to="/ai-diagnosis"
          icon={<AutoAwesomeIcon size={20} />}
          text={t("ai-diagnosis")}
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
    </>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={() => setSidebarCollapse(!sidebarCollapse)}
          sx={{
            position: "fixed",
            left: 16,
            top: 16,
            zIndex: 1200,
            color: "primary.main",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "grey.100",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="temporary"
          open={sidebarCollapse}
          onClose={() => setSidebarCollapse(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 220,
              backgroundColor: "#007bff",
              color: "white",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      </>
    );
  }

  return (
    <div
      id="sidebar"
      style={{
        width: sidebarCollapse ? "220px" : "90px",
      }}
    >
      {sidebarContent}
    </div>
  );
};

export default PatientSidebar;
