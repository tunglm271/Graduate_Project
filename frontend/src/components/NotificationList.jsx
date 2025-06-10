import React, { useState, useEffect, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import EchoInstance from "../echo";
import { getUser } from "../utlis/auth";
import useCustomSnackbar from "../hooks/useCustomSnackbar";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const NotificationList = () => {
  const { t } = useTranslation();
  const { showSuccessSnackbar } = useCustomSnackbar();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const channel = window.Echo.private(`users.${user.id}`)
      .listen(".appointment.booked", (event) => {
        const { appointment } = event;
        const newNotification = {
          data: {
            title: "Yêu cầu khám mới",
            message: "Bạn có yêu cầu khám mới",
            time: appointment.created_at,
            link: `/${user.role == 4 ? "facility" : "doctor"}/reservations?id=${appointment.id}`,
          },
        };
        setNotifications((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      })
      .listen("boardcast-test", (event) => {
        console.log("Boardcast Test", event);
      });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUnreadCount(0); // Reset unread count when opening menu
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <div>
      <IconButton
        aria-label={`show ${unreadCount} new notifications`}
        color="inherit"
        onClick={handleClick}
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <Badge
          badgeContent={unreadCount}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              transform: "scale(1) translate(50%, -50%)",
              margin: "3px",
            },
          }}
        >
          <NotificationsNoneIcon
            sx={{
              fontSize: "30px",
              opacity: 1,
              color: "rgba(0, 0, 0, 1)",
            }}
          />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 400,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Notifications</Typography>
          {notifications.length > 0 && (
            <Button size="small" onClick={handleClearAll}>
              Clear All
            </Button>
          )}
        </Box>
        <Divider />
        {notifications.length === 0 ? (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography color="text.secondary">No notifications</Typography>
          </Box>
        ) : (
          <List sx={{ width: "100%", p: 0 }}>
            {notifications.map((notification, index) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => {
                    navigate(notification.data.link);
                    handleClose();
                  }}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ListItemText
                    primary={notification.data.title || "New Notification"}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          display="block"
                        >
                          {notification.data.message ||
                            "You have a new notification"}
                        </Typography>
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mt: 0.5 }}
                        >
                          {notification.data.time
                            ? format(
                                new Date(notification.data.time),
                                "HH:mm dd/MM/yyyy"
                              )
                            : ""}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Menu>
    </div>
  );
};

export default NotificationList;
