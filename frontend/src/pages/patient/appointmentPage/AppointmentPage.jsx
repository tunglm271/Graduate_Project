import React, { useState, useEffect } from "react";
import {
  Tab,
  Tabs,
  Box,
  Avatar,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  List,
  Stack,
  Skeleton,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
} from "@mui/material";
import "./appointment.css";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import AppointmentCard from "../../../components/card/AppointmentCard";
import appointmentApi from "../../../service/appointmentApi";
import healthProfileApi from "../../../service/healthProfileApi";
import noResult from "../../../assets/noResult.svg";
import PeopleIcon from "@mui/icons-material/People";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AppointmentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const profileId = searchParams.get("profileId");
  const [value, setValue] = useState(0);
  const [healthProfiles, setHealthProfiles] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [completedAppointmentsCount, setCompletedAppointmentsCount] =
    useState(0);
  const [pendingAppointmentsCount, setPendingAppointmentsCount] = useState(0);
  const [assignedAppointmentsCount, setAssignedAppointmentsCount] = useState(0);
  const [cancelledAppointmentsCount, setCancelledAppointmentsCount] =
    useState(0);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    healthProfileApi
      .getAll()
      .then((response) => {
        const profiles = response.data;
        setHealthProfiles(profiles);
        if (profileId) {
          const selectedProfile = profiles.find(
            (profile) => profile.id === profileId
          );
          if (selectedProfile) {
            setSearchParams({ profileId: selectedProfile.id });
          } else {
            setSearchParams({});
          }
        } else if (profiles.length > 0) {
          setSearchParams({ profileId: profiles[0].id });
        }
      })
      .catch((error) => {
        console.error("Error fetching health profiles:", error);
      });
  }, []);

  useEffect(() => {
    if (profileId) {
      setLoading(true);
      appointmentApi
        .getByProfile(profileId)
        .then((response) => {
          const appointments = response.data;
          setAllAppointments(appointments);
          setFilteredAppointments(appointments);

          setCompletedAppointmentsCount(
            appointments.filter(
              (appointment) => appointment.status === "completed"
            ).length
          );
          setPendingAppointmentsCount(
            appointments.filter(
              (appointment) => appointment.status === "pending"
            ).length
          );
          setAssignedAppointmentsCount(
            appointments.filter(
              (appointment) => appointment.status === "assigned"
            ).length
          );
          setCancelledAppointmentsCount(
            appointments.filter(
              (appointment) => appointment.status === "cancelled"
            ).length
          );
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching appointments by profile:", error);
        });
    }
  }, [profileId]);

  useEffect(() => {
    switch (value) {
      case 0:
        setFilteredAppointments(allAppointments);
        break;
      case 1:
        setFilteredAppointments(
          allAppointments.filter(
            (appointment) => appointment.status === "pending"
          )
        );
        break;
      case 2:
        setFilteredAppointments(
          allAppointments.filter(
            (appointment) => appointment.status === "assigned"
          )
        );
        break;
      case 3:
        setFilteredAppointments(
          allAppointments.filter(
            (appointment) => appointment.status === "completed"
          )
        );
        break;
      case 4:
        setFilteredAppointments(
          allAppointments.filter(
            (appointment) => appointment.status === "cancelled"
          )
        );
        break;
      default:
        setFilteredAppointments(allAppointments);
    }
  }, [value, allAppointments]);

  const ProfileList = () => (
    <div id="profile-list">
      <h4>{t("health-profile")}</h4>
      <List>
        {healthProfiles.map((profile, index) => {
          return (
            <ListItem
              key={index}
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor:
                  profileId == profile.id ? "#e3f2fd" : "transparent",
              }}
              button
              onClick={() => {
                setSearchParams({ profileId: profile.id });
                if (isMobile) setMobileDrawerOpen(false);
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    boxSizing: "content-box",
                    border:
                      profileId == profile.id ? "2px solid #007bff" : "none",
                  }}
                  alt="Remy Sharp"
                  src={profile.avatar}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    {profile.name}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ fontSize: "10px" }}>
                    #{t(profile.relationship)}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <div
      className={`flex justify-between gap-5 ${
        isMobile ? "flex-col p-4" : "p-5"
      }`}
    >
      {isMobile ? (
        <>
          <IconButton
            onClick={() => setMobileDrawerOpen(true)}
            sx={{
              position: "fixed",
              left: 16,
              top: 16,
              zIndex: 1200,
              color: "primary.main",
              backgroundColor: "white",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "grey.100",
              },
            }}
          >
            <PeopleIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: "100%",
                maxWidth: 280,
                padding: "20px",
                backgroundColor: "white",
                boxSizing: "border-box",
              },
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">{t("health-profile")}</h4>
              <IconButton onClick={() => setMobileDrawerOpen(false)}>
                <PeopleIcon />
              </IconButton>
            </div>
            <ProfileList />
          </Drawer>
        </>
      ) : (
        <ProfileList />
      )}

      <div
        id="appointment-tab"
        className={isMobile ? "w-full mt-16" : "w-[calc(100%-200px)]"}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            background: "white",
            overflowX: "auto",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
          >
            <Tab
              label={
                <React.Fragment>
                  <p>
                    {t("appointment.filter.all")}{" "}
                    <span className="text-blue-600">
                      ({allAppointments.length})
                    </span>
                  </p>
                </React.Fragment>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <React.Fragment>
                  <p>
                    {t("appointment.card.steps.booked")}{" "}
                    <span className="text-blue-600">
                      ({pendingAppointmentsCount})
                    </span>
                  </p>
                </React.Fragment>
              }
              {...a11yProps(1)}
            />
            <Tab
              label={
                <React.Fragment>
                  <p>
                    {t("appointment.filter.assigned")}{" "}
                    <span className="text-blue-600">
                      ({assignedAppointmentsCount})
                    </span>
                  </p>
                </React.Fragment>
              }
              {...a11yProps(2)}
            />
            <Tab
              label={
                <React.Fragment>
                  <p>
                    {t("appointment.card.steps.completed")}{" "}
                    <span className="text-blue-600">
                      ({completedAppointmentsCount})
                    </span>
                  </p>
                </React.Fragment>
              }
              {...a11yProps(3)}
            />
            <Tab
              label={
                <React.Fragment>
                  <p>
                    {t("appointment.filter.canceled")}{" "}
                    <span className="text-blue-600">
                      ({cancelledAppointmentsCount})
                    </span>
                  </p>
                </React.Fragment>
              }
              {...a11yProps(4)}
            />
          </Tabs>
        </Box>
        <Stack direction="column" spacing={2} sx={{ mt: 2.5 }}>
          {loading ? (
            <>
              <Skeleton variant="rectangular" width={"100%"} height={150} />
              <Skeleton variant="rectangular" width={"100%"} height={150} />
            </>
          ) : (
            <>
              {filteredAppointments.length === 0 ? (
                <div className="flex flex-col justify-center items-center text-center w-full h-44 italic">
                  <img src={noResult} alt="No result" />
                  <p>{t("appointment.noAppointment")}</p>
                </div>
              ) : (
                filteredAppointments.map((appointment, index) => {
                  console.log("Appointment data:", appointment);
                  return (
                    <AppointmentCard key={index} appointment={appointment} />
                  );
                })
              )}
            </>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default AppointmentPage;
