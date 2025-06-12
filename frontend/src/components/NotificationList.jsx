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
import NotificationApi from "../service/NotificationApi";

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

    const fetchNotifications = async () => {
      try {
        const data = await NotificationApi.getNotifications();
        console.log(data);
        const Fetchednotifications = data || []
        setNotifications(Fetchednotifications);
        setUnreadCount(Fetchednotifications.filter(n => !n.is_read).length);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();

    const channel = window.Echo.private(`users.${user.id}`)
      .listen(".appointment.booked", (event) => {
        const { appointment } = event;
        const newNotification = {
          data: {
            title: "Yêu cầu khám mới",
            message: "Bạn có yêu cầu khám mới",
            created_at: appointment.created_at,
            link: `/${user.role == 4 ? "facility" : "doctor"}/reservations?id=${appointment.id}`,
          },
        };
        setNotifications((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      })
      .listen(".appointments.assigned", (event) => {
        const { appointment, doctor } = event;
        const newNotification = {
          data: {
            title: "Yêu cầu khám đã được chấp nhận",
            message: "Yêu cầu khám của bạn đã được cơ sở y tế chấp nhận, bác sĩ phụ trách là " + doctor.name + ". Xem tra chi tiết",
            created_at: appointment.updated_at,
            link: `/appointments`,
          },
        };
        setNotifications((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      })
      .listen(".bills.paid", (event) => {
        const { appointment } = event;
        const newNotification = {
          data: {
            title: "Đơn khám đã được thanh toán",
            message: `Đơn khám ${appointment.id} đã được thanh toán. Ấn vào đây để xem chi tiết`,
            created_at: appointment.updated_at,
            link: `/facility/revenue`,
          },
        };
        setNotifications((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      })
      .listen(".appointment.completed", (event) => {
        const { health_profile_id, medical_record_id } = event;
        const newNotification = {
          data: {
            title: "Đơn khám đã được thanh toán",
            message: `Đơn khám ${appointment.id} đã được thanh toán. Ấn vào đây để xem chi tiết`,
            created_at: appointment.updated_at,
            link: `/health-profile/${health_profile_id}/record/${medical_record_id}`,
          },
        };
        setNotifications((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      })
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUnreadCount(0); // Reset unread count when opening menu
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearAll = () => {
    NotificationApi.clearAll()
      .then(() => {
        setNotifications([]);
        setUnreadCount(0);
      })
      .catch((error) => {
        console.error("Failed to clear notifications", error);
      });
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.is_read) {
      await NotificationApi.markAsRead(notification.id);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notification.id ? { ...n, is_read: true } : n
        )
      );
    }
    console.log(getNotificationLink(notification));
    navigate(getNotificationLink(notification));
    handleClose();
  };

  const getNotificationLink = (notification) => {
    if (notification.data?.link) return notification.data.link;

    switch (notification.data.type) {
      case "appointment_booked":
        return `/${user.role == 4 ? "facility" : "doctor"}/reservations?id=${notification.data?.data.appointment_id}`;
      case "appointments.assigned":
        return "/appointments";
      case "bills.paid":
        return "/facility/revenue";
      case "appointment_completed":
        return `/health-profile/${notification.data?.data.health_profile_id}/record/${notification.data?.data.medical_record_id}`;
      default:
        return "/";
    }
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
            px: 2,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="font-semibold">Thông báo</p>
          {notifications.length > 0 && (
            <Button size="small" onClick={handleClearAll}>
              Xóa tất cả
            </Button>
          )}
        </Box>
        <Divider />
        {notifications.length === 0 ? (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography color="text.secondary" sx={{ fontStyle: "italic" }}>Không có thông báo</Typography>
          </Box>
        ) : (
          <List sx={{ width: "100%", p: 0 }}>
            {notifications.map((notification, index) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    cursor: "pointer",
                    py: 1,
                    backgroundColor: notification.is_read ? "inherit" : "rgba(0,0,255,0.05)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{ 
                          fontWeight: notification.is_read ? "normal" : "bold",
                        }}
                        variant="subtitle1"
                      >
                        {notification.data.title || "New Notification"}
                      </Typography>
                    }
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
                          {notification.data.created_at
                            ? format(
                                new Date(notification.data.created_at),
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
