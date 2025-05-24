import { useState, useEffect } from "react";
import {
  Box,
  Button,
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
import saleApi from "../../../service/saleApi";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";

const SalesManage = () => {
  const [sales, setSales] = useState([]);
  const [services, setServices] = useState([]); // List of available services
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discountType: "percent", // percentage or fixed
    discountValue: "",
    startDate: dayjs(),
    endDate: dayjs(),
    status: "active", // active, inactive, scheduled
    serviceId: "", // Changed from applicableServices array to single serviceId
  });
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();

  // Mock data - Replace with actual API call
  useEffect(() => {
    saleApi
      .getAll()
      .then((response) => {
        setSales(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
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
        discountType: "percent",
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
    const submitData = new FormData();

    submitData.append("type", formData.discountType);
    submitData.append("value", formData.discountValue);
    submitData.append("start_date", formData.startDate.format("YYYY-MM-DD"));
    submitData.append("end_date", formData.endDate.format("YYYY-MM-DD"));
    submitData.append("status", formData.status);
    submitData.append("medical_service_id", formData.serviceId);

    if (selectedSale) {
      saleApi
        .update(selectedSale.id, submitData)
        .then((response) => {
          setSales((prevSales) =>
            prevSales.map((sale) =>
              sale.id === selectedSale.id ? response.data : sale
            )
          );
          showSuccessSnackbar("Cập nhật chương trình thành công");
          handleCloseDialog();
        })
        .catch((error) => {
          console.error("Error updating sale:", error);
        });
    } else {
      saleApi
        .create(submitData)
        .then((response) => {
          setSales((prevSales) => [...prevSales, response.data]);
          showSuccessSnackbar("Thêm chương trình thành công");
          handleCloseDialog();
        })
        .catch((error) => {
          console.error("Error creating sale:", error);
        });
    }
  };

  const calculateStatus = (startDate, endDate) => {
    const now = dayjs();
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (now.isBefore(start)) {
      return "scheduled"; // Chưa bắt đầu
    } else if (now.isAfter(end)) {
      return "inactive"; // Đã kết thúc
    } else {
      return "active"; // Đang diễn ra
    }
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

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chương trình này?")) {
      saleApi
        .delete(id)
        .then(() => {
          setSales((prevSales) => prevSales.filter((sale) => sale.id !== id));
          showSuccessSnackbar("Xóa chương trình thành công");
        })
        .catch((error) => {
          console.error("Error deleting sale:", error);
        });
    }
  }

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
                  {sale.type === "percent"
                    ? `${sale.value}%`
                    : `${sale.value.toLocaleString("vi-VN")}đ`}
                </TableCell>
                <TableCell>
                  {dayjs(sale.start_date).format("DD/MM/YYYY")} -{" "}
                  {dayjs(sale.end_date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  {(() => {
                    const service = services.find(
                      (s) => s.id === sale.medical_service_id
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
                    label={getStatusText(
                      calculateStatus(sale.start_date, sale.end_date)
                    )}
                    color={getStatusColor(
                      calculateStatus(sale.start_date, sale.end_date)
                    )}
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
                  <IconButton size="small" color="error" onClick={() => handleDelete(sale.id)}>
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
                    <MenuItem value="percent">Phần trăm (%)</MenuItem>
                    <MenuItem value="amount">Số tiền cố định (đ)</MenuItem>
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
