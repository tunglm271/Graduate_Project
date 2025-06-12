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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
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
    totalRevenue: 0,
    dailyRevenue: [],
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
        const {
          total_patients,
          total_doctors,
          total_services,
          appointments,
          total_revenue,
          daily_revenue,
        } = response.data;

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
          totalServices: total_services,
          totalAppointments: appointments.length,
          completedAppointments,
          pendingAppointments,
          cancelledAppointments,
          unassignedAppointments,
          totalRevenue: total_revenue,
          dailyRevenue: daily_revenue,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tổng quan cơ sở</h2>
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
                title="Tổng số bệnh nhân"
                value={stats.totalPatients}
                icon={<PeopleIcon />}
                subtitle="Bệnh nhân đã đăng ký"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Đội ngũ y tế"
                value={stats.totalDoctors}
                icon={<LocalHospitalIcon />}
                subtitle="Bác sĩ đang hoạt động"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Dịch vụ"
                value={stats.totalServices}
                icon={<MedicalServicesIcon />}
                subtitle="Dịch vụ có sẵn"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Tổng doanh thu"
                value={formatCurrency(stats.totalRevenue)}
                icon={<CalendarMonthIcon />}
                subtitle="30 ngày gần nhất"
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
                  Trạng thái cuộc hẹn
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
                          Hoàn thành
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
                          Đang chờ
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
                          Chưa được chỉ định
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
                          Đã hủy
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                  Doanh thu 30 ngày gần nhất
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={stats.dailyRevenue}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 40,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) =>
                        new Date(date).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                        })
                      }
                    />
                    <YAxis
                      tickFormatter={(value) => formatCurrency(value)}
                      domain={["auto", "auto"]}
                      padding={{ top: 20, bottom: 20 }}
                      width={100}
                      style={{ fontSize: "12px" }}
                    />
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(date) =>
                        new Date(date).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      name="Doanh thu"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default FacilityDashboard;
