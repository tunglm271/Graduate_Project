import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import medicalServiceApi from "../../../service/medicalServiceAPi";

const SalesManage = () => {
  const [sales, setSales] = useState([]);
  const [services, setServices] = useState([]); // List of available services
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discountType: "percentage", // percentage or fixed
    discountValue: "",
    startDate: dayjs(),
    endDate: dayjs(),
    status: "active", // active, inactive, scheduled
    serviceId: "", // Changed from applicableServices array to single serviceId
  });

  // Mock data - Replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSales([
        {
          id: 1,
          discountType: "percentage",
          discountValue: 20,
          startDate: "2024-06-01",
          endDate: "2024-08-31",
          status: "scheduled",
          serviceId: 1,
        },
        {
          id: 2,
          discountType: "fixed",
          discountValue: 100000,
          startDate: "2024-05-01",
          endDate: "2024-05-31",
          status: "active",
          serviceId: 1,
        },
      ]);
    }, 1000);
  }, []);

  // Fetch available services
  useEffect(() => {
    medicalServiceApi
      .getByFacility()
      .then((response) => {
        setServices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const handleOpenDialog = (sale = null) => {
    if (sale) {
      setSelectedSale(sale);
      setFormData({
        ...sale,
        startDate: dayjs(sale.startDate),
        endDate: dayjs(sale.endDate),
      });
    } else {
      setSelectedSale(null);
      setFormData({
        name: "",
        description: "",
        discountType: "percentage",
        discountValue: "",
        startDate: dayjs(),
        endDate: dayjs(),
        status: "active",
        serviceId: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSale(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - Replace with actual API call
    console.log("Form submitted:", formData);
    handleCloseDialog();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "scheduled":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Đang áp dụng";
      case "inactive":
        return "Đã kết thúc";
      case "scheduled":
        return "Sắp diễn ra";
      default:
        return status;
    }
  };

  const handleServiceChange = (event) => {
    setFormData({
      ...formData,
      serviceId: event.target.value,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h1">
          Quản lý chương trình khuyến mãi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Thêm chương trình
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="80px">STT</TableCell>
              <TableCell>Giảm giá</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Dịch vụ áp dụng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale, index) => (
              <TableRow key={sale.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {sale.discountType === "percentage"
                    ? `${sale.discountValue}%`
                    : `${sale.discountValue.toLocaleString("vi-VN")}đ`}
                </TableCell>
                <TableCell>
                  {dayjs(sale.startDate).format("DD/MM/YYYY")} -{" "}
                  {dayjs(sale.endDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  {(() => {
                    const service = services.find(
                      (s) => s.id === sale.serviceId
                    );
                    return service ? (
                      <Chip
                        label={service.name}
                        size="small"
                        variant="outlined"
                      />
                    ) : null;
                  })()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(sale.status)}
                    color={getStatusColor(sale.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(sale)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedSale ? "Chỉnh sửa chương trình" : "Thêm chương trình mới"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Loại giảm giá</InputLabel>
                  <Select
                    value={formData.discountType}
                    label="Loại giảm giá"
                    onChange={(e) =>
                      setFormData({ ...formData, discountType: e.target.value })
                    }
                  >
                    <MenuItem value="percentage">Phần trăm (%)</MenuItem>
                    <MenuItem value="fixed">Số tiền cố định (đ)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giá trị giảm giá"
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) =>
                    setFormData({ ...formData, discountValue: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {formData.discountType === "percentage" ? "%" : "đ"}
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi"
                >
                  <DatePicker
                    label="Ngày bắt đầu"
                    value={formData.startDate}
                    onChange={(newValue) =>
                      setFormData({ ...formData, startDate: newValue })
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi"
                >
                  <DatePicker
                    label="Ngày kết thúc"
                    value={formData.endDate}
                    onChange={(newValue) =>
                      setFormData({ ...formData, endDate: newValue })
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Trạng thái</InputLabel>
                  <Select
                    value={formData.status}
                    label="Trạng thái"
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <MenuItem value="active">Đang áp dụng</MenuItem>
                    <MenuItem value="inactive">Đã kết thúc</MenuItem>
                    <MenuItem value="scheduled">Sắp diễn ra</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    Dịch vụ áp dụng
                  </InputLabel>
                  <Select
                    labelId="service-select-label"
                    value={formData.serviceId}
                    onChange={handleServiceChange}
                    label="Dịch vụ áp dụng"
                  >
                    {services.map((service) => (
                      <MenuItem key={service.id} value={service.id}>
                        {service.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button type="submit" variant="contained">
              {selectedSale ? "Cập nhật" : "Thêm mới"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default SalesManage;
