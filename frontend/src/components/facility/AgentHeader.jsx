import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ConversationList from "../ConversationList";
import {
  IconButton,
  Stack,
  Divider,
  Badge,
  Avatar,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutRequest } from "../../service/authApi";
import { useNavigate } from "react-router-dom";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

const AgentHeader = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { showSuccessSnackbar } = useCustomSnackbar();
  const { user } = useContext(AppContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logoutRequest();
      navigate("/auth/login");
      showSuccessSnackbar(t("msg.log-out-success"));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div className="facility-header">
      <h2>{t("homepage")}</h2>
      <div className="facility-header-search bg-slate-200">
        <SearchIcon />
        <input type="text" placeholder={t("service-search")} />
      </div>
      <IconButton sx={{ backgroundColor: "#155dfc", color: "white" }}>
        <AddIcon />
      </IconButton>
      <Stack direction="row" spacing={1}>
        <IconButton>
          <InfoIcon />
        </IconButton>
        <IconButton>
          <SettingsApplicationsIcon />
        </IconButton>
      </Stack>
      <Divider orientation="vertical" flexItem />
      <IconButton>
        <Badge
          badgeContent={4}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              transform: "scale(1) translate(50%, -50%)",
              margin: "3px",
            },
          }}
        >
          <CircleNotificationsIcon
            sx={{
              fontSize: "30px",
              opacity: 1,
              color: "rgba(0, 0, 0, 1)",
            }}
          />
        </Badge>
      </IconButton>
      <ConversationList />
      <Divider orientation="vertical" flexItem />
      <ListItemButton
        sx={{ flexGrow: 0 }}
        onClick={handleClick}
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <ListItemAvatar>
          <Avatar src={user.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body1" fontWeight="bold">
              {user?.name || "John Doe"}
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={"10px"}
            >
              {user?.role_id === 3 ? t("header.doctor") : t("header.facility")}
            </Typography>
          }
        />
      </ListItemButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <PersonIcon sx={{ mr: 1 }} />
          {t("header.patient.profile")}
        </MenuItem>
        <MenuItem>
          <SettingsIcon sx={{ mr: 1 }} />
          {t("header.patient.setting")}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          {t("header.patient.log-out")}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AgentHeader;
