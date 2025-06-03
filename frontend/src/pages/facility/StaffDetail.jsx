import {
  Breadcrumbs,
  Typography,
  Stack,
  IconButton,
  Divider,
  Box,
  Tabs,
  Tab,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../../utlis/DateFun";
import ScheduleSelectRow from "../../components/ScheduleSelectRow";
import "./staff.css";
import doctorApi from "../../service/DoctorApi";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

const StaffDetail = () => {
  const [tab, setTab] = useState(0);
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showErrorSnackbar } = useCustomSnackbar();

  const weekDays = [
    { day: "monday", dayOfWeek: "Thứ Hai" },
    { day: "tuesday", dayOfWeek: "Thứ Ba" },
    { day: "wednesday", dayOfWeek: "Thứ Tư" },
    { day: "thursday", dayOfWeek: "Thứ Năm" },
    { day: "friday", dayOfWeek: "Thứ Sáu" },
    { day: "saturday", dayOfWeek: "Thứ Bảy" },
    { day: "sunday", dayOfWeek: "Chủ Nhật" },
  ];

  const getScheduleForDay = (dayOfWeek) => {
    return doctor.schedule?.find((s) => s.day_of_week === dayOfWeek) || null;
  };

  const handleScheduleChange = (day, isWorking, timeData) => {
    console.log("Schedule changed:", { day, isWorking, timeData });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString.substring(0, 5);
  };

  const renderAppointmentsTab = () => {
    if (!doctor.appointments || doctor.appointments.length === 0) {
      return (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", py: 4, color: "text.secondary" }}
        >
          Chưa có lịch hẹn nào
        </Typography>
      );
    }

    return (
      <TableContainer sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ngày hẹn</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Bệnh nhân</TableCell>
              <TableCell>Dịch vụ</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctor.appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{formatDate(appointment.date)}</TableCell>
                <TableCell>
                  {formatTime(appointment.start_time)} -{" "}
                  {formatTime(appointment.end_time)}
                </TableCell>
                <TableCell>{appointment.health_profile.name}</TableCell>
                <TableCell>{appointment.medical_service.name}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(appointment.status)}
                    color={getStatusColor(appointment.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDateTime(appointment.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        const response = await doctorApi.getById(id);
        console.log("Doctor data:", response.data);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        showErrorSnackbar("Không thể tải thông tin bác sĩ");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorData();
  }, [id]);

  const LoadingSkeleton = () => (
    <div style={{ padding: "20px" }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        marginBottom={"1rem"}
      >
        <IconButton
          component={Link}
          to={"/facility/staffs"}
          size="small"
          sx={{ p: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Skeleton width={200} height={24} />
      </Stack>
      <div className="rounded-lg bg-white p-4 shadow-md flex flex-col">
        <div
          className="flex justify-between items-center"
          style={{ margin: "1rem" }}
        >
          <ListItem>
            <ListItemAvatar>
              <Skeleton variant="circular" width={100} height={100} />
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton width={200} height={32} />}
              secondary={<Skeleton width={300} height={24} />}
            />
          </ListItem>
        </div>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "white",
            borderBottomWidth: "1.5px",
          }}
        >
          <Tabs value={0}>
            <Tab label="Thông tin" />
            <Tab label="Lịch sử khám" />
            <Tab label="Danh sách bệnh nhân" />
          </Tabs>
        </Box>
        <div style={{ padding: "1rem" }}>
          <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item}>
                <Skeleton width={100} height={20} />
                <Skeleton width={200} height={24} />
              </div>
            ))}
          </div>
          <Divider />
          <Skeleton variant="text" width={200} height={32} sx={{ my: 2 }} />
          <div className="flex flex-col gap-3" style={{ paddingRight: "2rem" }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} variant="rectangular" height={56} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading || !doctor) {
    return <LoadingSkeleton />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        marginBottom={"1rem"}
      >
        <IconButton
          component={Link}
          to={"/facility/staffs"}
          size="small"
          sx={{ p: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs sx={{ display: "flex", alignItems: "center", mt: "5px" }}>
          <Link to={"/facility/staffs"}>Quản lý bác sĩ</Link>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            B.S {doctor.name}
          </Typography>
        </Breadcrumbs>
      </Stack>
      <div className="rounded-lg bg-white p-4 shadow-md flex flex-col">
        <div
          className="flex justify-between items-center"
          style={{ margin: "1rem" }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={
                  doctor.avatar ||
                  "https://www.shutterstock.com/image-vector/male-doctor-smiling-happy-face-600w-2481032615.jpg"
                }
                sx={{
                  width: 100,
                  height: 100,
                  marginRight: "1rem",
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  B.S {doctor.name}
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                  {doctor.specialization}
                </Typography>
              }
            />
          </ListItem>
        </div>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "white",
            borderBottomWidth: "1.5px",
          }}
        >
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            aria-label="basic tabs example"
          >
            <Tab label="Thông tin" />
            <Tab label="Lịch sử khám" />
            <Tab label="Danh sách bệnh nhân" />
          </Tabs>
        </Box>
        <div style={{ padding: "1rem" }}>
          {tab === 0 && (
            <>
              <Typography
                variant="h6"
                sx={{
                  borderLeft: "3px solid #007df4",
                  pl: "1rem",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  fontSize: "18px",
                  marginBottom: "1rem",
                }}
              >
                Thông tin cơ bản
                <Typography
                  variant="span"
                  sx={{
                    marginLeft: "0.5rem",
                    color: "gray",
                    fontSize: "14px",
                    fontWeight: 400,
                    textTransform: "none",
                  }}
                >
                  Last update at {formatDateTime(doctor.updated_at)}
                </Typography>
              </Typography>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <p className="text-gray-500 text-sm">
                  Họ và tên
                  <p className="text-black text-base">{doctor.name}</p>
                </p>
                <p className="text-gray-500 text-sm">
                  Chức vụ
                  <p className="text-black text-base">{doctor.position}</p>
                </p>
                <p className="text-gray-500 text-sm">
                  Email
                  <p className="text-black text-base">{doctor.email}</p>
                </p>
                <p className="text-gray-500 text-sm">
                  Số điện thoại
                  <p className="text-black text-base">{doctor.phone}</p>
                </p>
                <p className="text-gray-500 text-sm">
                  Chuyên khoa
                  <p className="text-black text-base">
                    {doctor.specialization}
                  </p>
                </p>
                <p className="text-gray-500 text-sm">
                  Trạng thái
                  <p className="text-black text-base">
                    <span
                      style={{
                        color:
                          doctor.status === "active" ? "#4caf50" : "#f44336",
                        fontWeight: 500,
                      }}
                    >
                      {doctor.status === "active"
                        ? "Đang làm việc"
                        : "Không hoạt động"}
                    </span>
                  </p>
                </p>
                <p className="text-gray-500 text-sm col-span-2">
                  Mô tả
                  <p className="text-black text-base">
                    {doctor.about || "Chưa có mô tả"}
                  </p>
                </p>
              </div>
              <Divider />
              <Typography
                variant="h6"
                sx={{
                  borderLeft: "3px solid #007df4",
                  pl: "1rem",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  fontSize: "18px",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              >
                Lịch làm việc
              </Typography>
              <div
                className="flex flex-col gap-3"
                style={{ paddingRight: "2rem" }}
              >
                {weekDays.map(({ day, dayOfWeek }) => (
                  <ScheduleSelectRow
                    key={day}
                    day={day}
                    dayOfWeek={dayOfWeek}
                    schedule={getScheduleForDay(dayOfWeek)}
                    onScheduleChange={handleScheduleChange}
                  />
                ))}
              </div>
            </>
          )}
          {tab === 1 && <>{renderAppointmentsTab()}</>}
          {tab === 2 && (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", py: 4, color: "text.secondary" }}
            >
              Tính năng đang được phát triển
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDetail;
