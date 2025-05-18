import {
  Breadcrumbs,
  Typography,
  Stack,
  IconButton,
  Divider,
  Button,
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
import medicalServiceApi from "../../service/medicalServiceAPi";
import TreatmentCategoryChip from "../../components/chip/TreatmentCategoryChip";
import EditIcon from "@mui/icons-material/Edit";
import { formatDateTime } from "../../utlis/DateFun";

const ServiceDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);
  const [tab, setTab] = useState(0);
  useEffect(() => {
    setLoading(true);
    medicalServiceApi
      .getById(id)
      .then((response) => {
        setService(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service:", error);
        setLoading(false);
      });
  }, [id]);


  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "pending":
        return "Đang chờ";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const renderSkeleton = () => (
    <div className="rounded-lg bg-white p-4 shadow-md flex flex-col">
      <div
        className="flex justify-between items-center"
        style={{ margin: "1rem" }}
      >
        <div className="flex gap-2 items-center">
          <Skeleton variant="rectangular" width={208} height={128} />
          <div className="ml-4">
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={120} height={30} />
          </div>
        </div>
        <Skeleton variant="rectangular" width={150} height={40} />
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
          <Tab label="Lịch sử" />
        </Tabs>
      </Box>
      <div style={{ padding: "1rem" }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          {[...Array(5)].map((_, index) => (
            <div key={index}>
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={150} height={30} />
            </div>
          ))}
        </div>
        <Divider />
        <Skeleton variant="text" width={200} height={40} sx={{ my: 2 }} />
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex fex-col gap-2 items-center mb-4">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="ml-4">
              <Skeleton variant="text" width={200} height={24} />
              <Skeleton variant="text" width={150} height={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppointmentsTable = () => {
    return (
      <div style={{ padding: "1rem" }}>
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
          Lịch sử đặt lịch
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bệnh nhân</TableCell>
                <TableCell>Bác sĩ</TableCell>
                <TableCell>Ngày hẹn</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {service?.appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Không có lịch hẹn nào
                  </TableCell>
                </TableRow>
              ) : (
                service.appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar src={appointment.patient?.avatar} />
                        <div>
                          <p className="font-medium">
                            {appointment.patient?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.patient?.phone}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar src={appointment.doctor?.avatar} />
                        <div>
                          <p className="font-medium">
                            {appointment.doctor?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.doctor?.specialization}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDateTime(appointment.date)}
                    </TableCell>
                    <TableCell>{appointment.start_time} - {appointment.end_time}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(appointment.status)}
                        color={getStatusColor(appointment.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  if (loading) {
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
            to={"/facility/services"}
            size="small"
            sx={{ p: 0 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs
            sx={{ display: "flex", alignItems: "center", mt: "5px" }}
          >
            <Link to={"/facility/services"}>Dịch vụ khám chữa</Link>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              Loading...
            </Typography>
          </Breadcrumbs>
        </Stack>
        {renderSkeleton()}
      </div>
    );
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
          to={"/facility/services"}
          size="small"
          sx={{ p: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs sx={{ display: "flex", alignItems: "center", mt: "5px" }}>
          <Link to={"/facility/services"}>Dịch vụ khám chữa</Link>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            {service?.name}
          </Typography>
        </Breadcrumbs>
      </Stack>
      <div className="rounded-lg bg-white p-4 shadow-md flex flex-col">
        <div
          className="flex justify-between items-center"
          style={{ margin: "1rem" }}
        >
          <div className="flex gap-2 items-center">
            <img
              src={service?.thumbnail}
              alt={service?.name}
              className="w-52 h-32 object-cover rounded-lg "
            />
            <div className="ml-4">
              <h2>{service?.name}</h2>
              <TreatmentCategoryChip category={service?.category} />
            </div>
          </div>
          <Button
            startIcon={<EditIcon />}
            component={Link}
            to={`/facility/services/${id}/edit`}
            variant="outlined"
            color="primary"
          >
            Chỉnh sửa dịch vụ
          </Button>
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
            <Tab label="Lịch sử" />
          </Tabs>
        </Box>
        {tab === 0 ? (
          <div style={{ padding: "1rem" }}>
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
                Last update at {formatDateTime(service?.updated_at)}
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
                Tên dịch vụ
                <p className="text-black text-base">{service?.name}</p>
              </p>
              <p className="text-gray-500 text-sm">
                Loại dịch vụ
                <p className="text-black text-base">{service?.category}</p>
              </p>
              <p className="text-gray-500 text-sm">
                Giá
                <p className="text-black text-base">{service?.price} VND</p>
              </p>
              <p className="text-gray-500 text-sm">
                Thời gian
                <p className="text-black text-base">{service?.duration} phút</p>
              </p>
              <p className="text-gray-500 text-sm">
                Mô tả
                <p className="text-black text-base">{service?.description}</p>
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
              Bác sĩ phụ trách
            </Typography>
            {service?.doctors?.map((doctor, index) => (
              <div key={index} className="flex fex-col gap-2 items-center">
                <ListItem sx={{ width: "40%" }}>
                  <ListItemAvatar>
                    <Avatar src={doctor.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={doctor.name}
                    secondary={doctor.specialization}
                  />
                </ListItem>
                <div className="font-base text-sm">
                  <p>{doctor.phone}</p>
                  <p className="text-blue-500 underline">{doctor.email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          renderAppointmentsTable()
        )}
        <Divider />
      </div>
    </div>
  );
};

export default ServiceDetail;
