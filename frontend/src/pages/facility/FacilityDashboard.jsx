import CashFlowLineChart from "../../components/chart/CashFlowLineChart";
import { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, CircularProgress } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PropTypes from "prop-types";
import facilityApi from "../../service/FacilityApi";

const StatCard = ({ title, value, icon, subtitle }) => (
  <Paper
    elevation={1}
    sx={{
      p: 3,
      display: "flex",
      flexDirection: "column",
      height: "100%",
      borderRadius: 1,
      bgcolor: "white",
      border: "1px solid #e0e0e0",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          color: "text.secondary",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
    </Box>
    <Typography
      variant="h4"
      sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
    >
      {value}
    </Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    )}
  </Paper>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
};

const FacilityDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalServices: 0,
    totalAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    cancelledAppointments: 0,
    unassignedAppointments: 0,
  });

  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await facilityApi.dashboard();
        const { total_patients, total_doctors, total_services, appointments } = response.data;

        const completedAppointments = appointments.filter(
          (apt) => apt.status === "completed"
        ).length;
        const pendingAppointments = appointments.filter(
          (apt) => apt.status === "pending"
        ).length;
        const cancelledAppointments = appointments.filter(
          (apt) => apt.status === "cancelled"
        ).length;
        const unassignedAppointments = appointments.filter(
          (apt) => !apt.doctor_id
        ).length;

        setStats({
          totalPatients: total_patients,
          totalDoctors: total_doctors,
          totalServices:  total_services,
          totalAppointments: appointments.length,
          completedAppointments,
          pendingAppointments,
          cancelledAppointments,
          unassignedAppointments,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    facilityApi.dashboard().then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Facility Overview</h2>
        <p className="text-gray-500 font-medium">{formattedDate}</p>
      </div>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Patients"
                value={stats.totalPatients}
                icon={<PeopleIcon />}
                subtitle="Registered patients"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Medical Staff"
                value={stats.totalDoctors}
                icon={<LocalHospitalIcon />}
                subtitle="Active doctors"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Services"
                value={stats.totalServices}
                icon={<MedicalServicesIcon />}
                subtitle="Available services"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Appointments"
                value={stats.totalAppointments}
                icon={<CalendarMonthIcon />}
                subtitle="Total appointments"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 1,
                  bgcolor: "white",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                  Appointment Status
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircleIcon color="success" />
                      <Box>
                        <Typography variant="h5">
                          {stats.completedAppointments}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Completed
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTimeIcon color="warning" />
                      <Box>
                        <Typography variant="h5">
                          {stats.pendingAppointments}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pending
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AssignmentIcon color="info" />
                      <Box>
                        <Typography variant="h5">
                          {stats.unassignedAppointments}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Unassigned
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CancelIcon color="error" />
                      <Box>
                        <Typography variant="h5">
                          {stats.cancelledAppointments}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cancelled
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <CashFlowLineChart />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default FacilityDashboard;
