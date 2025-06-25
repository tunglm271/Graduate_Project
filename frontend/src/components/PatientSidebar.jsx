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
import { Newspaper, Hospital, Info, Headset  } from "lucide-react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MenuIcon from "@mui/icons-material/Menu";
import { PatientLayoutContext } from "../context/PateintLayoutProvider";
import Cookies from "js-cookie";

const PatientSidebar = () => {
  const { t } = useTranslation();
  const { sidebarCollapse, setSidebarCollapse } =
    useContext(PatientLayoutContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isAuthenticated = !!Cookies.get("token");

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
        <p className="text-white font-bold text-2xl">Docify</p>
      </Link>

      <div id="nav-bar">
        {
          !isAuthenticated ?
          <NavLink
            to="/"
            icon={<Info />}
            text={t("about")}
            collapse={sidebarCollapse}
          />
          :
          <NavLink
            to="/home"
            icon={<HomeIcon size={26} />}
            text={t("homepage")}
            collapse={sidebarCollapse}
          />
        }
        {
          isAuthenticated &&
          <NavLink
            to="/appointments"
            icon={<CalendarIcon size={24} />}
            text={t("booking")}
            collapse={sidebarCollapse}
          />
        }
        {
          isAuthenticated && 
          <NavLink
            to="/health-profile"
            icon={<PeopleOutlineIcon />}
            text={t("health-profile")}
            collapse={sidebarCollapse}
          />
        }
        {
          isAuthenticated &&
          <NavLink
            to="/medicines"
            icon={<PillIcon size={24} />}
            text={t("medicine-management")}
            collapse={sidebarCollapse}
          />
        }
        <NavLink
          to="/services"
          icon={<MedicalService size={24} />}
          text={t("service-search")}
          collapse={sidebarCollapse}
        />
        <NavLink
          to="/clinics"
          icon={<Hospital size={20} />}
          text={t("facility")}
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
        <div className={`flex items-center space-x-1 justify-center`}>
          {
            sidebarCollapse &&
            <>
              <Headset className="text-white w-8 h-8"/>
              <div className="text-white text-left">
                  <p className="nav-link-text mb-0 font-semibold text-sm">Hỗ trợ đặt khám</p>
                  <p className="nav-link-text text-[#ffb54a] font-semibold text-lg">1900 1234</p>
              </div>
            </>
          }
        </div>
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
            top: 8,
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
        width: sidebarCollapse ? "220px" : "100px",
      }}
    >
      {sidebarContent}
    </div>
  );
};

export default PatientSidebar;
